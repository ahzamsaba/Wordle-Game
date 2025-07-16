import { useEffect, useRef, useState } from "react";
import useWordle from '../hooks/useWordle'

import Grid from './Grid'
import Keypad from './Keypad'
import Modal from './Modal'

export default function Wordle({ solution, player, handleRestart, onShowLeaderboard}) {
  const {
    currentGuess,
    guesses,
    turn,
    isCorrect,
    usedKeys,
    handleKeyup,
    useHint,
    hint,
    isHint
  } = useWordle(solution)

  const [showModal, setShowModal] = useState(false)
  const hasSavedResult = useRef(false)//prevent multiple saves

  useEffect(() => {
    window.addEventListener('keyup', handleKeyup)

    if((isCorrect || turn > 5) && !hasSavedResult.current){
      hasSavedResult.current = true

      setTimeout(() => {
        setShowModal(true)
      }, 1000);

      // save score to localstorage
      const result = {
        player,
        won: isCorrect,
        turn: isHint ? turn + 1 : turn,
        date: new Date().toLocaleString()
      }
      const prev = JSON.parse(localStorage.getItem('wordleScores')) || []
      localStorage.setItem('wordleScores', JSON.stringify([result, ...prev]))
    }

    return () => window.removeEventListener('keyup', handleKeyup)
  }, [handleKeyup, isCorrect, turn])

  const handleRestartGame = () => {
    setShowModal(false)
    handleRestart()
  }

  return (
    <div className="max-w-xl mx-auto">

      {/* Hint button */}
      <div className="mb-4 text-right relative group">
        <button
          onClick={useHint}
          className="text-blue-600 font-semibold hover:text-blue-800 transition"
          disabled={isHint}
        >
          💡 Hint
        </button>
        {/* tooltip */}
        <div className="absolute right-0 mt-2 bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-70 transition-opacity pointer-events-none">
          turn += 1
        </div>
      </div>

      {/* Hint display */}
      {hint && (
        <div className="text-orange-600 font-mono font-bold text-left mt-2">
          Hint: <span className="tracking-widest">{hint}</span>
        </div>
      )}

      <Grid guesses={guesses} currentGuess={currentGuess} turn={turn} />
      <Keypad usedKeys={usedKeys} />

      {showModal && (
        <Modal
          isCorrect={isCorrect}
          turn={turn}
          solution={solution}
          handleRestart={handleRestartGame}
          onShowLeaderboard={onShowLeaderboard}
          isHint={isHint}
        />
      )}
    </div>
  )
}