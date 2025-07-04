// Centralized state management for GuessTheNote

const state = {
    isRunning: false,
    userIsGuessing: false,
    correctNotes: [],
    selectedNotes: [],
};

const selectedNotesElement = document.getElementById('selected-notes');

function updateSelectedNotesUI() {
    selectedNotesElement.textContent = state.selectedNotes.join(', ');
    document.querySelectorAll('#piano .key').forEach(key => {
        console.log(key.dataset.note, state.selectedNotes.includes(key.dataset.note));
        key.classList.toggle('selected', state.selectedNotes.includes(key.dataset.note));
    });
}

export function getState() {
    // Return a shallow copy to prevent direct mutation
    return { ...state };
}

export function setState(partial) {
    Object.assign(state, partial);
}

export function resetState() {
    state.isRunning = false;
    state.userIsGuessing = false;
    state.correctNotes = [];
    state.selectedNotes = [];
    updateSelectedNotesUI();
}

export function addSelectedNote(note) {
    if (!state.selectedNotes.includes(note)) {
        if (state.selectedNotes.length >= state.correctNotes.length) {
            state.selectedNotes.shift(); // Remove the first note
        }
        state.selectedNotes.push(note);
        updateSelectedNotesUI();
    }
}

export function removeSelectedNote(note) {
    state.selectedNotes = state.selectedNotes.filter(n => n !== note);
    updateSelectedNotesUI();
}

export function toggleSelectedNote(note) {
    if (state.selectedNotes.includes(note)) {
        state.selectedNotes = state.selectedNotes.filter(n => n !== note);
    } else {
        if (state.selectedNotes.length >= state.correctNotes.length) {
            state.selectedNotes.shift(); // Remove the first note
        }
        state.selectedNotes.push(note);
    }
    updateSelectedNotesUI();

    return state.selectedNotes.includes(note);
}

export function setCorrectNotes(notes) {
    state.correctNotes = Array.isArray(notes) ? notes : [];
    // Ensure selectedNotes does not exceed correctNotes length
    if (state.selectedNotes.length > state.correctNotes.length) {
        state.selectedNotes = state.selectedNotes.slice(0, state.correctNotes.length);
        updateSelectedNotesUI();
    }
}

export function clearSelectedNotes() {
    state.selectedNotes = [];
    updateSelectedNotesUI();
}
