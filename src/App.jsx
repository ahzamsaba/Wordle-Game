import { useEffect, useState } from "react";
import Wordle from './components/Wordle'
import StartScreen from './components/StartScreen'
import Leaderboard from './components/Leaderboard'

export default function App() {
  const [solution, setSolution] = useState(null)
  const [player, setPlayer] = useState('')
  const [showLeaderboard, setShowLeaderboard] = useState(false)

  // fn to fetch new solution
  const fetchNewSolution = () => {
    fetch('http://localhost:3001/solutions')
      .then(res => res.json())
      .then(data => {
        const random = data[Math.floor(Math.random() * data.length)]
        setSolution(random.word)
        console.log(random.word);
      })
  }

  useEffect(() => {
    if(player)
      fetchNewSolution()
  }, [player])

  if(showLeaderboard)
    return <Leaderboard onBack={() => {
      setShowLeaderboard(false)
      fetchNewSolution()
    }} />
  
  if(!player) return <StartScreen 
                        onStart={setPlayer} 
                        onShowLeaderboard={() => setShowLeaderboard(true)}
                      />

  return (
    <div className="App text-center">
      {/* Navbar */}
      <div className="flex justify-between items-center px-4 py-2 border-b border-gray-300 bg-gray-100 text-gray-700 font-semibold">
        <button
          onClick={() => setShowLeaderboard(true)}
          className="hover:text-blue-600 transition-colors"
        >
          📋 Leaderboard
        </button>
        <h1 className="text-xl font-bold">
          Wordle - Welcome {player}
        </h1>
        <button
          onClick={() => setPlayer('')}
          className="hover:text-red-600 transition-colors"
        >
          🔁 Change Player
        </button>
      </div>
      {solution && (
        <Wordle 
          key={solution} 
          solution={solution} 
          player={player}
          handleRestart={fetchNewSolution} 
          onShowLeaderboard={() => setShowLeaderboard(true)}
        />
      )}  
    </div>
  )
}