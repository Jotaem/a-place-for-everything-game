// Escena de nivel: lee el escenario desde src/config/niveles.json (tarea 2.3).
// Arte de relleno con rectángulos de colores (sin assets finales, hasta la Fase 3).
// TODO: confirmar fondo claro u oscuro para niños (ver Docs/PALETA_TIPOGRAFIA.md). Se mantiene el fondo oscuro de la Fase 0 para no decidirlo como definitivo todavía.
class NivelScene extends Phaser.Scene {
  constructor() {
    super({ key: 'NivelScene' });
  }

  // Carga los datos de niveles (funciona servido por http: Live Server o python http.server).
  preload() {
    this.load.json('levelsData', 'src/config/niveles.json');
  }

  // data.levelId elige el escenario; por defecto el primero por orden (tarea 2.3).
  create(data) {
    const levelsData = this.cache.json.get('levelsData');
    const requestedId = (data && data.levelId) || null;
    const level = findLevelById(levelsData, requestedId);
    if (!level) {
      // Sin datos no se puede jugar: mensaje claro en vez de romper.
      // Nota: abrir index.html con doble clic (file://) bloquea la carga del JSON;
      // usar Live Server o python -m http.server (ver README).
      this.add.text(480, 270, 'No se pudo cargar el nivel. Abre el juego con Live Server.', {
        fontSize: '28px',
        color: '#ffffff',
        align: 'center',
        wordWrap: { width: 860 }
      }).setOrigin(0.5);
      return;
    }
    this.level = level;

    // Nombre del escenario arriba, con la instrucción breve debajo.
    this.add.text(480, 30, level.name, {
      fontSize: '36px',
      color: '#ffffff'
    }).setOrigin(0.5);
    this.add.text(480, 68, 'Arrastra cada cosa a su lugar', {
      fontSize: '22px',
      color: '#ffffff'
    }).setOrigin(0.5);

    // Cola de objetos del nivel, uno a la vez y en orden mezclado (tarea 2.5).
    // TODO: confirmar "uno a la vez" frente a "varios a la vez" (ver Docs/BOCETOS_PANTALLAS.md).
    this.itemQueue = shuffleArray(level.objects);
    this.currentIndex = 0;
    this.currentItem = null;
    this.spawnCurrentItem();

    // Zonas de destino del nivel, repartidas según cuántas haya (tarea 2.3).
    this.dropZones = [];
    const zoneCount = level.zones.length;
    const zoneWidth = zoneCount > 2 ? 200 : 220;
    const zoneHeight = zoneCount > 2 ? 110 : 120;
    const zoneY = 430;
    const zonePositions = spreadZonePositions(zoneCount, 960, zoneWidth);
    const zoneFontSize = zoneCount > 2 ? '20px' : '24px';
    level.zones.forEach((zone, index) => {
      const zoneX = zonePositions[index];
      // Rectángulo de la zona con el color secundario de la paleta.
      const zoneBox = this.add.rectangle(zoneX, zoneY, zoneWidth, zoneHeight, 0x4ecdc4);
      zoneBox.setStrokeStyle(4, 0xffffff);
      // Etiqueta de la zona (texto de UI en español).
      const zoneLabel = this.add.text(zoneX, zoneY, zone.label, {
        fontSize: zoneFontSize,
        color: '#2d2d44',
        align: 'center',
        wordWrap: { width: zoneWidth - 16 }
      }).setOrigin(0.5);
      // Se guarda la referencia con su geometría para la detección de aciertos.
      this.dropZones.push({ key: zone.key, x: zoneX, y: zoneY, width: zoneWidth, height: zoneHeight, box: zoneBox, label: zoneLabel });
    });

    // Texto de estado: muestra el resultado de cada intento.
    this.statusText = this.add.text(480, 104, '', {
      fontSize: '28px',
      color: '#ffd93d'
    }).setOrigin(0.5);

    // Contador de aciertos del nivel (tarea 1.4).
    this.score = 0;
    this.scoreText = this.add.text(830, 40, 'Estrellas: 0', {
      fontSize: '28px',
      color: '#ffd93d'
    }).setOrigin(0.5);

    // Botón para volver al menú (tarea 2.4).
    const backButton = this.add.text(90, 40, 'Volver', {
      fontSize: '28px',
      color: '#ffffff'
    }).setOrigin(0.5);
    backButton.setInteractive({ useHandCursor: true });
    backButton.on('pointerdown', () => {
      this.scene.start('MenuScene');
    });

    // Seguir el puntero mientras se arrastra (mouse o táctil).
    this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    // Al soltar, decidir si cayó en la zona correcta o no (tarea 1.3).
    this.input.on('dragend', (pointer, gameObject) => {
      this.resolveDrop(gameObject);
    });
  }

