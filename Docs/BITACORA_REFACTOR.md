# BITACORA_REFACTOR.md

## Registro de avance del proyecto "Un Lugar Para Cada Cosa"

> Formato de cada entrada: fecha, qué se hizo, qué se decidió (y por qué, si no es obvio), y qué queda pendiente para la próxima sesión. Se agrega una entrada nueva al cerrar cada tarea o bloque de trabajo relevante del `ROADMAP_PROJECT.md`; no se borran entradas anteriores.

---

### 2026-09-24 — Hito 0: Documentación base del proyecto

**Qué se hizo:**
- Se redactó `ROADMAP_PROJECT.md`: objetivo del proyecto, público objetivo, pilares de diseño, concepto del juego, stack técnico (HTML/CSS/JS + Phaser 3 local), estructura de carpetas y el detalle completo de fases y tareas (Fase 0 a Fase 6).
- Se redactó `AGENTS.md`: convenciones de código (nombres en inglés, comentarios en español, contenido pedagógico siempre en JSON, sin build tools obligatorios, sin llamadas a internet en runtime), forma de trabajar tarea por tarea, formato de cambios quirúrgicos sobre código existente, reglas de documentación y control de versiones.
- Se redactó `README.md`: instrucciones de cómo abrir y jugar el juego, requisitos, estructura del proyecto y estado actual.
- Se creó este archivo (`BITACORA_REFACTOR.md`) con su primer registro.

**Qué se decidió:**
- Motor/librería: **Phaser 3**, descargado y guardado localmente en `lib/` (no vía CDN), para garantizar que el juego corra 100% offline.
- Convención de nombres: identificadores de código en inglés, comentarios y textos de UI en español.
- Los datos de niveles (objetos, lugares correctos, dificultad) vivirán en `src/config/niveles.json`, separados de la lógica de las escenas.
- No se generará ningún código todavía: este hito es exclusivamente de documentación, siguiendo la práctica habitual de dejar el contexto completo por escrito antes de empezar a programar.

**Estado del proyecto:** Fase 0 (Preproducción) — documentación base lista. Aún no existe estructura de carpetas real ni ningún archivo de código.

**Próximo paso (siguiente sesión):**
- Comenzar la Fase 0 en la práctica: crear la estructura de carpetas de `ROADMAP_PROJECT.md` §6, y las tareas 0.1 a 0.6 (esqueleto de `index.html`, Phaser cargando una escena vacía, tabla de contenido pedagógico definitiva, paleta de colores/tipografía, bocetos de las 3 pantallas).

---

### 2026-09-24 — Fase 0 (Preproducción) cerrada: tareas 0.1 a 0.6

**Qué se hizo (tarea por tarea):**
- 0.1: creadas las carpetas `assets/` (`images/`, `sounds/`, `fonts/`), `lib/`, `src/` (`config/`, `scenes/`, `utils/`). Solo carpetas; las carpetas vacías no las rastrea git hasta que tengan archivos.
- 0.2: creado `index.html` mínimo con `<canvas>` de 960×540 y texto "Hola mundo" dibujado con canvas 2D, sin Phaser, más `style.css` mínimo. Verificado sirviendo con `python -m http.server` (equivalente a Live Server para archivos estáticos): `index.html` y `style.css` devolvieron 200 y no había referencias externas.
- 0.3: descargado `lib/phaser.min.js` exactamente versión 3.90.0 desde `https://cdn.jsdelivr.net/npm/phaser@3.90.0/dist/phaser.min.js`. Hash SHA256 idéntico al de `node_modules/phaser/dist/phaser.min.js` (3.90.0): `E92DDEF1…8EBA7A7`. Creado `src/main.js` con escena vacía `BootScene` (fondo `#2D2D44`, texto "Hola mundo Phaser", 960×540) y reescrito `index.html` para cargar `lib/phaser.min.js` + `src/main.js` en un `div#gameContainer`. Verificado: `node --check` OK, los 4 archivos sirven 200 por HTTP, sin URLs externas en `index.html`/`main.js`. Limitación honesta: en este entorno no hay navegador gráfico, así que no pude ver el lienzo renderizado ni la consola del navegador; queda pendiente que lo abras tú con Live Server y confirmes el fondo con el texto.
- 0.4: creado `Docs/CONTENIDO_PEDAGOGICO.md` con la tabla final (los mismos 4 escenarios, objetos y lugares del roadmap §4, sin inventar nada nuevo).
- 0.5: creado `Docs/PALETA_TIPOGRAFIA.md` (propuesta) y registradas las variables en `style.css` (fondo crema `#FFF8E7`, texto `#2D2D44`, pila de fuentes redondeadas del sistema, 100% offline). Verificado: `style.css` sirve 200 y no tiene `@import`/`url()`/http.
- 0.6: creado `Docs/BOCETOS_PANTALLAS.md` con los bocetos en texto de Menú, Nivel y Resumen, cubriendo `MenuScene`/`NivelScene`/`ResumenScene` y el loop de §4.

