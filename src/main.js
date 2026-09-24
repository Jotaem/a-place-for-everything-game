// Arranque de la Fase 2: el menú va primero y abre cada nivel (tarea 2.4).
// TODO: agregar ResumenScene en la Fase 4 (tarea 4.2).
// Configuración principal del juego (960x540 según ROADMAP Fase 0).
const config = {
  type: Phaser.AUTO,
  width: 960,
  height: 540,
  parent: 'gameContainer',
  backgroundColor: '#2d2d44',
  scene: [MenuScene, NivelScene]
};

// Arranque del juego.
const game = new Phaser.Game(config);
