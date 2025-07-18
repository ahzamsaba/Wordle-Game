import { useState } from "react";

const useWordle = (solution) => {
    const [turn, setTurn] = useState(0)
    const [currentGuess, setCurrentGuess] = useState('')
    const [guesses, setGuesses] = useState([...Array(6)])
    const [history, setHistory] = useState([])
    const [isCorrect, setIsCorrect] = useState(false)
    const [usedKeys, setUsedKeys] = useState({})
    const [hint, setHint] = useState('')
    const[isHint, setIsHint] = useState(false)

    // current Guess into array of {key, color}
    const formatGuess = () => {
        let solutionArray = [...solution]
        let formatted = [...currentGuess].map((l) => ({key: l, color: 'grey'}))

        // Green(correct letter & correct position)
        formatted.forEach((l, i) => {
            if(solution[i] === l.key){
                formatted[i].color = 'green'
                solutionArray[i] = null
            }
        })

        // Yellow (current letter but wrong position)
        formatted.forEach((l,i) => {
            if(solutionArray.includes(l.key) && l.color !== 'green'){
                formatted[i].color = 'yellow'
                solutionArray[solutionArray.indexOf(l.key)] = null
            }
        })

        return formatted
    }

    // add formatted guess to guesses state & update other states
    const addNewGuess = (formatGuess) => {
        if(currentGuess === solution)
            setIsCorrect(true)

        setGuesses(prev => {
            const newGuesses = [...prev]
            newGuesses[turn] = formatGuess
            return newGuesses
        })

        setHistory(prev => [...prev, currentGuess])
        setTurn(prev => prev+1)
        setCurrentGuess('')

        // update used keys (keyboard color)
        setUsedKeys(prev => {
            const updatedKeys = {...prev}

            formatGuess.forEach(l => {
                const currentColor = updatedKeys[l.key]

                if(l.color === 'green')
                    updatedKeys[l.key] = 'green'
                else if(l.color === 'yellow'){
                    if(currentColor !== 'green')
                        updatedKeys[l.key] = 'yellow'
                }
                else if(l.color === 'grey'){
                    if(!currentColor)
                        updatedKeys[l.key] = 'grey'
                }
            })
            return updatedKeys
        })
    }

    // keyboaed events
    const handleKeyup = ({key}) => {
        if(key === 'Enter') {
            if(turn > 5){
                console.log('No more turns');
                return
            }

            if(history.includes(currentGuess)){
                console.log('Word already guessed');
                return
            }

            if(currentGuess.length !== 5){
                console.log('Word must be 5 letters');
                return
            }

            const formatted = formatGuess()
            addNewGuess(formatted)
            return
        }

        if(key === 'Backspace'){
            setCurrentGuess(prev => prev.slice(0, -1))
            return
        }

        if(/^[A-Za-z]$/.test(key)) {
            if(currentGuess.length < 5)
                setCurrentGuess(prev => prev + key.toLowerCase())
        }
    }

    const useHint = () => {
        if(!isHint){
        let hintArray = Array(5).fill('_')
        const greenLetters = []

        // Collect green letters from previous guesses
        guesses.forEach(guess => {
            if (guess) {
                guess.forEach((letterObj, i) => {
                    if (letterObj.color === 'green') {
                        hintArray[i] = letterObj.key.toUpperCase()
                        greenLetters.push(letterObj.key)
                    }
                })
            }
        })

        // Pick a random letter from solution not already green
        const unrevealedIndices = solution
            .split('')
            .map((l, i) => ({ letter: l, index: i }))
            .filter(({ letter, index }) => hintArray[index] === '_')

        if (unrevealedIndices.length > 0) {
            const random = unrevealedIndices[Math.floor(Math.random() * unrevealedIndices.length)]
            hintArray[random.index] = random.letter.toUpperCase()
        }

        setHint(hintArray.join(''))}
        setIsHint(true)
    }

    return {
        turn,
        currentGuess,
        guesses,
        isCorrect,
        usedKeys,
        handleKeyup,
        useHint,
        hint,
        isHint
    }
}

export default useWordle