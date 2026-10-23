/* =========================================================
   Casefile CAPTCHA — synthesized sound effects + ambience
   Everything here is generated with the Web Audio API, so
   there are no audio files to fetch and nothing can fail to
   load during a live demo. Audio only starts after a user
   gesture (the "Start Investigation" button), per browser
   autoplay rules.
   ========================================================= */

(function (global) {
  "use strict";

  let ctx = null;
  let masterGain = null;
  let muted = false;

  let droneOsc1 = null;
  let droneOsc2 = null;
  let droneGain = null;
  let breatheIntervalId = null;
  let pingTimeoutId = null;

  function ensureCtx() {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    if (!ctx) {
      ctx = new AC();
      masterGain = ctx.createGain();
      masterGain.gain.value = muted ? 0 : 0.9;
      masterGain.connect(ctx.destination);
    }
    if (ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }
    return ctx;
  }

  function tone({ freq, duration, type = "sine", gain = 0.18, delay = 0, freqEnd }) {
    const c = ensureCtx();
    if (!c) return;
    const osc = c.createOscillator();
    const g = c.createGain();
    osc.type = type;
    const startAt = c.currentTime + delay;
    osc.frequency.setValueAtTime(freq, startAt);
    if (freqEnd) {
      osc.frequency.exponentialRampToValueAtTime(Math.max(freqEnd, 1), startAt + duration);
    }
    g.gain.setValueAtTime(0.0001, startAt);
    g.gain.linearRampToValueAtTime(gain, startAt + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);
    osc.connect(g);
    g.connect(masterGain);
    osc.start(startAt);
    osc.stop(startAt + duration + 0.05);
  }

  function playStart() {
    tone({ freq: 440, duration: 0.1, type: "sine", gain: 0.16 });
    tone({ freq: 554.37, duration: 0.16, type: "sine", gain: 0.12, delay: 0.08 });
  }

  function playFound() {
    tone({ freq: 660, duration: 0.12, type: "sine", gain: 0.22 });
    tone({ freq: 880, duration: 0.16, type: "sine", gain: 0.14, delay: 0.05 });
  }

  function playUnfound() {
    tone({ freq: 420, duration: 0.09, type: "sine", gain: 0.1 });
  }

  function playMiss() {
    tone({ freq: 180, duration: 0.2, type: "sawtooth", gain: 0.12, freqEnd: 100 });
  }

  function playSuccess() {
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) =>
      tone({ freq: f, duration: 0.24, type: "triangle", gain: 0.18, delay: i * 0.1 })
    );
  }

  function playFail() {
    tone({ freq: 220, duration: 0.55, type: "sawtooth", gain: 0.15, freqEnd: 80 });
  }

  function startMusic() {
    const c = ensureCtx();
    if (!c || droneGain) return;

    droneGain = c.createGain();
    droneGain.gain.value = 0.0001;
    droneGain.connect(masterGain);

    droneOsc1 = c.createOscillator();
    droneOsc1.type = "sine";
    droneOsc1.frequency.value = 110;
    droneOsc2 = c.createOscillator();
    droneOsc2.type = "sine";
    droneOsc2.frequency.value = 164.81;
    droneOsc1.connect(droneGain);
    droneOsc2.connect(droneGain);
    droneOsc1.start();
    droneOsc2.start();

    droneGain.gain.linearRampToValueAtTime(0.045, c.currentTime + 1.4);

    const breathe = () => {
      if (!droneGain) return;
      const now = ctx.currentTime;
      droneGain.gain.cancelScheduledValues(now);
      droneGain.gain.setValueAtTime(droneGain.gain.value, now);
      droneGain.gain.linearRampToValueAtTime(0.06, now + 2.4);
      droneGain.gain.linearRampToValueAtTime(0.035, now + 4.8);
    };
    breathe();
    breatheIntervalId = setInterval(breathe, 4800);

    const notes = [392, 440, 466.16, 523.25];
    const ping = () => {
      if (!droneGain) return;
      const f = notes[Math.floor(Math.random() * notes.length)];
      tone({ freq: f, duration: 0.9, type: "sine", gain: 0.045 });
      pingTimeoutId = setTimeout(ping, 3200 + Math.random() * 2600);
    };
    pingTimeoutId = setTimeout(ping, 2200);
  }

  function stopMusic() {
    if (breatheIntervalId) {
      clearInterval(breatheIntervalId);
      breatheIntervalId = null;
    }
    if (pingTimeoutId) {
      clearTimeout(pingTimeoutId);
      pingTimeoutId = null;
    }
    if (droneGain && ctx) {
      const now = ctx.currentTime;
      const osc1 = droneOsc1;
      const osc2 = droneOsc2;
      droneGain.gain.cancelScheduledValues(now);
      droneGain.gain.setValueAtTime(droneGain.gain.value, now);
      droneGain.gain.linearRampToValueAtTime(0.0001, now + 0.5);
      setTimeout(() => {
        try {
          osc1.stop();
          osc2.stop();
        } catch (e) {
          /* already stopped */
        }
      }, 600);
    }
    droneOsc1 = null;
    droneOsc2 = null;
    droneGain = null;
  }

  function setMuted(next) {
    muted = next;
    if (masterGain) masterGain.gain.value = muted ? 0 : 0.9;
  }

  function toggleMuted() {
    setMuted(!muted);
    return muted;
  }

  global.CasefileSFX = {
    ensureCtx,
    playStart,
    playFound,
    playUnfound,
    playMiss,
    playSuccess,
    playFail,
    startMusic,
    stopMusic,
    toggleMuted,
    isMuted: () => muted,
  };
})(window);