  // Crea el objeto actual de la cola en su posición inicial.
  spawnCurrentItem() {
    const startX = 480;
    const startY = 300;
    const itemWidth = 140;
    const itemHeight = 100;
    const itemData = this.itemQueue[this.currentIndex];

    // Rectángulo del objeto con su color de relleno (el JSON trae texto "#RRGGBB").
    const fillColor = parseHexColor(itemData.color);
    const itemBox = this.add.rectangle(0, 0, itemWidth, itemHeight, fillColor);
    itemBox.setStrokeStyle(4, 0xffffff);

    // Etiqueta del objeto (texto de UI en español).
    const itemLabel = this.add.text(0, 0, itemData.label, {
      fontSize: '24px',
      color: '#2d2d44'
    }).setOrigin(0.5);

    // Contenedor para mover caja y etiqueta juntas.
    const draggableItem = this.add.container(startX, startY, [itemBox, itemLabel]);
    // El contenedor necesita tamaño explícito para recibir eventos de entrada.
    draggableItem.setSize(itemWidth, itemHeight);
    draggableItem.setInteractive({ draggable: true });

    // Posición original, para devolver el objeto si el intento falla (tarea 1.5).
    draggableItem.setData('homeX', startX);
    draggableItem.setData('homeY', startY);
    // Zona correcta de este objeto según el nivel.
    draggableItem.setData('correctZone', itemData.correctZone);
    // El objeto siempre se dibuja por encima de las zonas de destino.
    draggableItem.setDepth(1);
    this.currentItem = draggableItem;
  }

  // Busca la zona que contiene el punto donde se soltó el objeto.
  getZoneAt(x, y) {
    const found = (this.dropZones || []).find((zone) => {
      const halfWidth = zone.width / 2;
      const halfHeight = zone.height / 2;
      return x >= zone.x - halfWidth && x <= zone.x + halfWidth
        && y >= zone.y - halfHeight && y <= zone.y + halfHeight;
    });
    return found || null;
  }

  // Decide si el objeto cayó en su zona correcta y aplica el feedback (tareas 1.4 y 1.5).
  resolveDrop(gameObject) {
    // Objeto distractor: no pertenece a ninguna zona (tarea 2.5).
    if (!gameObject.getData('correctZone')) {
      return this.resolveDistractor(gameObject);
    }
    const zone = this.getZoneAt(gameObject.x, gameObject.y);
    const correctKey = gameObject.getData('correctZone');
    if (zone && zone.key === correctKey) {
      this.statusText.setText('¡Muy bien! Era ahí.');
      // Suma un punto y lo muestra (tarea 1.4).
      this.score += 1;
      this.scoreText.setText('Estrellas: ' + this.score);
      // El objeto ya no se puede mover: quedó guardado en su lugar.
      gameObject.disableInteractive();
      // Encaja en el centro de la zona con un pulso de escala satisfactorio.
      this.tweens.add({
        targets: gameObject,
        x: zone.x,
        y: zone.y,
        duration: 200,
        ease: 'Power2',
        onComplete: () => {
          this.tweens.add({
            targets: gameObject,
            scaleX: 1.15,
            scaleY: 1.15,
            duration: 120,
            yoyo: true
          });
        }
      });
      // Sonido breve agradable (placeholder hasta la Fase 3.3, ver src/utils/audio.js).
      playSuccessTone(this);
      // Avanza al siguiente objeto o cierra el nivel.
      this.advanceQueue();
      return true;
    }
    // Error suave: mensaje amable y el objeto vuelve a su lugar sin penalización.
    // Sin sonido negativo (se elige silencio, permitido por el roadmap); el jugador reintenta.
    this.statusText.setText('Todavía no. Prueba en otro lugar.');
    const homeX = gameObject.getData('homeX');
    const homeY = gameObject.getData('homeY');
    gameObject.disableInteractive();
    this.tweens.add({
      targets: gameObject,
      x: homeX,
      y: homeY,
      duration: 300,
      ease: 'Power2',
      onComplete: () => {
        gameObject.setInteractive({ draggable: true });
      }
    });
    return false;
  }

  // Avanza la cola: siguiente objeto o cierre del nivel.
  advanceQueue() {
    this.currentIndex += 1;
    if (this.currentIndex < this.itemQueue.length) {
      this.time.delayedCall(600, () => {
        this.spawnCurrentItem();
      });
    } else {
      this.time.delayedCall(600, () => {
        this.showLevelComplete();
      });
    }
  }

  // El distractor nunca encaja: tras 2 intentos el juego ayuda y sigue, sin castigo.
  resolveDistractor(gameObject) {
    const misses = (gameObject.getData('misses') || 0) + 1;
    gameObject.setData('misses', misses);
    if (misses >= 2) {
      this.statusText.setText('Eso no es de aquí. ¡Sigamos con lo demás!');
      gameObject.disableInteractive();
      this.tweens.add({
        targets: gameObject,
        alpha: 0,
        duration: 300,
        onComplete: () => {
          gameObject.destroy();
        }
      });
      this.advanceQueue();
      return false;
    }
    this.statusText.setText('Mmm... ¿eso es de aquí? Prueba de nuevo.');
    const homeX = gameObject.getData('homeX');
    const homeY = gameObject.getData('homeY');
    gameObject.disableInteractive();
    this.tweens.add({
      targets: gameObject,
      x: homeX,
      y: homeY,
      duration: 300,
      ease: 'Power2',
      onComplete: () => {
        gameObject.setInteractive({ draggable: true });
      }
    });
    return false;
  }

  // Mensaje de cierre al colocar todos los objetos del nivel.
  // TODO: mover a ResumenScene en la Fase 4 (tarea 4.2) con estrellas y frases de refuerzo.
  showLevelComplete() {
    this.statusText.setText('¡Todo en su lugar!');
    // Guarda el mejor puntaje del nivel en el navegador (tarea 2.6).
    saveBestLevelScore(this.level.id, this.score);
  }

}
