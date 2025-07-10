export default function Row({guess, currentGuess}) {
  if(guess){
    return (
      <div className="flex justify-center">
        {guess.map((l, i) => (
          <div
            key={i}
            className={`w-14 h-14 m-1 flex items-center justify-center text-2xl font-bold uppercase text-white
              ${l.color === 'green' ? 'bg-green-500' :
                l.color === 'yellow' ? 'bg-yellow-400' :
                'bg-gray-400'
              }
            `}
          >
            {l.key}
          </div>
        ))}
      </div>
    )
  }

  if(currentGuess) {
    const letters = currentGuess.split('')
    return (
      <div className="flex justify-center">
        {letters.map((letter, i) =>(
          <div
            key={i}
            className="w-14 h-14 m-1 flex items-center justify-center border border-gray-400 text-2xl font-bold uppercase"
          >
            {letter}
          </div>
        ))}

        {[...Array(5 - letters.length)].map((_, i) => (
          <div key={i} className="w-14 h-14 m-1 border border-gray-400"></div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex justify-center">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="w-14 h-14 m-1 border border-gray-400"></div>
      ))}
    </div>
  )
}