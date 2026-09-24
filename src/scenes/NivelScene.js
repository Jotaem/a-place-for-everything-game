// Escena de prototipo de la Fase 1: mecanismo central de arrastrar y soltar.
// Arte de relleno con rectángulos de colores (sin assets finales).
// TODO: mover los datos de objetos y lugares a src/config/niveles.json en la Fase 2 (tarea 2.1). Por ahora son placeholders hardcodeados solo para validar la mecánica.
// TODO: confirmar fondo claro u oscuro para niños (ver Docs/PALETA_TIPOGRAFIA.md). Se mantiene el fondo oscuro de la Fase 0 para no decidirlo como definitivo todavía.
class NivelScene extends Phaser.Scene {
  constructor() {
    super({ key: 'NivelScene' });
  }

  create() {
    // Texto de instrucción breve para el jugador.
    this.add.text(480, 40, 'Arrastra cada cosa a su lugar', {
      fontSize: '32px',
      color: '#ffffff'
    }).setOrigin(0.5);

    // Mini-nivel de prueba (tarea 1.6): 3 objetos seguidos, uno a la vez.
    // Nombres tomados de Docs/CONTENIDO_PEDAGOGICO.md ("La pieza").
    // TODO: confirmar la asignación objeto -> lugar (provisional aquí) y moverla a niveles.json en la Fase 2 (tarea 2.1).
    // TODO: confirmar "uno a la vez" frente a "varios a la vez" (ver Docs/BOCETOS_PANTALLAS.md).
    this.itemQueue = [
      { label: 'Camiseta', correctZone: 'closet', color: 0xff6b6b },
      { label: 'Peluche', correctZone: 'toyBox', color: 0xffd93d },
      { label: 'Pijama', correctZone: 'closet', color: 0x6bcb77 }
    ];
    this.currentIndex = 0;
    this.currentItem = null;
    this.spawnCurrentItem();

    // Zonas de destino visibles (tarea 1.2): dos opciones del escenario "La pieza".
    // Nombres internos en inglés, etiquetas visibles en español.
    this.dropZones = [];
    const zoneWidth = 220;
    const zoneHeight = 120;
    const zoneData = [
      { key: 'closet', label: 'Clóset', x: 240, y: 430 },
      { key: 'toyBox', label: 'Caja de juguetes', x: 720, y: 430 }
    ];
    zoneData.forEach((zone) => {
      // Rectángulo de la zona con el color secundario de la paleta.
      const zoneBox = this.add.rectangle(zone.x, zone.y, zoneWidth, zoneHeight, 0x4ecdc4);
      zoneBox.setStrokeStyle(4, 0xffffff);
      // Etiqueta de la zona.
      const zoneLabel = this.add.text(zone.x, zone.y, zone.label, {
        fontSize: '24px',
        color: '#2d2d44'
      }).setOrigin(0.5);
      // Se guarda la referencia con su geometría para la detección de la tarea 1.3.
      this.dropZones.push({ key: zone.key, x: zone.x, y: zone.y, width: zoneWidth, height: zoneHeight, box: zoneBox, label: zoneLabel });
    });

    // Texto de estado: muestra el resultado de cada intento (las animaciones llegan en 1.4/1.5).
    this.statusText = this.add.text(480, 90, '', {
      fontSize: '28px',
      color: '#ffd93d'
    }).setOrigin(0.5);

    // Contador de aciertos del nivel (tarea 1.4).
    this.score = 0;
    this.scoreText = this.add.text(830, 40, 'Estrellas: 0', {
      fontSize: '28px',
      color: '#ffd93d'
    }).setOrigin(0.5);

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

    // Rectángulo del objeto con su color de relleno.
    const itemBox = this.add.rectangle(0, 0, itemWidth, itemHeight, itemData.color);
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
    // Zona correcta de este objeto (provisional hasta la Fase 2).
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
      // Sonido breve agradable (placeholder hasta la Fase 3.3).
      this.playSuccessTone();
      // Avanza al siguiente objeto o cierra el mini-nivel (tarea 1.6).
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

  // Mensaje de cierre del prototipo al colocar los 3 objetos.
  // TODO: mover a ResumenScene en la Fase 2/4 (tareas 2.4 y 4.2) con estrellas y frases de refuerzo.
  showLevelComplete() {
    this.statusText.setText('¡Todo en su lugar!');
  }

  // Tono de acierto provisional con WebAudio, sin assets ni internet.
  // TODO: reemplazar por el efecto de sonido definitivo de la Fase 3.3 (con opción de silencio).
  playSuccessTone() {
    try {
      const AudioClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioClass) {
        return;
      }
      if (!this.successAudio) {
        this.successAudio = new AudioClass();
      }
      const audio = this.successAudio;
      const now = audio.currentTime;
      [523.25, 783.99].forEach((frequency, index) => {
        const oscillator = audio.createOscillator();
        const gain = audio.createGain();
        oscillator.type = 'sine';
        oscillator.frequency.value = frequency;
        gain.gain.setValueAtTime(0.0001, now + index * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.2, now + index * 0.12 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.12 + 0.25);
        oscillator.connect(gain);
        gain.connect(audio.destination);
        oscillator.start(now + index * 0.12);
        oscillator.stop(now + index * 0.12 + 0.3);
      });
    } catch (error) {
      // Sin sonido si el navegador no permite audio: el juego sigue funcionando.
    }
  }
}
