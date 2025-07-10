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
    handleKeyup
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
        turn,
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
      <Grid guesses={guesses} currentGuess={currentGuess} turn={turn} />
      <Keypad usedKeys={usedKeys} />

      {showModal && (
        <Modal
          isCorrect={isCorrect}
          turn={turn}
          solution={solution}
          handleRestart={handleRestartGame}
          onShowLeaderboard={onShowLeaderboard}
        />
      )}
    </div>
  )
}