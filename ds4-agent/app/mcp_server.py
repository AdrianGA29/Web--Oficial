from __future__ import annotations

import atexit
from typing import Any, Literal

from mcp.server.fastmcp import FastMCP

from .controller import ControllerManager


mcp = FastMCP(
    "Mando PS4",
    instructions=(
        "Herramientas locales para controlar la vibracion de un mando PS4. "
        "Usa intensidades bajas y duraciones cortas cuando la peticion sea ambigua. "
        "Nunca superes los limites indicados por las herramientas."
    ),
)
controller = ControllerManager()
atexit.register(controller.close)


def _safe_result(action) -> dict[str, Any]:
    try:
        return action()
    except (RuntimeError, TypeError, ValueError) as exc:
        return {"ok": False, "error": str(exc)}


@mcp.tool()
def estado_mando() -> dict[str, Any]:
    """Comprueba si hay un mando conectado y devuelve su nombre."""
    return controller.status()


@mcp.tool()
def reconectar_mando() -> dict[str, Any]:
    """Vuelve a buscar el mando despues de conectarlo o cambiar de USB/Bluetooth."""
    return _safe_result(controller.rescan)


@mcp.tool()
def vibrar_mando(
    low_motor: int = 35,
    high_motor: int = 55,
    duration_ms: int = 600,
) -> dict[str, Any]:
    """Hace vibrar el mando.

    Args:
        low_motor: Intensidad del motor grave y fuerte, entre 0 y 100.
        high_motor: Intensidad del motor agudo y fino, entre 0 y 100.
        duration_ms: Duracion entre 50 y 10000 milisegundos.
    """
    return _safe_result(lambda: controller.vibrate(low_motor, high_motor, duration_ms))


@mcp.tool()
def ajustar_vibracion(
    cambio: int,
    motor: Literal["ambos", "fuerte", "fino"] = "ambos",
    duration_ms: int | None = None,
) -> dict[str, Any]:
    """Aumenta o reduce la potencia respecto de la ultima vibracion y la reproduce.

    Args:
        cambio: Puntos que se suman a la potencia; usa un numero negativo para reducirla.
        motor: Motor que se ajusta: ambos, fuerte (grave) o fino (agudo).
        duration_ms: Nueva duracion opcional; si se omite conserva la anterior.
    """
    return _safe_result(lambda: controller.adjust(cambio, motor, duration_ms))


@mcp.tool()
def detener_vibracion() -> dict[str, Any]:
    """Detiene inmediatamente cualquier vibracion activa del mando."""
    return _safe_result(controller.stop)


def main() -> None:
    try:
        mcp.run(transport="stdio")
    finally:
        controller.close()


if __name__ == "__main__":
    main()
