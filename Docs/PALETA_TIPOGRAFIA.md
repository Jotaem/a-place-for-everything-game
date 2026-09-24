# Paleta de colores y tipografía (Fase 0, tarea 0.5)

> Propuesta pendiente de tu confirmación. No invento nada como definitivo:
> todo lo marcado con **Por confirmar** necesita tu visto bueno antes de la Fase 1.
> No tengo a la vista la "presentación familiar sobre el orden" que menciona el roadmap,
> así que propongo una paleta propia de alto contraste y la dejo lista para comparar
> con la de esa presentación cuando me la compartas.

## Paleta propuesta (alto contraste, tonos cálidos para niños)

| Nombre (variable CSS) | Valor | Uso |
|---|---|---|
| `--color-background` | `#FFF8E7` | Fondo de la página (crema cálido) |
| `--color-surface` | `#FFFFFF` | Tarjetas y paneles |
| `--color-text` | `#2D2D44` | Texto principal (azul muy oscuro, mismo que el fondo de la escena Phaser de la tarea 0.3) |
| `--color-primary` | `#FF6B6B` | Botones principales y destacados (coral) |
| `--color-secondary` | `#4ECDC4` | Zonas de destino (turquesa) |
| `--color-accent` | `#FFD93D` | Estrellas y premios (amarillo) |
| `--color-success` | `#6BCB77` | Aciertos (verde) |

- **Por confirmar:** ¿reutilizamos la paleta de la presentación familiar sobre el orden para dar continuidad visual? Si me compartes ese archivo (o sus colores), reemplazo esta tabla.
- **Por confirmar:** fondo del lienzo del juego, ¿claro u oscuro? La escena de la tarea 0.3 usa `#2D2D44` (oscuro) con texto blanco; si preferimos un juego claro para niños, se cambia en la Fase 1 junto con el color del texto.

## Tipografía (100% offline, sin descargar fuentes)

- Familia: pila de fuentes redondeadas del propio sistema, sin llamadas a internet:
  `"Arial Rounded MT Bold", "Chalkboard SE", "Comic Sans MS", sans-serif`.
- Tamaños: base 18–20 px, títulos 32–48 px, botones mínimo 24 px (manos y ojos de niño, según Fase 3.5).
- **Por confirmar:** ¿vendemos una fuente propia en `assets/fonts/` más adelante (Fase 3.5) o nos quedamos con la pila del sistema? No descargo nada ahora para no meter una decisión definitiva sin tu visto bueno.

## Dónde quedó registrada

- Las variables ya están aplicadas en `style.css` (`:root`), así que la página (`index.html`) muestra la paleta desde ahora.
- El lienzo de Phaser (`src/main.js`) mantiene el fondo `#2D2D44` verificado en la tarea 0.3; los colores de juego se aplican en la Fase 1/3.

## Verificación de esta tarea

- Abrir `index.html` (Live Server o `python -m http.server`): fondo crema, título en azul oscuro, sin errores en consola. Los colores visibles vienen de las variables de `style.css`.
