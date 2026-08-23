from __future__ import annotations

import json
import os
from typing import Any

import httpx

from .controller import ControllerManager


SYSTEM_PROMPT = """Eres Mando, un asistente local cercano y conciso. Hablas siempre en espanol.
Puedes conversar con la persona y controlar los dos motores de vibracion de su mando.
El motor de baja frecuencia produce golpes fuertes; el de alta frecuencia, un zumbido fino.
Cuando el usuario pida una vibracion, usa la herramienta directamente y luego confirma brevemente.
Nunca encadenes vibraciones durante mas de 10 segundos. Si la peticion es ambigua, elige una
vibracion suave y corta. Detenla inmediatamente si el usuario lo pide."""

TOOLS = [
    {
        "type": "function",
        "function": {
            "name": "vibrar_mando",
            "description": "Hace vibrar los motores del mando con una intensidad y duracion concretas.",
            "parameters": {
                "type": "object",
                "properties": {
                    "low_motor": {
                        "type": "integer",
                        "minimum": 0,
                        "maximum": 100,
                        "description": "Motor grave/fuerte, de 0 a 100.",
                    },
                    "high_motor": {
                        "type": "integer",
                        "minimum": 0,
                        "maximum": 100,
                        "description": "Motor agudo/fino, de 0 a 100.",
                    },
                    "duration_ms": {
                        "type": "integer",
                        "minimum": 50,
                        "maximum": 10000,
                        "description": "Duracion en milisegundos.",
                    },
                },
                "required": ["low_motor", "high_motor", "duration_ms"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "detener_vibracion",
            "description": "Detiene inmediatamente cualquier vibracion activa.",
            "parameters": {"type": "object", "properties": {}},
        },
    },
    {
        "type": "function",
        "function": {
            "name": "estado_mando",
            "description": "Comprueba si hay un mando conectado.",
            "parameters": {"type": "object", "properties": {}},
        },
    },
]


class LocalAgent:
    def __init__(self, controller: ControllerManager) -> None:
        self.controller = controller
        self.base_url = os.getenv("LM_STUDIO_URL", "http://127.0.0.1:1234/v1").rstrip("/")
        self.api_key = os.getenv("LM_STUDIO_API_KEY", "lm-studio")
        self.preferred_model = os.getenv("LM_STUDIO_MODEL", "").strip()

    async def models(self) -> list[str]:
        async with httpx.AsyncClient(timeout=5) as client:
            response = await client.get(
                f"{self.base_url}/models", headers={"Authorization": f"Bearer {self.api_key}"}
            )
            response.raise_for_status()
            return [item["id"] for item in response.json().get("data", [])]

    async def _model(self, requested: str | None) -> str:
        if requested:
            return requested
        if self.preferred_model:
            return self.preferred_model
        available = await self.models()
        if not available:
            raise RuntimeError("LM Studio esta activo, pero no hay ningun modelo cargado")
        return available[0]

    def _run_tool(self, name: str, arguments: str) -> dict[str, Any]:
        try:
            data = json.loads(arguments or "{}")
        except json.JSONDecodeError as exc:
            return {"ok": False, "error": f"Argumentos no validos: {exc}"}

        try:
            if name == "vibrar_mando":
                return self.controller.vibrate(
                    data.get("low_motor", 20), data.get("high_motor", 20), data.get("duration_ms", 500)
                )
            if name == "detener_vibracion":
                return self.controller.stop()
            if name == "estado_mando":
                return self.controller.status()
            return {"ok": False, "error": f"Herramienta desconocida: {name}"}
        except (RuntimeError, TypeError, ValueError) as exc:
            return {"ok": False, "error": str(exc)}

    async def chat(self, message: str, history: list[dict[str, str]], model: str | None) -> dict[str, Any]:
        selected_model = await self._model(model)
        messages: list[dict[str, Any]] = [{"role": "system", "content": SYSTEM_PROMPT}]
        messages.extend(history[-16:])
        messages.append({"role": "user", "content": message})
        actions: list[dict[str, Any]] = []

        async with httpx.AsyncClient(timeout=120) as client:
            for _ in range(4):
                response = await client.post(
                    f"{self.base_url}/chat/completions",
                    headers={"Authorization": f"Bearer {self.api_key}"},
                    json={
                        "model": selected_model,
                        "messages": messages,
                        "tools": TOOLS,
                        "tool_choice": "auto",
                        "temperature": 0.4,
                    },
                )
                response.raise_for_status()
                assistant = response.json()["choices"][0]["message"]
                calls = assistant.get("tool_calls") or []
                for index, call in enumerate(calls):
                    call["id"] = call.get("id") or f"call_{index}"
                messages.append(assistant)
                if not calls:
                    return {
                        "reply": assistant.get("content") or "Hecho.",
                        "actions": actions,
                        "model": selected_model,
                    }

                for index, call in enumerate(calls):
                    function = call.get("function", {})
                    result = self._run_tool(function.get("name", ""), function.get("arguments", "{}"))
                    actions.append({"tool": function.get("name"), "result": result})
                    messages.append(
                        {
                            "role": "tool",
                            "tool_call_id": call["id"],
                            "content": json.dumps(result, ensure_ascii=False),
                        }
                    )

        return {"reply": "He ejecutado la accion solicitada.", "actions": actions, "model": selected_model}
