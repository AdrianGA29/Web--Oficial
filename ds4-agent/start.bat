@echo off
setlocal
cd /d "%~dp0"

if not exist ".venv\Scripts\python.exe" (
  py -m venv .venv || goto :error
)

".venv\Scripts\python.exe" -c "import fastapi, mcp, pygame" >nul 2>&1
if errorlevel 1 (
  echo Preparando el entorno por primera vez...
  ".venv\Scripts\python.exe" -m pip install --upgrade pip || goto :error
  ".venv\Scripts\python.exe" -m pip install -r requirements.txt || goto :error
)

echo Abriendo Mando Agente en http://127.0.0.1:8765
start "" "http://127.0.0.1:8765"
".venv\Scripts\python.exe" -m uvicorn app.main:app --host 127.0.0.1 --port 8765
goto :eof

:error
echo.
echo No se pudo iniciar. Comprueba que Python 3.11 o superior esta instalado.
pause
exit /b 1
