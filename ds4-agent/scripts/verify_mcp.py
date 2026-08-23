from __future__ import annotations

import argparse
import asyncio
import sys
from pathlib import Path

from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client


ROOT = Path(__file__).resolve().parent.parent


async def verify(with_rumble: bool) -> None:
    parameters = StdioServerParameters(
        command=sys.executable,
        args=["-m", "app.mcp_server"],
        cwd=str(ROOT),
    )
    async with stdio_client(parameters) as (read_stream, write_stream):
        async with ClientSession(read_stream, write_stream) as session:
            await session.initialize()
            tools = await session.list_tools()
            print("Herramientas:", ", ".join(tool.name for tool in tools.tools))
            status = await session.call_tool("estado_mando", {})
            print("Estado:", status.content[0].text)

            if with_rumble:
                first = await session.call_tool(
                    "vibrar_mando",
                    {"low_motor": 10, "high_motor": 10, "duration_ms": 150},
                )
                print("Vibracion:", first.content[0].text)
                adjusted = await session.call_tool(
                    "ajustar_vibracion",
                    {"cambio": 5, "motor": "ambos", "duration_ms": 150},
                )
                print("Ajuste:", adjusted.content[0].text)
                await session.call_tool("detener_vibracion", {})


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Comprueba el MCP local del mando PS4")
    parser.add_argument("--rumble", action="store_true", help="Incluye dos vibraciones suaves")
    arguments = parser.parse_args()
    asyncio.run(verify(arguments.rumble))
