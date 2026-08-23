from __future__ import annotations

import threading
from typing import Any

from .controller import ControllerManager


class PatternRunner:
    """Reproduce secuencias en un hilo para que los tiempos no dependan del navegador."""

    def __init__(self, controller: ControllerManager) -> None:
        self.controller = controller
        self._lock = threading.RLock()
        self._stop_event: threading.Event | None = None
        self._thread: threading.Thread | None = None
        self._active = False
        self._current_step: int | None = None
        self._loop = False
        self._error: str | None = None

    def status(self) -> dict[str, Any]:
        with self._lock:
            return {
                "active": self._active,
                "current_step": self._current_step,
                "loop": self._loop,
                "error": self._error,
            }

    def stop(self) -> dict[str, bool]:
        with self._lock:
            event = self._stop_event
            thread = self._thread
            if event is not None:
                event.set()
        self.controller.stop()
        if thread is not None and thread is not threading.current_thread():
            thread.join(timeout=1)
        with self._lock:
            self._active = False
            self._current_step = None
        return {"ok": True}

    def play(self, steps: list[dict[str, Any]], loop: bool) -> dict[str, Any]:
        self.stop()
        event = threading.Event()
        thread = threading.Thread(
            target=self._run,
            args=(steps, loop, event),
            daemon=True,
            name="ds4-pattern",
        )
        with self._lock:
            self._stop_event = event
            self._thread = thread
            self._active = True
            self._current_step = 0
            self._loop = loop
            self._error = None
        thread.start()
        return {"ok": True, "steps": len(steps), "loop": loop}

    def _run(self, steps: list[dict[str, Any]], loop: bool, event: threading.Event) -> None:
        try:
            while not event.is_set():
                for index, step in enumerate(steps):
                    if event.is_set():
                        break
                    with self._lock:
                        self._current_step = index
                    if step["kind"] == "vibration":
                        self.controller.continuous(step["low_motor"], step["high_motor"])
                    else:
                        self.controller.stop()
                    if event.wait(step["duration_seconds"]):
                        break
                    self.controller.stop()
                if not loop:
                    break
        except (RuntimeError, TypeError, ValueError) as exc:
            with self._lock:
                self._error = str(exc)
        finally:
            self.controller.stop()
            with self._lock:
                if self._stop_event is event:
                    self._active = False
                    self._current_step = None
