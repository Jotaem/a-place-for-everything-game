// Efectos de sonido con WebAudio, sin assets ni internet.
// TODO: reemplazar por los efectos definitivos de la Fase 3.3 (con opción de silencio).

// Tono breve agradable de acierto: dos notas ascendentes.
// Recibe la escena para guardar el contexto de audio entre llamadas.
function playSuccessTone(scene) {
  try {
    const AudioClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioClass) {
      return;
    }
    if (!scene.successAudio) {
      scene.successAudio = new AudioClass();
    }
    const audio = scene.successAudio;
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
