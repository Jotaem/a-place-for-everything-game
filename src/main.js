// Arranque de la Fase 1: la escena jugable vive en src/scenes/NivelScene.js.
// TODO: agregar MenuScene y ResumenScene en la Fase 2 (tareas 2.4 y 4.2).
// Configuración principal del juego (960x540 según ROADMAP Fase 0).
const config = {
  type: Phaser.AUTO,
  width: 960,
  height: 540,
  parent: 'gameContainer',
  backgroundColor: '#2d2d44',
  scene: [NivelScene]
};

// Arranque del juego.
const game = new Phaser.Game(config);
