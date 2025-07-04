// Handles game logic

import { whiteNotes, blackNotesMap, playNote, selectedNotesElement, playSound } from './piano.js';
import {
    getState,
    setState,
    resetState,
} from './state.js';

const startBtn = document.getElementById('start-btn');
const checkBtn = document.getElementById('check-btn');
const playTogetherCheckbox = document.getElementById('play-together');
const gameStateElement = document.getElementById('game-state');
const resultElement = document.getElementById('result');

function resetPianoKeys() {
    document.querySelectorAll('#piano .key').forEach(key => {
        key.classList.remove('correct', 'incorrect', 'missed', 'down');
    });
}

function resetGame() {
    resetPianoKeys();
    gameStateElement.classList.add('hidden');
    resetState();
    startBtn.disabled = false;
    checkBtn.innerHTML = '<i class="fa-solid fa-check" style="margin-right: 8px;"></i>Check';
    checkBtn.onclick = check;
    selectedNotesElement.textContent = '';
    resultElement.classList.add('hidden');
    resultElement.querySelector('#correct-notes').textContent = '';
    resultElement.querySelector('#incorrect-notes').textContent = '';
    resultElement.querySelector('#missed-notes').textContent = '';
    resultElement.querySelector('#correct-count').textContent = '';
    resultElement.querySelector('#incorrect-count').textContent = '';
    resultElement.querySelector('#missed-count').textContent = '';
}

function startGame() {
    const { isRunning } = getState();
    if (isRunning) return;
    resetGame();
    setState({ isRunning: true, userIsGuessing: true });
    startBtn.disabled = true;
    gameStateElement.classList.remove('hidden');

    const minOctave = parseInt(document.getElementById('octave-min').value);
    const maxOctave = parseInt(document.getElementById('octave-max').value);
    const numberOfNotes = parseInt(document.getElementById('difficulty').value);

    // Generate all possible notes within the octave range
    let possibleNotes = [];
    for (let octave = minOctave; octave <= maxOctave; octave++) {
        whiteNotes.forEach(n => {
            possibleNotes.push(`${n}${octave}`);
            if (blackNotesMap[n]) {
                possibleNotes.push(`${blackNotesMap[n]}${octave}`);
            }
        });
    }

    // Shuffle and select unique notes
    for (let i = possibleNotes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [possibleNotes[i], possibleNotes[j]] = [possibleNotes[j], possibleNotes[i]];
    }
    const correctNotes = possibleNotes.slice(0, numberOfNotes);
    setState({ correctNotes });

    playCorrectNotes();
}

export function playCorrectNotes() {
    const { correctNotes, userIsGuessing } = getState();

    const playSingleNote = (note) => {
        if (userIsGuessing) {
            playSound(note);
            return;
        }

        const keyElement = document.querySelector(`#piano .key[data-note="${note}"]`);
        playNote(note, keyElement);
    };

    if (playTogetherCheckbox.checked) {
        correctNotes.forEach(playSingleNote);
    } else {
        correctNotes.forEach((note, idx) => {
            setTimeout(() => playSingleNote(note), idx * 1000);
        });
    }
}

function check() {
    const { isRunning, correctNotes, selectedNotes } = getState();
    if (!isRunning) return;
    setState({ isRunning: false, userIsGuessing: false });
    startBtn.disabled = false;

    const correctSet = new Set(correctNotes);
    const selectedSet = new Set(selectedNotes);

    resetPianoKeys();

    let results = {
        correct: [],
        incorrect: [],
        missed: []
    };

    document.querySelectorAll('#piano .key').forEach(key => {
        const note = key.dataset.note;
        key.classList.toggle('selected', false);
        if (correctSet.has(note)) {
            if (selectedSet.has(note)) {
                key.classList.add('correct');
                results.correct.push(note);
            } else {
                key.classList.add('missed');
                results.missed.push(note);
            }
        } else if (selectedSet.has(note)) {
            key.classList.add('incorrect');
            results.incorrect.push(note);
        }
    });

    resultElement.classList.remove('hidden');
    resultElement.querySelector('#correct-notes').textContent = results.correct.join(', ') || 'None';
    resultElement.querySelector('#incorrect-notes').textContent = results.incorrect.join(', ') || 'None';
    resultElement.querySelector('#missed-notes').textContent = results.missed.join(', ') || 'None';
    resultElement.querySelector('#correct-count').textContent = `(${results.correct.length})`;
    resultElement.querySelector('#incorrect-count').textContent = `(${results.incorrect.length})`;
    resultElement.querySelector('#missed-count').textContent = `(${results.missed.length})`;

    checkBtn.innerHTML = '<i class="fa-solid fa-refresh" style="margin-right: 8px;"></i>Play Again';
    checkBtn.onclick = () => {
        resetGame();
        startGame();
    };
}

export { startGame, resetGame };