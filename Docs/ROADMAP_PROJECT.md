# ROADMAP_PROJECT.md

## Proyecto: Juego didáctico — "Un lugar para cada cosa"

> **Cómo usar este documento (léelo primero, IA):**
> Este roadmap es la fuente de verdad del proyecto. Antes de escribir código en cualquier sesión, lee este archivo completo junto a `AGENTS.md` y `BITACORA_REFACTOR.md` (si ya existen). Trabaja **una tarea a la vez**, en el orden en que aparecen. No saltes de fase. Al terminar una tarea, márcala como hecha (`[x]`), anota en `BITACORA_REFACTOR.md` qué cambiaste y por qué, y **prueba el juego manualmente** en el navegador antes de seguir. Si una tarea parece grande, divídela en sub-tareas más pequeñas antes de tocar código: en desarrollo de juegos, incrementos pequeños y jugables valen más que módulos grandes sin probar.

---

## 1. Objetivo del proyecto

Construir un **juego 2D casero, que corre 100% en local** (sin instalar nada más que un navegador), cuyo propósito pedagógico único es ejercitar y reforzar en un niño la idea:

> **"Un lugar para cada cosa, y cada cosa en su lugar."**

El juego no busca ser comercial ni complejo. Busca ser **pequeño, pulido y repetible**: que el niño practique una y otra vez la habilidad de reconocer dónde pertenece cada objeto, con una experiencia agradable, sin castigo ni frustración.

### Criterios de éxito

- [ ] El juego se abre haciendo doble clic o con una instrucción simple, sin internet.
- [ ] Un niño de la edad objetivo juega sin ayuda de un adulto tras una explicación breve.
- [ ] El mensaje central queda explícito y memorable dentro del propio juego (no solo en el título).
- [ ] Ninguna mecánica humilla, castiga fuerte ni genera ansiedad por tiempo (salvo que se elija un modo opcional de desafío).
- [ ] El código está en GitHub, versionado por tarea/fase, con documentación viva.

---

## 2. Público objetivo y objetivo de aprendizaje

- **Jugador:** niño en edad de primaria, jugando solo o acompañado, sesiones cortas (2–5 minutos).
- **Habilidad a ejercitar:** categorización — asociar un objeto con su "hogar" correcto (dónde vive esa cosa) y actuar en consecuencia (arrastrarlo/colocarlo ahí).
- **Resultado esperado tras varias sesiones:** que la frase y el hábito de "buscarle un lugar a las cosas" se vuelvan automáticos y positivos, no una obligación.

Esto determina decisiones de diseño más abajo: nada de temporizadores agresivos por defecto, nada de "game over", refuerzo positivo constante.

---

## 3. Pilares de diseño (no negociables)

Estos pilares son el filtro para aceptar o rechazar cualquier idea nueva durante el desarrollo:

1. **Claridad visual instantánea** — el jugador debe entender en menos de 3 segundos qué hacer, sin leer instrucciones largas.
2. **Refuerzo positivo, cero castigo humillante** — un error nunca se ve como "fracaso", solo como "todavía no". Nunca sonido de "buzzer" fuerte ni mensajes negativos.
3. **Progresión gradual** — cada nivel agrega un poquito de dificultad (más objetos, lugares más parecidos entre sí, distractores), nunca un salto brusco.
4. **Rejugable** — variedad de objetos y escenarios para que no se sienta repetitivo al tercer intento.
5. **Sesiones cortas** — un nivel se completa en 1–3 minutos. El niño debe poder decir "uno más" y terminar rápido.

Cualquier tarea de las fases de abajo que choque con estos pilares debe ajustarse antes de implementarse.

---

## 4. Concepto del juego (resumen de una página)

