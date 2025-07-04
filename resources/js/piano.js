// Handles piano creation and note playing

import {
    getState,
    toggleSelectedNote,
} from './state.js';

export const whiteNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
export const blackNotesMap = {
    'C': 'Db',
    'D': 'Eb',
    'F': 'Gb',
    'G': 'Ab',
    'A': 'Bb'
};

export const selectedNotesElement = document.getElementById('selected-notes');
const piano = document.getElementById('piano');

export function playSound(note) {
    const audio = new Audio(`resources/audio/${note}.mp3`);
    audio.play();
}

export function playNote(note, keyElement) {
    const { userIsGuessing, isRunning } = getState();
    if (userIsGuessing && isRunning) {
        toggleSelectedNote(note);
    }

    keyElement.classList.toggle('down', true);
    playSound(note);

    setTimeout(() => {
        keyElement.classList.toggle('down', false);
    }, 700);
}

export function createPiano(startOctave = 3, endOctave = 5) {
    piano.innerHTML = '';
    const numberOfOctaves = endOctave - startOctave + 1;
    for (let octave = startOctave; octave < startOctave + numberOfOctaves; octave++) {
        whiteNotes.forEach(note => {
            const fullNote = `${note}${octave}`;
            const whiteKey = document.createElement('div');
            whiteKey.className = 'key white';
            whiteKey.dataset.note = fullNote;
            whiteKey.addEventListener('click', () => playNote(fullNote, whiteKey));
            whiteKey.title = fullNote;
            piano.appendChild(whiteKey);

            if (blackNotesMap[note]) {
                const blackNote = `${blackNotesMap[note]}${octave}`;
                const blackKey = document.createElement('div');
                blackKey.className = 'key black';
                blackKey.dataset.note = blackNote;
                blackKey.addEventListener('click', (e) => {
                    e.stopPropagation();
                    playNote(blackNote, blackKey);
                });
                blackKey.title = blackNote;
                whiteKey.appendChild(blackKey);
            }
        });
    }
}