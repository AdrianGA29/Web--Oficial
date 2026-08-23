from __future__ import annotations

from contextlib import asynccontextmanager
from pathlib import Path
from typing import Literal

import httpx
from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from pydantic import BaseModel, Field
from dotenv import load_dotenv

ROOT = Path(__file__).resolve().parent.parent
load_dotenv(ROOT / ".env")

from .agent import LocalAgent
from .controller import ControllerManager
from .pattern import PatternRunner


controller = ControllerManager()
agent = LocalAgent(controller)
pattern_runner = PatternRunner(controller)


@asynccontextmanager
async def lifespan(_: FastAPI):
    yield
    pattern_runner.stop()
    controller.close()


app = FastAPI(title="Mando Agente", lifespan=lifespan)


class RumbleRequest(BaseModel):
    low_motor: int = Field(ge=0, le=100)
    high_motor: int = Field(ge=0, le=100)
    duration_ms: int = Field(ge=50, le=10_000)


class ContinuousRumbleRequest(BaseModel):
    low_motor: int = Field(ge=0, le=100)
    high_motor: int = Field(ge=0, le=100)


class PatternStep(BaseModel):
    kind: Literal["vibration", "pause"]
    duration_seconds: float = Field(ge=0.05, le=3_600)
    low_motor: int = Field(default=0, ge=0, le=100)
    high_motor: int = Field(default=0, ge=0, le=100)


class PatternRequest(BaseModel):
    steps: list[PatternStep] = Field(min_length=1, max_length=100)
    loop: bool = False


class HistoryItem(BaseModel):
    role: Literal["user", "assistant"]
    content: str = Field(min_length=1, max_length=8_000)


class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=4_000)
    history: list[HistoryItem] = Field(default_factory=list, max_length=20)
    model: str | None = None


@app.get("/")
def index() -> FileResponse:
    return FileResponse(ROOT / "static" / "index.html")


@app.get("/api/status")
async def status() -> dict:
    state = controller.status()
    state["pattern"] = pattern_runner.status()
    try:
        state["models"] = await agent.models()
        state["lm_studio"] = True
    except (httpx.HTTPError, KeyError, ValueError):
        state["models"] = []
        state["lm_studio"] = False
    return state


@app.get("/api/playback/status")
def playback_status() -> dict:
    return {
        "continuous": controller.status()["continuous"],
        "pattern": pattern_runner.status(),
    }


@app.post("/api/rescan")
def rescan() -> dict:
    return controller.rescan()


@app.post("/api/rumble")
def rumble(request: RumbleRequest) -> dict:
    try:
        pattern_runner.stop()
        return controller.vibrate(request.low_motor, request.high_motor, request.duration_ms)
    except RuntimeError as exc:
        raise HTTPException(status_code=409, detail=str(exc)) from exc


@app.post("/api/rumble/continuous")
def continuous_rumble(request: ContinuousRumbleRequest) -> dict:
    try:
        pattern_runner.stop()
        return controller.continuous(request.low_motor, request.high_motor)
    except RuntimeError as exc:
        raise HTTPException(status_code=409, detail=str(exc)) from exc


@app.post("/api/pattern/play")
def play_pattern(request: PatternRequest) -> dict:
    state = controller.status()
    if not state["connected"]:
        state = controller.rescan()
    if not state["connected"]:
        raise HTTPException(status_code=409, detail="No hay ningun mando conectado")
    steps = [step.model_dump() for step in request.steps]
    return pattern_runner.play(steps, request.loop)


@app.post("/api/stop")
def stop() -> dict:
    return pattern_runner.stop()


@app.post("/api/chat")
async def chat(request: ChatRequest) -> dict:
    try:
        return await agent.chat(
            request.message,
            [item.model_dump() for item in request.history],
            request.model,
        )
    except httpx.ConnectError as exc:
        raise HTTPException(
            status_code=503,
            detail="No puedo conectar con LM Studio. Activa Local Server en el puerto 1234.",
        ) from exc
    except (httpx.HTTPError, RuntimeError, KeyError, IndexError) as exc:
        raise HTTPException(status_code=502, detail=str(exc)) from exc
