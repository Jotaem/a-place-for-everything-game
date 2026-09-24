# Un Lugar Para Cada Cosa

Juego 2D didáctico, casero y 100% local, para ejercitar con un niño la idea:

> **"Un lugar para cada cosa, y cada cosa en su lugar."**

El jugador arrastra objetos "fuera de lugar" (ropa, juguetes, útiles, platos, libros) hasta su lugar correcto en distintos escenarios de la casa (la pieza, el escritorio, la cocina, el librero). Cada acierto suma puntos y estrellas; los errores no penalizan, solo invitan a reintentar.

---

## Cómo jugar

1. Descarga o clona esta carpeta completa en tu computador.
2. Abre el archivo `index.html` haciendo doble clic (se abrirá en tu navegador).
   - Si el navegador no carga bien las imágenes o sonidos al abrirlo así, usa en su lugar la extensión **Live Server** de VS Code (clic derecho sobre `index.html` → "Open with Live Server"), o ejecuta `python -m http.server` dentro de la carpeta y entra a `http://localhost:8000` desde el navegador.
3. Elige un escenario desde el menú y arrastra cada objeto a donde crees que pertenece. ¡No hay forma de "perder"!

No se necesita internet para jugar: el juego y todas sus librerías viven dentro de esta carpeta.

---

## Requisitos

- Un navegador moderno (Chrome, Edge o similar).
- Opcional: [Visual Studio Code](https://code.visualstudio.com/) con la extensión Live Server, para evitar restricciones del navegador al cargar archivos locales.
- No se requiere Node.js, npm ni ninguna instalación adicional para jugar.

---

## Estructura del proyecto

```
juego-orden/
├── index.html
├── style.css
├── README.md               ← este archivo
├── ROADMAP_PROJECT.md       ← objetivo, fases y tareas de desarrollo
├── AGENTS.md                ← reglas de trabajo para la IA que desarrolla el juego
├── BITACORA_REFACTOR.md     ← registro de avance, sesión a sesión
├── assets/                  ← imágenes, sonidos y fuentes
├── lib/                     ← Phaser 3 (librería del juego, vendida localmente)
└── src/                     ← código del juego (escenas, configuración, utilidades)
```

---

## Estado actual del proyecto

📍 **Fase 0 — Preproducción**, recién iniciada: existe la documentación base (este README, el roadmap, las reglas para la IA y la bitácora), pero todavía no hay código del juego. El detalle de qué falta y en qué orden se hará está en `ROADMAP_PROJECT.md`.

---

## Documentación relacionada

- **`ROADMAP_PROJECT.md`** — objetivo del proyecto, público objetivo, pilares de diseño, stack técnico y el detalle completo de fases y tareas.
- **`AGENTS.md`** — convenciones de código y reglas de trabajo para cualquier IA (chat o agente) que colabore en el desarrollo.
- **`BITACORA_REFACTOR.md`** — historial de avance: qué se hizo, qué se decidió y qué sigue, sesión a sesión.

---

## Uso

Proyecto personal y familiar, sin fines comerciales.
