import { useEffect, useState } from "react";

export default function Keypad({usedKeys}) {
  const [letters, setLetters] = useState(null)

  useEffect(() => {
    fetch('http://localhost:3001/letters')
      .then(res => res.json())
      .then(data => setLetters(data))
  }, [])

  return (
    <div className="max-w-xl mx-auto mt-6 flex flex-wrap justify-center gap-2">
      {letters && letters.map(l => {
        const color = usedKeys[l.key]

        return (
          <div
            key={l.key}
            className={`
              w-10 h-12 rounded text-center leading-[3rem] font-bold uppercase
              ${color === 'green' ? 'bg-green-500 text-white' :
                color === 'yellow' ? 'bg-yellow-400 text-white' :
                color === 'grey' ? 'bg-gray-400 text-white' :
                'bg-gray-200 text-black'}
            `}
          >
            {l.key}
          </div>
        )
      })}
    </div>
  )
}