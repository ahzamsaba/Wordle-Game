import { useEffect, useState } from "react";

export default function Keypad({usedKeys, handleKeyup}) {
  const [letters, setLetters] = useState(null)

  useEffect(() => {
    fetch("/api/letters")
      .then(res => res.json())
      .then(data => setLetters(data))
  }, [])

  const handleClick = (key) => {
    handleKeyup({key})
  }

  return (
    <div className="max-w-xl mx-auto mt-6 flex flex-wrap justify-center gap-2">
      {letters && letters.map(l => {
        const color = usedKeys[l.key]

        return (
          <button
            key={l.key}
            onClick={() => handleClick(l.key)}
            className={`
              w-10 h-12 rounded text-center font-bold uppercase
              ${color === 'green' ? 'bg-green-500 text-white' :
                color === 'yellow' ? 'bg-yellow-400 text-white' :
                color === 'grey' ? 'bg-gray-400 text-white' :
                'bg-gray-200 text-black'}
            `}
          >
            {l.key}
          </button>
        )
      })}

      {/* enter */}
      <button
        onClick={() => handleClick("Enter")}
        className="w-20 h-12 rounded bg-blue-500 text-white font-bold uppercase"
      >
        Enter
      </button>

      {/* backspace */}
      <button
        onClick={() => handleClick("Backspace")}
        className="w-20 h-12 rounded bg-red-500 text-white font-bold uppercase"
      >
        ⌫
      </button>
    </div>
  )
}