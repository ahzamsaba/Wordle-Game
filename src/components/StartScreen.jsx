import { useState } from "react";

export default function StartScreen({onStart, onShowLeaderboard}) {
    const [name, setName] = useState('')

    const handleStart = () => {
        if(name.trim())
            onStart(name.trim())
    }

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-center p-4">
            <h1 className="text-3xl font-bold mb-4">Welcome to Wordle</h1>
            <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mb-4 px-4 py-2 border rounded w-64 text-center"
            />
            <button
                onClick={handleStart}
                className="mb-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                🎮 Start Game
            </button>
            <button
                onClick={onShowLeaderboard}
                className="text-sm text-blue-600 underline hover:text-blue-800 transition-colors"
            >
                🏆 View Leaderboard
            </button>
            </div>
    )
}