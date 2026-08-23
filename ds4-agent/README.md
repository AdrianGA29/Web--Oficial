# Mando Agente

Asistente local en espanol que permite a LM Studio controlar la vibracion de un mando PS4. El modo recomendado usa MCP dentro del chat nativo de LM Studio. La interfaz web se conserva como panel manual opcional.

## Modo recomendado: chat de LM Studio mediante MCP

El servidor MCP expone cinco herramientas: `estado_mando`, `reconectar_mando`, `vibrar_mando`, `ajustar_vibracion` y `detener_vibracion`. Puede controlar por separado el motor fuerte y el fino, cambiar su potencia de 0 a 100, ajustar la duración y aumentar o reducir la última vibración con órdenes naturales. No necesita activar **Developer > Start server**.

1. Conecta el DualShock 4, preferiblemente por USB.
2. En LM Studio abre la barra lateral derecha y entra en **Program**.
3. Pulsa **Install > Edit mcp.json**.
4. Copia la entrada `mando-ps4` de `mcp-config.example.json` dentro de `mcpServers` y guarda.
5. Activa `mando-ps4` en tu conversación y escribe: `Comprueba si mi mando esta conectado`.
6. Prueba: `Vibra suavemente con ambos motores durante 300 milisegundos`.

LM Studio inicia y detiene el proceso MCP automáticamente. La conversación que ya estaba abierta conserva su historial. La primera llamada a cada herramienta mostrará una confirmación; es recomendable conservarla para `vibrar_mando`.

## Modo opcional: interfaz web

1. Conecta el DualShock 4, preferiblemente por USB.
2. Abre LM Studio, carga un modelo con buen soporte de herramientas y activa **Developer > Start server** en el puerto `1234`.
3. Haz doble clic en `start.bat`. La primera vez instala sus dependencias en una carpeta `.venv` local.
4. Se abrira `http://127.0.0.1:8765`. Pulsa **Vibrar** para comprobar primero el mando y luego escribe o dicta ordenes al agente.

### Vibracion continua y plantillas

- **Iniciar vibracion continua** mantiene activos los motores con las intensidades de los controles manuales hasta pulsar **PARAR AHORA**. La app renueva el efecto cada 0,75 segundos para evitar el corte automático de algunos controladores USB/Bluetooth.
- La pestana **Plantillas** permite combinar hasta 100 bloques de vibracion y pausa.
- Cada vibracion configura por separado motor fuerte, motor fino y duracion en segundos.
- Los bloques se pueden mover, duplicar y eliminar. **Repetir** reproduce la secuencia en bucle hasta detenerla.
- Las plantillas se guardan en el almacenamiento local del navegador. Se incluyen los ejemplos `Pulso suave` y `Latido`.

Los tiempos de las secuencias los controla Python, no la pestana del navegador, para que sigan siendo exactos cuando la ventana queda en segundo plano. Una vibracion continua solo termina mediante una orden de parada o al cerrar correctamente el servidor.

Modelos pequenos con tool calling nativo suelen dar mejores resultados que modelos base. La lista desplegable muestra los modelos cargados en LM Studio.

## Si el mando aparece pero no vibra

- Usa un cable USB de datos; Bluetooth depende mas del controlador de Windows/SDL.
- Cierra temporalmente DS4Windows, Steam Input u otro programa que tenga control exclusivo del mando.
- Pulsa **Reconectar** después de enchufarlo.
- Comprueba el mando con el control manual antes de probar el agente.

## Configuracion opcional

Copia `.env.example` a tus variables de entorno o define `LM_STUDIO_URL`, `LM_STUDIO_MODEL` y `LM_STUDIO_API_KEY` antes de iniciar. Por defecto se usa `http://127.0.0.1:1234/v1` y el primer modelo cargado.

La aplicación solo escucha en `127.0.0.1`: no se expone a la red local. Cada orden automática se limita a 10 segundos y siempre hay un botón de parada independiente del modelo.
