/**
 * MATH ADVENTURE - DUNIA NUMERIA
 * Audio Controller (Web Audio API Synthesizer + Fallback)
 * 
 * Menghasilkan efek suara interaktif tanpa ketergantungan file eksternal:
 * - 100% bekerja offline dan tanpa masalah CORS pada protokol file://
 * - Nada ramah anak: chime benar, nada lembut saat salah, fanfare kelulusan
 * - Musik petualangan ambient lembut dengan generator sintesis melodi
 */

class SoundController {
  constructor() {
    this.audioCtx = null;
    this.soundEnabled = true;
    this.musicPlaying = false;
    this.musicTimer = null;
    this.musicGain = null;
    this.masterGain = null;
    this.initAudioContext();
  }

  initAudioContext() {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
        this.masterGain = this.audioCtx.createGain();
        this.masterGain.gain.setValueAtTime(0.3, this.audioCtx.currentTime);
        this.masterGain.connect(this.audioCtx.destination);
      }
    } catch (e) {
      console.warn("Web Audio API tidak didukung pada browser ini.", e);
    }
  }

  ensureContext() {
    if (!this.audioCtx) {
      this.initAudioContext();
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    if (!this.soundEnabled) {
      this.stopAmbientMusic();
    }
    return this.soundEnabled;
  }

  setSoundEnabled(enabled) {
    this.soundEnabled = !!enabled;
    if (!this.soundEnabled) {
      this.stopAmbientMusic();
    }
  }

  // --- Suara Tombol / Klik ---
  playClick() {
    if (!this.soundEnabled) return;
    this.ensureContext();
    if (!this.audioCtx) return;

    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      const now = this.audioCtx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.09);
    } catch (e) {}
  }

  // --- Suara Jawaban Benar (Melodi Ceria) ---
  playCorrect() {
    if (!this.soundEnabled) return;
    this.ensureContext();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      // Arpeggio C Mayor gembira: C5 (523Hz), E5 (659Hz), G5 (784Hz), C6 (1046Hz)
      const notes = [
        { freq: 523.25, time: 0.0, dur: 0.12 },
        { freq: 659.25, time: 0.1, dur: 0.12 },
        { freq: 783.99, time: 0.2, dur: 0.16 },
        { freq: 1046.50, time: 0.32, dur: 0.35 }
      ];

      notes.forEach(note => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        const startTime = now + note.time;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(note.freq, startTime);

        gain.gain.setValueAtTime(0.25, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + note.dur);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(startTime);
        osc.stop(startTime + note.dur);
      });
    } catch (e) {}
  }

  // --- Suara Jawaban Kurang Tepat (Lembut, Membimbing) ---
  playWrong() {
    if (!this.soundEnabled) return;
    this.ensureContext();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      // Nada lembut berpenurunan: F4 (349Hz) turun ke D4 (293Hz)
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(349.23, now);
      osc.frequency.exponentialRampToValueAtTime(293.66, now + 0.25);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.26);
    } catch (e) {}
  }

  // --- Fanfare Kelulusan Level (Victory) ---
  playLevelPassed() {
    if (!this.soundEnabled) return;
    this.ensureContext();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      // Fanfare gembira: G4, C5, E5, G5 sustained
      const notes = [
        { freq: 392.00, time: 0.0, dur: 0.15 },
        { freq: 523.25, time: 0.15, dur: 0.15 },
        { freq: 659.25, time: 0.3, dur: 0.18 },
        { freq: 783.99, time: 0.48, dur: 0.6 }
      ];

      notes.forEach(note => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        const startTime = now + note.time;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(note.freq, startTime);

        gain.gain.setValueAtTime(0.3, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + note.dur);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(startTime);
        osc.stop(startTime + note.dur);
      });
    } catch (e) {}
  }

  // --- Efek Pembukaan Gerbang Akhir (Mistik & Megah) ---
  playGateOpen() {
    if (!this.soundEnabled) return;
    this.ensureContext();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      const chords = [523.25, 659.25, 783.99, 1046.50, 1318.51];
      chords.forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        const startTime = now + idx * 0.1;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.18, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 1.2);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(startTime);
        osc.stop(startTime + 1.25);
      });
    } catch (e) {}
  }

  // --- Musik Petualangan Ambient Lembut (Opsional, Tenang) ---
  startAmbientMusic() {
    if (!this.soundEnabled || this.musicPlaying) return;
    this.ensureContext();
    if (!this.audioCtx) return;

    this.musicPlaying = true;
    const pentatonic = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25]; // C, D, E, G, A, C
    let step = 0;

    const playAmbientNote = () => {
      if (!this.musicPlaying || !this.soundEnabled) return;
      try {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        const now = this.audioCtx.currentTime;

        const freq = pentatonic[step % pentatonic.length];
        step = (step + Math.floor(Math.random() * 3) + 1) % pentatonic.length;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + 1.25);
      } catch (e) {}

      this.musicTimer = setTimeout(playAmbientNote, 900);
    };

    playAmbientNote();
  }

  stopAmbientMusic() {
    this.musicPlaying = false;
    if (this.musicTimer) {
      clearTimeout(this.musicTimer);
      this.musicTimer = null;
    }
  }

  toggleMusic() {
    if (this.musicPlaying) {
      this.stopAmbientMusic();
      return false;
    } else {
      this.startAmbientMusic();
      return true;
    }
  }
}

// Instance global
const soundCtrl = new SoundController();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = SoundController;
}
