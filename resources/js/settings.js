// Handles settings UI and persistence

import { createPiano } from './piano.js';

// Settings card toggle
const settingsBtn = document.getElementById('settings-btn');
settingsBtn.addEventListener('click', () => {
    const settings = document.getElementById('settings');
    settings.classList.toggle('hidden');
});

// Octave range sliders
const minSlider = document.getElementById('octave-min');
const maxSlider = document.getElementById('octave-max');
const rangeLabel = document.getElementById('octave-range-label');

function updateRange() {
    let min = parseInt(minSlider.value);
    let max = parseInt(maxSlider.value);
    if (min > max) {
        [min, max] = [max, min];
        minSlider.value = min;
        maxSlider.value = max;
    }
    rangeLabel.textContent = `${min} - ${max}`;
    createPiano(min, max);
    localStorage.setItem('octaveRange', JSON.stringify({ min, max }));
}

minSlider.addEventListener('input', updateRange);
maxSlider.addEventListener('input', updateRange);
updateRange();