**Qué se decidió:**
- Tamaño de lienzo: 960×540 (opción sugerida del roadmap).
- Paleta y tipografía quedan como PROPUESTA por confirmar (ver `Docs/PALETA_TIPOGRAFIA.md`); no se descargó ninguna fuente para seguir 100% offline.
- La asignación exacta objeto → lugar dentro de cada escenario se difiere a la tarea 2.1 (diseño de `niveles.json`) en vez de inventarla ahora.
- Convenciones respetadas: identificadores en inglés, comentarios y UI en español, sin llamadas a internet en ejecución (todo local en `lib/`).

**Contradicciones con AGENTS.md detectadas (las digo explícitamente, no las ignoro):**
- Existe `package.json` con `vite` + script `dev`/`build`, lo que choca con AGENTS.md §2 ("sin build tools ni npm obligatorios"). No lo toqué en esta fase; el juego se abre y verifica sin npm (solo `index.html` + `lib/` + `src/`). Decidir si se elimina `package.json`/`node_modules` o se registra la excepción en AGENTS.md.
- El roadmap §6 muestra `AGENTS.md`/`ROADMAP_PROJECT.md`/`BITACORA_REFACTOR.md` en la raíz, pero en este repo viven en `Docs/`. No los moví; si quieres, los dejo en `Docs/` y se anota la excepción.

**Qué falta / próximo paso:**
- Que abras `index.html` con Live Server y confirmes: fondo crema en la página, lienzo Phaser de 960×540 con fondo `#2D2D44` y texto "Hola mundo Phaser", consola sin errores.
- Confirmar los puntos marcados "Por confirmar" en `Docs/CONTENIDO_PEDAGOGICO.md`, `Docs/PALETA_TIPOGRAFIA.md` (incluida la paleta de la presentación familiar, que no tengo) y `Docs/BOCETOS_PANTALLAS.md`.
- Fase 1 pendiente de tu confirmación explícita: no se escribió lógica de juego (solo la escena vacía de la tarea 0.3).

**Estado del proyecto:** Fase 0 completa en archivos; Fase 1 sin empezar, a la espera de tu confirmación.

---

### 2026-09-24 — Fase 1 (vertical slice) implementada: tareas 1.1 a 1.6

**Qué se hizo (tarea por tarea, en orden, un archivo a la vez):**
- 1.1: creado `src/scenes/NivelScene.js` con un rectángulo arrastrable (contenedor + `setInteractive({ draggable: true })` + handler `drag` que sigue al puntero, mouse o táctil). `src/main.js` ahora arranca `NivelScene` en vez de la escena vacía de la Fase 0, e `index.html` carga el nuevo script. Sin `console.log`, sin emojis en código.
- 1.2: agregadas 2 zonas visibles ("Clóset" en 240,430 y "Caja de juguetes" en 720,430, rectángulos 220×120 color `--color-secondary`), con su geometría guardada en `this.dropZones`. El objeto se dibuja por encima (`setDepth(1)`).
- 1.3: detección en `dragend` vía `getZoneAt(x, y)` + `resolveDrop()`: correcta (Camiseta→Clóset) muestra "¡Muy bien! Era ahí.", cualquier otro caso muestra "Todavía no. Prueba en otro lugar." (verificado también el borde x=130 y soltar fuera).
- 1.4: acierto suma 1 en `score` ("Estrellas: N" arriba a la derecha), desactiva el arrastre del objeto colocado, tween de encaje al centro de la zona (200 ms) + pulso de escala (1.15, yoyo), y tono breve de 2 notas ascendentes con WebAudio (placeholder, sin assets, 100% offline).
- 1.5: error con tween de vuelta a casa (300 ms, `Power2`), se reactiva el arrastre al terminar, puntaje intacto, silencio total (opción permitida por el roadmap, coherente con "cero castigo").
- 1.6: cola de 3 objetos (Camiseta→clóset, Peluche→caja, Pijama→clóset), uno a la vez vía `spawnCurrentItem()`; cada acierto programa el siguiente (`delayedCall` 600 ms) y tras el tercero aparece "¡Todo en su lugar!" (`showLevelComplete()`). El error no avanza la cola. La 1.6 se dividió en dos sub-pasos (cola+spawn, avance+cierre) por ser más grande de lo aparente.

