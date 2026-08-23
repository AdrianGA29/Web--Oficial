from __future__ import annotations

import os
import threading
import time
from typing import Any

os.environ.setdefault("SDL_VIDEODRIVER", "dummy")
os.environ.setdefault("SDL_JOYSTICK_ALLOW_BACKGROUND_EVENTS", "1")
os.environ.setdefault("PYGAME_HIDE_SUPPORT_PROMPT", "1")

import pygame


class ControllerManager:
    """Acceso pequeno y seguro al primer mando que SDL encuentre."""

    MAX_DURATION_MS = 10_000
    CONTINUOUS_PULSE_MS = 2_000
    CONTINUOUS_REFRESH_SECONDS = 0.75

    def __init__(self) -> None:
        self._lock = threading.RLock()
        self._joystick: pygame.joystick.JoystickType | None = None
        self._last_rumble = {"low_motor": 35, "high_motor": 55, "duration_ms": 600}
        self._continuous = False
        self._continuous_event: threading.Event | None = None
        self._continuous_thread: threading.Thread | None = None
        self._continuous_refreshes = 0
        self._running = True
        pygame.init()
        pygame.joystick.init()
        self.rescan()
        self._pump_thread = threading.Thread(target=self._pump_events, daemon=True)
        self._pump_thread.start()

    def _pump_events(self) -> None:
        while self._running:
            with self._lock:
                try:
                    pygame.event.pump()
                except pygame.error:
                    pass
            time.sleep(0.05)

    def _cancel_continuous_locked(self) -> None:
        if self._continuous_event is not None:
            self._continuous_event.set()
        self._continuous_event = None
        self._continuous_thread = None
        self._continuous = False

    def _continuous_worker(
        self,
        event: threading.Event,
        low: int,
        high: int,
    ) -> None:
        while not event.wait(self.CONTINUOUS_REFRESH_SECONDS):
            with self._lock:
                if event is not self._continuous_event or not self._continuous:
                    return
                if self._joystick is None or not self._joystick.get_init():
                    self._continuous = False
                    return
                played = self._joystick.rumble(
                    low / 100,
                    high / 100,
                    self.CONTINUOUS_PULSE_MS,
                )
                if not played:
                    self._continuous = False
                    return
                self._continuous_refreshes += 1

    def rescan(self) -> dict[str, Any]:
        with self._lock:
            self._cancel_continuous_locked()
            self._joystick = None
            pygame.joystick.quit()
            pygame.joystick.init()
            if pygame.joystick.get_count() > 0:
                self._joystick = pygame.joystick.Joystick(0)
            return self.status()

    def status(self) -> dict[str, Any]:
        with self._lock:
            connected = self._joystick is not None and self._joystick.get_init()
            return {
                "connected": connected,
                "name": self._joystick.get_name() if connected else None,
                "count": pygame.joystick.get_count(),
                "last_rumble": self._last_rumble.copy(),
                "continuous": self._continuous,
                "continuous_refreshes": self._continuous_refreshes,
            }

    def vibrate(self, low_motor: int, high_motor: int, duration_ms: int) -> dict[str, Any]:
        low = max(0, min(100, int(low_motor)))
        high = max(0, min(100, int(high_motor)))
        duration = max(50, min(self.MAX_DURATION_MS, int(duration_ms)))

        with self._lock:
            self._cancel_continuous_locked()
            if self._joystick is None or not self._joystick.get_init():
                self.rescan()
            if self._joystick is None:
                raise RuntimeError("No hay ningun mando conectado")
            played = self._joystick.rumble(low / 100, high / 100, duration)
            if not played:
                raise RuntimeError(
                    "El mando fue detectado, pero SDL no pudo activar su vibracion. "
                    "Prueba una conexion USB directa y cierra DS4Windows/Steam Input."
                )
            self._continuous = False
            self._last_rumble = {
                "low_motor": low,
                "high_motor": high,
                "duration_ms": duration,
            }

        return {
            "ok": True,
            "low_motor": low,
            "high_motor": high,
            "duration_ms": duration,
        }

    def continuous(self, low_motor: int, high_motor: int) -> dict[str, Any]:
        """Inicia una vibracion que continua hasta llamar a stop()."""
        low = max(0, min(100, int(low_motor)))
        high = max(0, min(100, int(high_motor)))

        with self._lock:
            self._cancel_continuous_locked()
            if self._joystick is None or not self._joystick.get_init():
                self.rescan()
            if self._joystick is None:
                raise RuntimeError("No hay ningun mando conectado")
            played = self._joystick.rumble(
                low / 100,
                high / 100,
                self.CONTINUOUS_PULSE_MS,
            )
            if not played:
                raise RuntimeError(
                    "El mando fue detectado, pero SDL no pudo activar su vibracion. "
                    "Prueba una conexion USB directa y cierra DS4Windows/Steam Input."
                )
            self._continuous = True
            self._continuous_refreshes = 0
            self._last_rumble["low_motor"] = low
            self._last_rumble["high_motor"] = high
            event = threading.Event()
            thread = threading.Thread(
                target=self._continuous_worker,
                args=(event, low, high),
                daemon=True,
                name="ds4-continuous-rumble",
            )
            self._continuous_event = event
            self._continuous_thread = thread
            thread.start()

        return {
            "ok": True,
            "continuous": True,
            "low_motor": low,
            "high_motor": high,
            "refresh_seconds": self.CONTINUOUS_REFRESH_SECONDS,
        }

    def adjust(self, change: int, motor: str = "ambos", duration_ms: int | None = None) -> dict[str, Any]:
        """Ajusta la potencia respecto de la ultima vibracion y reproduce el resultado."""
        delta = max(-100, min(100, int(change)))
        if motor not in {"ambos", "fuerte", "fino"}:
            raise ValueError("motor debe ser 'ambos', 'fuerte' o 'fino'")

        with self._lock:
            low = self._last_rumble["low_motor"]
            high = self._last_rumble["high_motor"]
            duration = self._last_rumble["duration_ms"] if duration_ms is None else duration_ms
            if motor in {"ambos", "fuerte"}:
                low += delta
            if motor in {"ambos", "fino"}:
                high += delta
            return self.vibrate(low, high, duration)

    def stop(self) -> dict[str, bool]:
        with self._lock:
            self._cancel_continuous_locked()
            if self._joystick is not None and self._joystick.get_init():
                self._joystick.stop_rumble()
        return {"ok": True}

    def close(self) -> None:
        self._running = False
        self.stop()
        pygame.quit()