- **Título de trabajo:** *"Un Lugar Para Cada Cosa"* (renombrable).
- **Género:** puzzle casual de clasificación (*sorting game*), estilo "ordena y guarda".
- **Cámara/perspectiva:** 2D, vista frontal tipo escenario de habitación/mueble.
- **Loop principal (core loop):**
  1. Aparece un objeto "fuera de lugar" en la escena (ej. un zapato en el piso).
  2. El jugador lo arrastra hacia el lugar correcto entre 2–4 opciones visibles (ej. clóset, librero, caja de juguetes, cocina).
  3. Si acierta: el objeto encaja con una animación satisfactoria, suena algo agradable, suma un punto/estrella.
  4. Si falla: el objeto rebota suavemente a su posición original, sin sonido negativo fuerte; puede reintentar.
  5. Se repite con el siguiente objeto hasta terminar el nivel.
  6. Pantalla de resumen con estrellas y una frase de refuerzo ("¡Todo en su lugar!").
- **Escenarios/niveles temáticos (sugeridos, ajustables):**
  - La pieza (ropa, juguetes, libros)
  - El escritorio (útiles, papeles, libros)
  - La cocina (platos, cubiertos, alimentos)
  - El librero/oficina (libros, carpetas, archivos)
- **Condición de victoria:** completar todos los objetos del nivel. No existe "derrota"; como máximo, un puntaje más bajo que invita a reintentar.

### Tabla de contenido pedagógico inicial (ejemplo, editable en Fase 0)

| Escenario  | Objetos a ordenar                  | Lugar correcto        |
|------------|-------------------------------------|------------------------|
| La pieza   | Camiseta, zapatos, peluche, pijama  | Clóset / caja de juguetes |
| Escritorio | Lápiz, cuaderno, libro, tijeras     | Cartuchera / librero / cajón |
| Cocina     | Plato, vaso, cuchara, manzana       | Alacena / frutero / cajón de cubiertos |
| Librero    | Libro de cuentos, carpeta, revista  | Librero / archivador   |

Esta tabla es el primer insumo real del juego: convertirla en datos (JSON) es una tarea de la Fase 2.

---

## 5. Stack tecnológico recomendado

**Contexto relevante:** no tienes experiencia previa en desarrollo de juegos ni de apps móviles; tu experiencia es con webapps (Google Apps Script) y RPA en Python, usas Windows y VS Code. Esto inclina la balanza hacia una solución **web local**, no hacia un motor de juegos tradicional (Unity/Godot), que tiene una curva de aprendizaje mayor y no aporta beneficio real para un juego 2D simple.

### Recomendación: HTML5 + CSS + JavaScript, con **Phaser 3** como librería de juego

| Opción | Pros | Contras | ¿Recomendada? |
|---|---|---|---|
| Vanilla JS + `<canvas>` puro | Cero dependencias, control total | Hay que programar drag&drop, colisiones y escenas a mano → más código para la IA y más superficie de error | Alternativa válida si se quiere máxima simplicidad, pero más trabajo |
| **Phaser 3** (librería JS de juegos 2D) | Drag&drop, escenas, sonido y física ya resueltos; muy documentada; los modelos de IA la conocen bien; un solo archivo `.js`, sin build ni npm obligatorio | Una dependencia externa (un archivo `.js` de ~1 MB) | **Sí, recomendada** |
| Godot / Unity | Motores robustos, ideal para juegos más grandes | Requieren instalar un editor pesado, exportar builds, curva de aprendizaje alta, mal ajustado a "vibecoding" por chat | No para este proyecto |

**Decisión:** usar **Phaser 3**, descargando el archivo de la librería y **guardándolo dentro del proyecto** (no vía CDN), para garantizar que el juego funcione 100% sin conexión a internet, tal como se pidió ("que corra en local").

### Cómo se ejecuta en local

- Opción simple: abrir `index.html` directamente con doble clic en el navegador.
- Opción recomendada (evita restricciones de seguridad del navegador al cargar assets): usar la extensión **"Live Server"** de VS Code (un clic, ya que usas VS Code) o correr `python -m http.server` en la carpeta del proyecto y abrir `http://localhost:8000`.
- No se requiere backend, base de datos ni instalación de Node/npm para jugar. Si más adelante se usa alguna herramienta de build, debe seguir siendo opcional para "jugar", nunca obligatoria.

---

## 6. Estructura de carpetas y archivos

