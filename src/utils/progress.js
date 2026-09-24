// Progreso guardado en el navegador (tarea 2.6): mejor puntaje por nivel.
// Sin servidor ni cuentas. Si localStorage no está disponible, el juego sigue
// funcionando pero sin recordar el progreso.

// Clave única del juego en localStorage.
const PROGRESS_KEY = 'lugarParaCadaCosa.v1';

// Lee el progreso guardado o devuelve uno vacío si no hay nada válido.
function loadProgress() {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) {
      return { best: {} };
    }
    const data = JSON.parse(raw);
    if (!data || typeof data.best !== 'object') {
      return { best: {} };
    }
    return data;
  } catch (error) {
    return { best: {} };
  }
}

// Guarda el progreso en el navegador (ignora fallos en silencio).
function saveProgress(data) {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(data));
  } catch (error) {
    // Sin guardado si el navegador lo bloquea: el juego sigue funcionando.
  }
}

// Mejor puntaje logrado en un nivel (0 si nunca se jugó).
function getBestLevelScore(levelId) {
  const data = loadProgress();
  const best = data.best[levelId];
  return typeof best === 'number' ? best : 0;
}

// Guarda el puntaje si supera el mejor anterior. Devuelve el mejor vigente.
function saveBestLevelScore(levelId, score) {
  const data = loadProgress();
  const previous = typeof data.best[levelId] === 'number' ? data.best[levelId] : 0;
  const next = Math.max(previous, score);
  data.best[levelId] = next;
  saveProgress(data);
  return next;
}
