// Escena de prueba de la Fase 0: solo muestra un color de fondo.
// TODO: reemplazar por MenuScene / NivelScene / ResumenScene en Fase 1.
function createEmptyScene() {
  return {
    // Clave de la escena en inglés, texto visible en español.
    key: 'BootScene',
    create: function () {
      // Texto de verificación: si se ve, Phaser está corriendo.
      this.add.text(480, 270, 'Hola mundo Phaser', {
        fontSize: '48px',
        color: '#ffffff'
      }).setOrigin(0.5);
    }
  };
}

// Configuración principal del juego (960x540 según ROADMAP Fase 0).
const config = {
  type: Phaser.AUTO,
  width: 960,
  height: 540,
  parent: 'gameContainer',
  backgroundColor: '#2d2d44',
  scene: [createEmptyScene()]
};

// Arranque del juego.
const game = new Phaser.Game(config);
