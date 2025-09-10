import React, { useEffect, useState } from "react";

import { wordList } from "./assets/wordlist.js";

const maxAttempts = 5;

const App = () => {
  const [targetWord, setTargetWord] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");
  const [streak, setStreak] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    startNewGame();
    const savedHighScore = parseInt(localStorage.getItem("wordleHighScore")) || 0;
    setHighScore(savedHighScore);
  }, []);

  const startNewGame = () => {
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    setTargetWord(randomWord);
    setGuesses([]);
    setCurrentGuess("");
    setGameOver(false);
    setMessage("");
    // setSuggestions([]);
  };

  const handleInput = (e) => {
    if (gameOver) return;
    const value = e.target.value.toLowerCase();
    if (value.length <= 5 && /^[a-z]*$/.test(value)) {
      setCurrentGuess(value);
      const filtered = wordList.filter((name) =>
        name.toLowerCase().startsWith(value)
      );
      // setSuggestions(filtered.slice(0, 5));
    } else {
      // setSuggestions([]);
    }
  };

  const handleSuggestionClick = (name) => {
    setCurrentGuess(name.toLowerCase());
    setSuggestions([]);
  };

  const checkGuess = () => {
    if (currentGuess.length !== 5) {
      setMessage("⛔ Guess must be 5 letters");
      return;
    }

    const guess = currentGuess.toLowerCase();
    const isValid = wordList.some(name => name.toLowerCase() === guess);
    if (!isValid) {
      setMessage("⛔ word not in the list");
      return;
    }

    const target = targetWord.toLowerCase();

    const result = Array(5).fill("gray");
    const targetLetters = target.split("");
    const guessLetters = guess.split("");

    for (let i = 0; i < 5; i++) {
      if (guessLetters[i] === targetLetters[i]) {
        result[i] = "green";
        targetLetters[i] = null;
        guessLetters[i] = null;
      }
    }

    for (let i = 0; i < 5; i++) {
      if (guessLetters[i]) {
        const idx = targetLetters.indexOf(guessLetters[i]);
        if (idx !== -1) {
          result[i] = "yellow";
          targetLetters[idx] = null;
        }
      }
    }

    const newGuess = { word: currentGuess, feedback: result };
    const updatedGuesses = [...guesses, newGuess];

    if (guess === target) {
      setMessage("🎉 Correct!");
      setGameOver(true);
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > highScore) {
        localStorage.setItem("wordleHighScore", newStreak.toString());
        setHighScore(newStreak);
      }
    } else if (updatedGuesses.length >= maxAttempts) {
      setMessage(`❌ Game Over! The word was "${targetWord.toUpperCase()}"`);
      setGameOver(true);
      setStreak(0);
    } else {
      setMessage("");
    }

    setGuesses(updatedGuesses);
    setCurrentGuess("");
    // setSuggestions([]);
  };

  const getColor = (color) => {
    switch (color) {
      case "green":
        return "bg-green-600";
      case "yellow":
        return "bg-yellow-400";
      case "gray":
        return "bg-gray-600";
      default:
        return "";
    }
  };

  return (
    <div className="bg-[#333] p-4">
      <div className="max-w-md mx-auto p-4 text-white bg-black min-h-screen rounded-2xl">
        <h1 className="text-2xl font-bold mb-2 flex justify-center">5xWordle</h1>
        
        <p className="text-sm mb-4 text-gray-300">Guess the 5-letter word</p>

        <div className="grid grid-rows-6 gap-2 mb-4 pl-15 pr-15">
          {Array.from({ length: maxAttempts }).map((_, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-5">
              {(guesses[rowIndex]?.word || "     ").split("").map((char, colIndex) => (
                <div
                  key={colIndex}
                  className={`w-12 h-12 flex items-center justify-center font-bold text-xl border ${getColor(
                    guesses[rowIndex]?.feedback?.[colIndex]
                  )}`}
                >
                  {char.toUpperCase()}
                </div>
              ))}
            </div>
          ))}
        </div>

        {!gameOver && (
          <div className="flex flex-col gap-2 mb-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={currentGuess}
                onChange={handleInput}
                onKeyDown={(e) => e.key === "Enter" && checkGuess()}
                maxLength={5}
                className="p-2 border rounded text-white font-bold border-white w-full"
                placeholder="Type a 5-letter word"
              />
              <button
                onClick={checkGuess}
                className="bg-blue-600 px-4 rounded text-white font-semibold hover:bg-blue-700"
              >
                Enter
              </button>
            </div>

            {suggestions.length > 0 && (
              <ul className="bg-[#333] text-white font-bold rounded shadow max-h-40 overflow-y-auto">
                {suggestions.map((name, idx) => (
                  <li
                    key={idx}
                    className="p-2 hover:bg-[#222] cursor-pointer"
                    onClick={() => handleSuggestionClick(name)}
                  >
                    {name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {message && <div className="text-lg mb-4 text-yellow-300">{message}</div>}

        <div className="mb-4 text-sm text-gray-400">
          <p>🔥 Streak: {streak}</p>
          <p>🏆 High Score: {highScore}</p>
        </div>

        {gameOver && (
          <button
            onClick={startNewGame}
            className="bg-green-600 px-4 py-2 rounded text-white font-semibold hover:bg-green-700"
          >
            Play Again
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
