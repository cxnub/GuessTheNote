# GuessTheNote

A web-based game to help you practice and improve your musical ear by guessing piano notes!

## Features

- Interactive virtual piano with clickable keys
- Random note(s) playback based on selected difficulty and octave range
- Multiple difficulty levels (1-6 notes)
- "Play Together" mode to play the notes all at once for an extra challenge
- Responsive, modern UI with light/dark theme toggle
- Visual feedback for correct, incorrect, and missed notes
- Settings for octave range and difficulty
- Result summary with color-coded feedback and counts

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Edge, Safari)
- No installation required

### Running Locally

1. **Clone the repository:**
   ```sh
   git clone https://github.com/cxnub/GuessTheNote.git
   cd GuessTheNote
   ```

2. **Open `index.html` in your browser:**
   - Double-click `index.html`  
   **OR**
   - Serve the folder with a local web server (recommended for audio):
     ```sh
     # Using Python 3
     python -m http.server
     # Then visit http://localhost:8000 in your browser
     ```

### Folder Structure

```
GuessTheNote/
├── index.html
├── resources/
│   ├── audio/         # Piano note audio files (mp3)
│   ├── css/           # Stylesheets
│   └── js/            # JavaScript modules
├── images/            # Image assets
└── README.md
```

## Usage

1. Click **Start Guessing!** to begin a new round.
2. Listen to the note(s) played and click the corresponding piano key(s).
3. Click **Check** to see your results.
4. Adjust settings for octave range, difficulty, and play mode as desired.

## Credits

- Made with ❤️ by [cxnub](https://github.com/cxnub)
- [FontAwesome](https://fontawesome.com/) for icons
- Piano note samples from public domain sources

##