```
juego-orden/
├── index.html
├── style.css
├── README.md
├── ROADMAP_PROJECT.md        ← este archivo
├── AGENTS.md                 ← reglas para la IA (ver sección 7)
├── BITACORA_REFACTOR.md      ← registro de avance, sesión a sesión
├── assets/
│   ├── images/
│   ├── sounds/
│   └── fonts/
├── lib/
│   └── phaser.min.js         ← librería vendida localmente (no CDN)
└── src/
    ├── main.js                ← arranque del juego y configuración de Phaser
    ├── config/
    │   └── niveles.json        ← datos de niveles: objetos, lugares, dificultad
    ├── scenes/
    │   ├── MenuScene.js
    │   ├── NivelScene.js
    │   └── ResumenScene.js
    └── utils/
        └── helpers.js
```

Mantener **datos de contenido (niveles, objetos) separados del código** en `niveles.json` es clave: así se pueden agregar niveles nuevos sin tocar lógica ni arriesgar bugs.

---

## 7. Reglas de trabajo para el agente de IA (resumen — detállalas en `AGENTS.md`)

- Cambios **pequeños e incrementales**; una tarea del roadmap por iteración.
- Después de cada tarea: **abrir el juego en el navegador y probarlo** antes de continuar. Nunca asumir que "compila" = "funciona".
- No introducir frameworks, bundlers ni dependencias nuevas sin que quede registrado aquí primero.
- Comentar el código en español, nombres de variables/funciones en inglés (convención común; ajustable si prefieres todo en español — decídelo antes de la Fase 1 y anótalo en `AGENTS.md`).
- Commits atómicos por tarea en GitHub, con mensaje que indique la fase y tarea (ej. `fase2-tarea2.3: agregar menú de selección de nivel`).
- Al cerrar cada fase: actualizar `BITACORA_REFACTOR.md`, hacer commit, y si se te acaba el contexto, sincronizar la documentación con Drive/NotebookLM como en tus otros proyectos.

---

## 8. Fases y tareas

### Fase 0 — Preproducción (medio día de trabajo)
**Meta:** dejar el terreno listo y el contenido pedagógico definido antes de escribir lógica de juego.

- [ ] 0.1 Crear la estructura de carpetas de la sección 6.
- [ ] 0.2 Crear `index.html` mínimo que solo muestre un `<canvas>` con un texto "Hola mundo" (sin Phaser aún). **DoD:** abrir el archivo en el navegador y ver el texto, sin errores en consola.
- [ ] 0.3 Descargar `phaser.min.js` y colocarlo en `lib/`. Crear una escena vacía de Phaser con un color de fondo. **DoD:** consola sin errores, canvas del tamaño definido (sugerido 960×540 o 800×600).
- [ ] 0.4 Definir y escribir la tabla de contenido pedagógico final (escenarios, objetos, lugares correctos) partiendo de la tabla de la sección 4. Esto se usará tal cual en la Fase 2.
- [ ] 0.5 Definir paleta de colores y tipografía pensada para niños (alto contraste, letras grandes, redondeadas). Puede reutilizarse la paleta de la presentación familiar sobre el orden si se quiere continuidad visual.
- [ ] 0.6 Bocetar en texto (no requiere diseño gráfico) las 3 pantallas: Menú, Nivel (juego), Resumen. Basta una descripción de qué elementos va en cada una.

**DoD de fase:** existe un proyecto vacío mostrando Phaser funcionando, más una tabla de contenido y bocetos de pantalla listos para implementar.

---

### Fase 1 — Prototipo del mecanismo central (*vertical slice*)
**Meta:** un solo nivel jugable de principio a fin, con arte de relleno (rectángulos de colores), para validar que la mecánica se siente bien antes de invertir en contenido o arte.

