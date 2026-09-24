// Funciones puras compartidas por las escenas (sin dependencias de Phaser).
// Se cargan con una etiqueta <script> antes que las escenas, 100% offline.

// Busca el nivel pedido o el primero por orden si no se indica ninguno.
// Devuelve el nivel o null si no hay datos.
function findLevelById(levelsData, requestedId) {
  const levels = (levelsData && levelsData.levels) || [];
  if (requestedId) {
    return levels.find((item) => item.id === requestedId) || null;
  }
  const ordered = levels.slice().sort((a, b) => a.order - b.order);
  return ordered[0] || null;
}

// Reparte los centros de las zonas a lo ancho, sin salirse del lienzo.
function spreadZonePositions(count, totalWidth, zoneWidth) {
  const edge = zoneWidth / 2 + 40;
  if (count <= 1) {
    return [totalWidth / 2];
  }
  const step = (totalWidth - edge * 2) / (count - 1);
  const positions = [];
  for (let index = 0; index < count; index += 1) {
    positions.push(edge + step * index);
  }
  return positions;
}

// Convierte un color del JSON ("#RRGGBB") al número que usa Phaser.
function parseHexColor(hexString) {
  return parseInt(hexString.slice(1), 16);
}

// Mezcla una copia del arreglo (orden distinto en cada partida, tarea 2.5).
function shuffleArray(items) {
  const mixed = items.slice();
  for (let index = mixed.length - 1; index > 0; index -= 1) {
    const other = Math.floor(Math.random() * (index + 1));
    const temp = mixed[index];
    mixed[index] = mixed[other];
    mixed[other] = temp;
  }
  return mixed;
}
