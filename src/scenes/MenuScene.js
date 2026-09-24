// Pantalla inicial: título y un botón grande por nivel (tarea 2.4).
// Los niveles se leen de src/config/niveles.json, igual que NivelScene.
// El mejor puntaje por nivel se lee del navegador (tarea 2.6).
class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  // Carga los datos de niveles (funciona servido por http: Live Server o python http.server).
  preload() {
    this.load.json('levelsData', 'src/config/niveles.json');
  }

  create() {
    const levelsData = this.cache.json.get('levelsData');
    const levels = ((levelsData && levelsData.levels) || []).slice().sort((a, b) => a.order - b.order);

    // Título del juego y subtítulo con la instrucción.
    this.add.text(480, 70, 'Un Lugar Para Cada Cosa', {
      fontSize: '44px',
      color: '#ffffff'
    }).setOrigin(0.5);
    this.add.text(480, 125, 'Arrastra cada cosa a su lugar', {
      fontSize: '24px',
      color: '#ffffff'
    }).setOrigin(0.5);

    if (levels.length === 0) {
      // Sin datos no hay botones: mensaje claro en vez de una pantalla vacía.
      this.add.text(480, 300, 'No hay niveles. Abre el juego con Live Server.', {
        fontSize: '28px',
        color: '#ffffff',
        align: 'center',
        wordWrap: { width: 860 }
      }).setOrigin(0.5);
      return;
    }

    // Un botón grande por nivel, en orden de dificultad.
    const buttonWidth = 360;
    const buttonHeight = 64;
    const firstY = 210;
    const stepY = 80;
    levels.forEach((level, index) => {
      const buttonY = firstY + stepY * index;
      // Rectángulo del botón con el color primario de la paleta.
      const buttonBox = this.add.rectangle(0, 0, buttonWidth, buttonHeight, 0xff6b6b);
      buttonBox.setStrokeStyle(4, 0xffffff);
      // Nombre del escenario más su mejor puntaje (texto de UI en español).
      // La estrella es un símbolo simple de la interfaz, permitido por AGENTS.md.
      const best = getBestLevelScore(level.id);
      const buttonText = best > 0 ? level.name + '  ★ ' + best : level.name;
      const buttonLabel = this.add.text(0, 0, buttonText, {
        fontSize: '28px',
        color: '#ffffff'
      }).setOrigin(0.5);
      // Contenedor para mover caja y etiqueta juntas.
      const button = this.add.container(480, buttonY, [buttonBox, buttonLabel]);
      button.setSize(buttonWidth, buttonHeight);
      button.setInteractive({ useHandCursor: true });
      // Al pulsar, se abre ese nivel.
      button.on('pointerdown', () => {
        this.scene.start('NivelScene', { levelId: level.id });
      });
    });
  }
}
