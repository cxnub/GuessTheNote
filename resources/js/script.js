// Handles global UI and app initialization

import { createPiano } from './piano.js';
import { startGame, playCorrectNotes } from './game.js';
import './settings.js';

const themeBtn = document.getElementById('theme-btn');
themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light');
    const isLight = document.body.classList.contains('light');
    themeBtn.innerHTML = `<i class="fa-solid fa-${isLight ? 'moon' : 'sun'}"></i>`;
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// Initialize piano and game
const octaveRange = JSON.parse(localStorage.getItem('octaveRange') || '{"min":3,"max":5}');
createPiano(octaveRange.min, octaveRange.max);

document.getElementById('start-btn').addEventListener('click', startGame);
document.getElementById('play-notes').addEventListener('click', playCorrectNotes);