**Qué se decidió (todo marcado con `// TODO`, nada como definitivo):**
- Asignación provisional objeto→lugar solo para el prototipo; la definitiva va a `niveles.json` en la tarea 2.1.
- Un objeto a la vez (propuesta del boceto); por confirmar frente a varios a la vez.
- Fondo oscuro de Fase 0 mantenido; timbre WebAudio y mensaje de cierre como placeholders de Fase 3.3 y 4.2 (`ResumenScene`).
- Archivo `NivelScene.js` en 220 líneas: bajo el umbral de ~250 de AGENTS.md, no se divide todavía (se hará al agregar `MenuScene`/niveles reales).

**Verificación honesta (sin navegador gráfico en este entorno, no asumo que "se ve bien"):**
- `node --check` OK en `main.js` y `NivelScene.js`; `index.html`/`main.js`/`NivelScene.js`/`style.css` sirven 200 por `http.server`; sin URLs externas (solo la palabra "CDN" en un comentario que dice "sin CDN").
- Lógica probada con stubs de Phaser en Node: 1.1 mueve a (100,100); 1.2 dos zonas con etiquetas; 1.3 correcta/incorrecta/fuera/borde; 1.4 puntaje 1, 2 tweens, encaje a (240,430), objeto no interactivo, tono no rompe sin `window`; 1.5 tween a casa (480,300), re-activa arrastre, puntaje 0; 1.6 loop de 3 con error intermedio que no avanza y cierre con mensaje.
- NO pude ver el lienzo ni probar el arrastre real con mouse/touch: queda pendiente que abras `index.html` con Live Server y confirmes lo visual (tarea 1.7, tuya).

**Contradicciones con AGENTS.md detectadas (las digo explícitamente):**
- Tu mensaje pedía a la vez "EXCLUSIVAMENTE la Fase 1" y "Empieza por la tarea 0.1" / "Al terminar la Fase 0": la Fase 0 ya estaba cerrada en archivos según esta bitácora, así que empecé en la 1.1 sin repetir la 0.1–0.6.
- "Todas las tareas" en una sesión tensiona el "una tarea a la vez": lo respeté implementando y verificando tarea por tarea, en orden, sin adelantar Fase 2.
- `package.json` con `vite` sigue chocando con "sin build tools" (§2, ya anotado en la entrada anterior): no lo toqué; el juego se verifica sin npm.
- Excepción documentada a "contenido siempre en JSON": la cola de la 1.6 está hardcodeada como placeholder del prototipo, con `// TODO` a `niveles.json` (tarea 2.1).

**Qué falta / próximo paso:**
- Tarea 1.7 (tuya): abrir con Live Server y probar el guion de la guía (arrastrar Camiseta al Clóset, fallar a propósito a la Caja, completar los 3), idealmente con el niño; anotar hallazgos aquí.
- Por confirmar antes de la Fase 2: asignación objeto→lugar, uno vs varios a la vez, fondo claro/oscuro, y si `package.json` se elimina o se registra la excepción en AGENTS.md.
- Fase 2 sin empezar, a la espera de tu confirmación explícita.

**Estado del proyecto:** Fase 1 implementada y verificada sin navegador (tareas 1.1–1.6); tarea 1.7 (playtesting humano) pendiente. Fase 2 sin empezar.
