import { useEffect, useState } from "react";

export default function Leaderboard({onBack}) {
    const [scores, setScores] = useState([])

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('wordleScores')) || []
        
        const sorted = saved.sort((a, b) => {
            // winner first
            if(a.won && !b.won) return -1
            if(!a.won && b.won) return 1

            // if both win sort by turns
            if(a.won && b.won) {
                if(a.turn !== b.turn) return a.turn - b.turn

                // equal turns -> sort by time
                return new Date(a.date) - new Date(b.date)
            }

            // both loss -> sort by time

            return new Date(a.date) - new Date(b.date)
        })
        
        setScores(sorted)
    }, [])

    return (
        <div className="max-w-xl mx-auto mt-10 text-center">
            <h2 className="text-xl font-bold mb-4">🏆 Leaderboard</h2>
            <button
                onClick={onBack}
                className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 "
            >
                🔙 Back to Game
            </button>

            <table className="w-full border border-collapse text-left text-sm">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2 border">Rank</th>
                        <th className="p-2 border">Name</th>
                        <th className="p-2 border">Result</th>
                        <th className="p-2 border">Turns</th>
                        <th className="p-2 border">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {scores.map((s, i) => {
                        const rankIcon = i ===0 ? '🥇' : i===1 ? '🥈' : i===2 ? '🥉' : i+1
                        
                        let rowColor = ''
                        if(i===0) rowColor = 'bg-yellow-100'
                        else if(i===1) rowColor = 'bg-gray-200'
                        else if(i===2) rowColor = 'bg-orange-100'

                        if(!s.won) rowColor = 'bg-red-50 text-red-700'
                        return (
                            <tr key={i} className={`border ${rowColor}`}>
                                <td className="p-2 border">{rankIcon}</td>
                                <td className="p-2 border">{s.player}</td>
                                <td className={`p-2 border ${s.won ? 'text-green-600' : 'text-red-600'}`}>{s.won ? 'Win' : 'Lose'}</td>
                                <td className="p-2 border">{s.turn}</td>
                                <td className="p-2 border">{s.date}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
