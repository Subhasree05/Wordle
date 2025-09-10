# 5xWordle

A Wordle-style word guessing game built with React, featuring:

- A random 5-letter word selected from a large English word list
- Up to 5 attempts to guess the word
- Color-coded feedback (green: correct letter in correct place, yellow: correct letter wrong place, gray: letter not in word)
- Streak and high-score tracking using local storage
- Responsive, minimal UI

## Features

- **Custom Word List**: Uses an external list of 300+ 5-letter English words (`wordlist.js`).
- **Keyboard Input**: Type guesses and press Enter or click Enter button.
- **Feedback Grid**: Displays guesses with color-coded hints.
- **Streak / High Score**: Tracks your best streak locally.
- **Simple UI**: TailwindCSS-powered, dark theme.

## Usage

- Guess any 5-letter English word from the word list.
- Feedback:
  - 🟩 Green: Letter correct and in the right position.
  - 🟨 Yellow: Letter correct but in the wrong position.
  - ⬛ Gray: Letter not in the word.
- Try to guess the word in 5 attempts or less.

## Screenshots

### Gameplay
<img width="200" height="226" alt="gameplay" src="https://github.com/user-attachments/assets/184703ec-7efc-42cf-88e0-1c9421841653" />


### Win Screen
<img width="200" height="252" alt="win" src="https://github.com/user-attachments/assets/a5d9a22a-c65b-42f4-8dfa-b15d09068795" />



## Getting Started

### Prerequisites

- Node.js (>= 14)
- npm or yarn

### Installation

```bash
git clone (https://github.com/Subhasree05/Wordle)
cd Wordle
npm install
```

### Running Locally

```bash
npm run dev
```

Open your browser at `http://localhost:5173` (or as shown in your terminal).

### Building for Production

```bash
npm run build
```

Then deploy the generated `dist` folder using your preferred static host.

## File Structure

```
src/
  App.jsx         # Main game component
  assets/
    wordlist.js   # List of 5-letter words
public/
  index.html
```

## License

This project is open-sourced under the MIT License.