- [ ] 1.1 Implementar un objeto arrastrable (drag) con el mouse/touch usando la física de arrastre de Phaser.
- [ ] 1.2 Implementar 2–3 "zonas de destino" (dropzones) visibles en pantalla.
- [ ] 1.3 Detectar si el objeto se soltó sobre la zona correcta o incorrecta.
- [ ] 1.4 Feedback de acierto: el objeto encaja en su lugar (animación de escala/asentamiento), sonido agradable breve, se suma un punto.
- [ ] 1.5 Feedback de error: el objeto vuelve suavemente (tween) a su posición original, sin sonido negativo agresivo (silencio o un sonido neutro tipo "clic suave"); el jugador puede reintentar sin penalización.
- [ ] 1.6 Encadenar 3 objetos seguidos en la misma escena (mini-nivel de prueba) para validar el loop completo.
- [ ] 1.7 Probar el vertical slice con alguien (idealmente el niño) para validar que la mecánica de arrastrar-y-soltar se entiende sin explicación larga.

**DoD de fase:** se puede jugar una ronda de 3 objetos con placeholders, con feedback claro de acierto/error, sin errores de consola.

---

### Fase 2 — Contenido y niveles
**Meta:** convertir el prototipo en un juego con múltiples niveles reales, basados en datos.

- [ ] 2.1 Diseñar el esquema de `niveles.json`: por nivel, lista de objetos, su lugar correcto, y (opcional) nivel de dificultad.
- [ ] 2.2 Cargar los niveles definidos en la Fase 0.4 dentro de `niveles.json` (4–6 niveles temáticos, 5–8 objetos cada uno).
- [ ] 2.3 Generalizar `NivelScene.js` para que lea cualquier nivel desde el JSON, en vez de tener objetos hardcodeados.
- [ ] 2.4 Crear `MenuScene.js`: pantalla inicial con botones para elegir nivel/escenario.
- [ ] 2.5 Implementar progresión de dificultad entre niveles: más objetos, lugares más parecidos entre sí, algún objeto "distractor" que no encaja en ninguna zona obvia (para practicar discriminación, no solo memoria).
- [ ] 2.6 (Opcional) Guardar progreso en `localStorage` del navegador (niveles completados, mejor puntaje), sin necesidad de servidor ni cuentas.

**DoD de fase:** todos los niveles definidos son jugables de principio a fin, seleccionables desde el menú, sin tocar código para agregar un nivel nuevo (solo editar el JSON).

---

### Fase 3 — Arte y sensación de juego (*game feel* / *juicing*)
**Meta:** que el juego se sienta agradable y "vivo", no una demo técnica.

- [ ] 3.1 Reemplazar los rectángulos placeholder por arte simple. Usar bancos de assets gratuitos y libres de derechos (ej. Kenney.nl) o generar ilustraciones propias respetando derechos de uso; evitar usar personajes o arte con marca registrada.
- [ ] 3.2 Animaciones de transición entre Menú → Nivel → Resumen (algo simple, como un fundido).
- [ ] 3.3 Sonido: efecto de acierto, efecto neutro de "reintenta", música de fondo opcional (loop corto, volumen bajo, con opción de silenciar).
- [ ] 3.4 Micro-detalles de recompensa: partículas o destello al acertar, contador de estrellas visible.
- [ ] 3.5 Revisar tipografía y tamaños de UI pensando en manos y ojos de niño (botones grandes, texto grande, alto contraste).

**DoD de fase:** jugar una ronda se siente satisfactorio por sí mismo, no solo "correcto/incorrecto" en texto plano.

---

### Fase 4 — Capa educativa y de refuerzo (el diferenciador del proyecto)
**Meta:** hacer explícito el mensaje pedagógico central; sin esto, el juego es genérico.

- [ ] 4.1 Agregar frases de refuerzo cortas entre niveles y en la pantalla de resumen (ej. "¡Un lugar para cada cosa, y cada cosa en su lugar!").
- [ ] 4.2 Pantalla de resumen post-nivel con estrellas y una frase distinta cada vez (evitar que se sienta repetitivo, tener un banco de 5–8 frases).
- [ ] 4.3 (Opcional) Pantalla o mensaje final del "modo historia" que conecte con la idea de que ordenar ayuda a la familia y no es un fin en sí mismo (coherente con la presentación familiar sobre el orden, si se desea esa continuidad temática).
- [ ] 4.4 (Opcional) Pistas por texto o audio grabado por un familiar ("papá/mamá dice...") para dar calidez al juego.

**DoD de fase:** el mensaje pedagógico central es visible y se repite de forma natural, no forzada, dentro de la experiencia de juego.

