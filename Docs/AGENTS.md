# AGENTS.md

## Reglas de trabajo para cualquier IA (chat o agente) en este proyecto

> Este archivo es de lectura obligatoria al inicio de cada sesión, junto con `ROADMAP_PROJECT.md` (qué construir y en qué orden) y `BITACORA_REFACTOR.md` (qué se hizo ya y qué decisiones se tomaron). Si algo de lo que se te pide contradice una regla de aquí, dilo explícitamente antes de proceder; no la ignores en silencio.

---

## 1. Qué es este proyecto (resumen)

Un juego 2D didáctico, en HTML/CSS/JavaScript con **Phaser 3** (librería vendida localmente, sin CDN), que corre 100% offline abriendo `index.html`. Objetivo único: reforzar en un niño la idea "un lugar para cada cosa y cada cosa en su lugar" mediante un mini-juego de arrastrar objetos a su lugar correcto. El detalle completo de fases y tareas vive en `ROADMAP_PROJECT.md`; este archivo no lo repite.

---

## 2. Convenciones de código (decididas, no reabrir sin avisar)

- **Nombres de variables, funciones, clases y archivos:** en inglés (`placeObject`, `DropZone`, `NivelScene.js` es la excepción visible al usuario/documentación, el resto de identificadores internos en inglés).
- **Comentarios de código y textos de UI dentro del juego:** en español.
- **Contenido pedagógico (niveles, objetos, lugares):** siempre en `src/config/niveles.json`, nunca hardcodeado dentro de una escena. Si hace falta un objeto o lugar que no está en ese archivo, se agrega ahí primero.
- **Sin build tools ni npm obligatorios.** El juego debe poder jugarse abriendo `index.html` o sirviéndolo con Live Server / `python -m http.server`. No introducir bundlers, TypeScript, frameworks de UI adicionales ni gestores de paquetes sin registrar el cambio aquí y avisar explícitamente antes de hacerlo.
- **Sin llamadas a internet en tiempo de ejecución.** Toda librería (incluido Phaser) vive en `lib/` dentro del repo.

---

## 3. Cómo trabajar tarea por tarea

- Ejecuta **una tarea del `ROADMAP_PROJECT.md` a la vez**, en el orden en que aparece. No adelantes trabajo de una fase futura aunque parezca fácil de resolver de una vez.
- Al terminar una tarea: **ábrela y pruébala en el navegador** antes de darla por hecha. "No hay errores de sintaxis" no es lo mismo que "funciona". Describe qué probaste y qué viste.
- Si una tarea del roadmap resulta más grande de lo que parece, divídela en sub-pasos más chicos y dilo, en vez de intentar resolverla toda de una vez.
- Si falta una decisión de diseño (nombre de un objeto, un color, un sonido, un texto de refuerzo) que no esté ya definida en `ROADMAP_PROJECT.md`, **pregunta o marca un placeholder explícito con `// TODO:`**; no inventes contenido pedagógico final sin confirmarlo.

---

## 4. Cambios sobre código existente (a partir de la Fase 1)

- **Nunca reescribas un archivo completo para aplicar un cambio pequeño.** Usa una edición quirúrgica sobre el bloque específico. Si de verdad hace falta reescribir un archivo completo, dilo explícitamente antes de hacerlo y espera confirmación.
- Al proponer un cambio sobre un archivo ya existente, entrégalo en este formato:
  - **Archivo:** ruta exacta
  - **Antes:** el bloque tal como está
  - **Después:** el bloque nuevo
  - **Por qué:** una línea explicando la razón
- Modifica **un archivo a la vez**.
- Si un archivo de código supera ~250 líneas, antes de seguir agregándole cosas, propone un plan breve de cómo dividirlo en módulos más chicos.
- No uses `console.log` como parte del feedback real al jugador; solo como depuración temporal, y quítalo antes de cerrar la tarea.
- No uses emojis dentro de comentarios de código ni en mensajes de consola. Dentro de la interfaz del juego sí se permiten íconos o símbolos simples (por ejemplo, estrellas de puntaje) si ayudan a un niño a entender, priorizando gráficos propios del juego sobre emojis de sistema quality/consistencia visual.

---

## 5. Documentación y control de versiones

- Cada tarea o bloque de trabajo cerrado se registra en `BITACORA_REFACTOR.md`: fecha, qué se hizo, qué se decidió y qué sigue.
- Si un cambio deja desactualizado `README.md`, `ROADMAP_PROJECT.md` o la bitácora, **avísalo explícitamente** y entrega el texto exacto a actualizar; no lo dejes para "después".
- Al cerrar una tarea o fase, entrega el/los comando(s) de commit exactos, uno por archivo modificado cuando sea posible, mensaje en español y formato:
  ```
  git add src/scenes/NivelScene.js
  git commit -m "fase1-tarea1.2: agregar zonas de destino (dropzones) en NivelScene"
  ```
- Si te quedas sin contexto/tokens a mitad de una tarea, dilo explícitamente e indica con precisión en qué tarea del roadmap quedaste y qué falta, para poder retomar en otra sesión (chat, Antigravity o Gemini) sin perder el hilo.

---

## 6. Filosofía general

- Prioriza siempre los pilares de diseño de `ROADMAP_PROJECT.md` (claridad visual, refuerzo positivo, progresión gradual, rejugabilidad, sesiones cortas) por sobre cualquier idea nueva que surja a mitad de camino. Una idea que no calce con esos pilares se anota para una v2, no se mete a mitad de desarrollo.
- Es mejor un juego pequeño y terminado que uno ambicioso a medio hacer. Ante la duda entre agregar una función nueva o pulir lo que ya existe, prioriza pulir.
