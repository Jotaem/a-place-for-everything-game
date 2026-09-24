# Bocetos de pantallas en texto (Fase 0, tarea 0.6)

> Solo descripción de elementos, sin diseño gráfico ni código (el código llega en Fase 1/2).
> Base: loop principal de `Docs/ROADMAP_PROJECT.md` §4 y escenas `MenuScene`, `NivelScene`, `ResumenScene` de §6.
> Lienzo de referencia: 960×540. Textos de ejemplo en español; los definitivos de refuerzo se cierran en la Fase 4.
> Lo marcado con **Por confirmar** necesita tu visto bueno antes de la Fase 1.

## Pantalla 1 — Menú (`MenuScene`)

- Título grande: "Un Lugar Para Cada Cosa".
- Subtítulo breve (1 línea): qué hacer, por ejemplo "Arrastra cada cosa a su lugar". **Por confirmar** el texto exacto.
- Botones grandes (uno por escenario, mínimo 200×80 px): "La pieza", "El escritorio", "La cocina", "El librero".
- Cada botón muestra además cuántas estrellas se ganaron en ese nivel (de visitas anteriores). **Por confirmar** si las estrellas se muestran desde la Fase 2 o solo desde la 2.6 (guardado en `localStorage`).
- Botón opcional de silencio (música/efectos), visible desde el menú. **Por confirmar** si entra en Fase 1 o se deja para la Fase 3.3.

## Pantalla 2 — Nivel / juego (`NivelScene`)

- Arriba: nombre del escenario ("La pieza") + contador de estrellas del nivel actual + botón "Volver al menú".
- Centro-izquierda: objeto "fuera de lugar" actual, grande y arrastrable (ej. un zapato en el piso).
- Centro-derecha / abajo: 2–4 zonas de destino visibles con nombre e icono simple (ej. "Clóset", "Caja de juguetes").
- Al acertar (según §4): el objeto encaja con animación satisfactoria, suena algo agradable, suma 1 punto/estrella. Al fallar: rebota suave a su posición original, sin sonido negativo fuerte, y se puede reintentar.
- El nivel termina al colocar todos sus objetos (1–3 minutos por nivel).
- **Por confirmar:** ¿se muestra un objeto a la vez o varios a la vez en pantalla? Propongo uno a la vez (más claro para un niño, pilar de claridad visual), a confirmar antes de la Fase 1.

## Pantalla 3 — Resumen (`ResumenScene`)

- Mensaje grande de refuerzo, por ejemplo "¡Todo en su lugar!". **Por confirmar** el banco definitivo de frases (tarea 4.2: 5–8 frases distintas).
- Estrellas ganadas en el nivel (1–3, criterio por definir en Fase 2). **Por confirmar** el criterio exacto (¿por aciertos al primer intento?).
- Frase pedagógica central visible: "Un lugar para cada cosa, y cada cosa en su lugar."
- Botones grandes: "Jugar otra vez", "Elegir otro lugar" (volver al menú).
- **Por confirmar** si hay mensaje final de "modo historia" (tarea 4.3, opcional) o se deja para una v2.

## Verificación de esta tarea

- Los 3 bocetos cubren las 3 escenas de la estructura de `Docs/ROADMAP_PROJECT.md` §6 (`MenuScene`, `NivelScene`, `ResumenScene`) y el loop de §4 (aparece objeto → arrastrar → acierto/error → resumen). No se escribió lógica de juego ni se tocó `index.html` en esta tarea.
