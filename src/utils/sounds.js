import useSoundStore from "#store/sound.js";

let _ac = null;
const ctx = () => {
    if (!_ac || _ac.state === "closed")
        _ac = new (window.AudioContext || window.webkitAudioContext)();
    if (_ac.state === "suspended") _ac.resume();
    return _ac;
};

const muted = () => useSoundStore.getState().isMuted;

// Startup : accord harmonique doux (type macOS boot)
export const playStartup = () => {
    if (muted()) return;
    const ac = ctx();
    const notes = [523.25, 659.25, 783.99]; // do, mi, sol
    notes.forEach((freq, i) => {
        const osc = ac.createOscillator();
        const gain = ac.createGain();
        osc.type = "sine";
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0, ac.currentTime + i * 0.05);
        gain.gain.linearRampToValueAtTime(0.18, ac.currentTime + i * 0.05 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 1.2);
        osc.connect(gain);
        gain.connect(ac.destination);
        osc.start(ac.currentTime + i * 0.05);
        osc.stop(ac.currentTime + 1.2);
    });
};

// Window open : pop ascendant court
export const playWindowOpen = () => {
    if (muted()) return;
    const ac = ctx();
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(600, ac.currentTime);
    osc.frequency.exponentialRampToValueAtTime(900, ac.currentTime + 0.12);
    gain.gain.setValueAtTime(0.15, ac.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.18);
    osc.connect(gain);
    gain.connect(ac.destination);
    osc.start(ac.currentTime);
    osc.stop(ac.currentTime + 0.18);
};

// Window close : pop descendant court
export const playWindowClose = () => {
    if (muted()) return;
    const ac = ctx();
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(700, ac.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, ac.currentTime + 0.12);
    gain.gain.setValueAtTime(0.12, ac.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.18);
    osc.connect(gain);
    gain.connect(ac.destination);
    osc.start(ac.currentTime);
    osc.stop(ac.currentTime + 0.18);
};

// Minimize : swoosh rapide vers le bas
export const playMinimize = () => {
    if (muted()) return;
    const ac = ctx();
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(800, ac.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, ac.currentTime + 0.3);
    gain.gain.setValueAtTime(0.1, ac.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.3);
    osc.connect(gain);
    gain.connect(ac.destination);
    osc.start(ac.currentTime);
    osc.stop(ac.currentTime + 0.3);
};
