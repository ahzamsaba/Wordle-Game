import useWordle from "../hooks/useWordle"
export default function Modal({isCorrect, solution, turn, handleRestart, onShowLeaderboard, isHint}){
  if(isHint) turn += 1

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-10">
      <div className="bg-white rounded-lg p-8 shadow-lg text-center max-w-md">
        {isCorrect ? (
          <>
            <h1 className="text-2xl font-bold text-green-600 mb-4">🎉 You Win!</h1>
            <p className="text-lg">You found the word <span className="font-bold uppercase text-pink-500">{solution}</span></p>
            <p className="text-sm mt-2">in {turn === 1 ? 'a single guess' : `${turn} guesses`}.</p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-red-600 mb-4">😔 Game Over</h1>
            <p className="text-lg">The word was <span className="font-bold uppercase text-pink-500">{solution}</span></p>
            <p className="text-sm mt-2">Better luck next time!</p>
          </>
        )}

        {/* Restart */}
        <button
          className="mt-6 px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
          onClick={handleRestart}
        >
          🔁 Play Again
        </button>
        <button
          className="px-4 py-2 bg-gray-600 text-white font-semibold rounded hover:bg-gray-700"
          onClick={onShowLeaderboard}
        >
          📋 View Leaderboard
        </button>
      </div>
    </div>
  )
}