---

### Fase 5 — Pulido, accesibilidad y pruebas
**Meta:** encontrar y corregir problemas antes de darlo por terminado.

- [ ] 5.1 Sesión de *playtesting* real con el niño objetivo: observar en qué punto se frustra, se aburre o no entiende algo; anotar hallazgos en `BITACORA_REFACTOR.md`.
- [ ] 5.2 Ajustar dificultad/tiempos según lo observado en el playtesting.
- [ ] 5.3 Revisar accesibilidad básica: zonas táctiles grandes (si se juega en tablet/touch), no depender solo del color para indicar correcto/incorrecto (agregar también ícono o forma).
- [ ] 5.4 Probar en al menos dos navegadores (ej. Chrome y Edge) y a distinto tamaño de ventana.
- [ ] 5.5 Corregir bugs encontrados. Congelar el alcance (*scope freeze*): no agregar features nuevas en esta fase, solo pulir lo existente.

**DoD de fase:** cero errores críticos conocidos; el niño objetivo completó al menos una sesión de juego real con reacción positiva.

---

### Fase 6 — Empaquetado final y documentación
**Meta:** dejar el juego listo para usarse indefinidamente sin depender de ti como desarrollador.

- [ ] 6.1 Confirmar que el juego corre completamente offline (sin ninguna llamada a internet, incluyendo la librería Phaser vendida localmente).
- [ ] 6.2 Escribir en `README.md` instrucciones "cómo jugar" pensadas para un adulto no técnico o el propio niño (2–3 pasos, sin jerga).
- [ ] 6.3 Actualizar `BITACORA_REFACTOR.md` con el resumen de todo el desarrollo y hacer el commit final en GitHub.
- [ ] 6.4 (Opcional, evaluar costo/beneficio) Empaquetar como aplicación de escritorio con Electron si se quiere un ícono para hacer doble clic sin navegador visible; no es necesario para cumplir el objetivo del proyecto.

**DoD de fase:** cualquier persona en el computador puede abrir y jugar el juego siguiendo el README, sin tu ayuda ni conexión a internet.

---

## 9. Buenas prácticas de desarrollo de videojuegos aplicadas en este roadmap

- **Vertical slice antes que contenido masivo:** primero un nivel completo y divertido, después se escala en cantidad (Fase 1 antes que Fase 2).
- **Feedback loops claros:** cada acción del jugador (arrastrar, soltar) tiene una reacción inmediata (encajar, rebotar) y una recompensa (punto, sonido, estrella).
- **Curva de dificultad gradual:** nunca un salto brusco entre niveles; los distractores se introducen progresivamente.
- **Playtesting temprano y con el usuario real:** no esperar al final para mostrárselo al niño; sus reacciones son la métrica más importante de éxito.
- **Datos separados del código:** los niveles viven en `niveles.json`, no en el código de las escenas, para poder ampliar contenido sin riesgo de romper lógica.
- **"Juicing" (pulido sensorial):** pequeños detalles (partículas, sonido, animación) importan tanto como la mecánica en sí para la percepción de calidad.
- **Control de alcance (*scope*):** es mejor un juego pequeño y terminado que uno ambicioso y a medio hacer; nuevas ideas se anotan para una v2, no se meten a mitad de desarrollo.
- **Documentación continua:** este roadmap, el `AGENTS.md` y la bitácora existen para que cualquier sesión de IA (Antigravity, Gemini, Claude) recupere el contexto completo sin depender de tu memoria.

---

## 10. Checklist final del proyecto

- [ ] El juego abre localmente sin instalar nada más que un navegador.
- [ ] Un niño de la edad objetivo juega sin ayuda tras una explicación breve.
- [ ] El mensaje "un lugar para cada cosa y cada cosa en su lugar" es explícito y memorable dentro del juego.
- [ ] No hay mecánicas de castigo, humillación ni frustración excesiva.
- [ ] El código está versionado en GitHub con historial claro por tarea.
- [ ] `README.md`, `ROADMAP_PROJECT.md` y `BITACORA_REFACTOR.md` están actualizados y reflejan el estado real del proyecto.
