import React, {useState, useRef, useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import data from './data.json'
import Guessed from './Guessed'
import InputBox from './InputBox'
import haversine from "./haversine"
import './App.css'
import Modal from './Modal'
import Menu from './Menu'

function App() {
  const [guessed, setGuessed] = useState([]) //Array of objects of all cities that were guessed
  const guessNameRef = useRef() //Whatever's in the input field
  const [curCity, setCurCity] = useState({}) //JSON object of the answer
  const [error, setError] = useState('') // Sends message saying a city isn't valid
  const [numGuess, setNumGuess] = useState(1) // Sets the current number of guesses
  const [val, setVal] = useState("") //Sets the value of the input box
  const [rerun, setRerun] = useState(false) //Flips value every time handleGuess is run
  const [isOpen, setIsOpen] = useState(false) //Determines whether the modal should be open
  const [didWin, setDidWin] = useState(false)
  const [didLose, setDidLose] = useState(false)
  const [mode, setMode] = useState(0)
  const [minDist, setMinDist] = useState(10000000)

  // console.log(curCity.name)

  function handlePlayAgain() {
    setGuessed([])
    setCurCity(() => {
      const data2 = data.filter(item => item.iso === "US")
      return data2[Math.floor(Math.random()*(100))]
    })
    setError('')
    setNumGuess(1)
    setVal('')
    setDidWin(false)
    setIsOpen(false)
    setDidLose(false)
  }

  function handleGuess () { // Runs whenever submit is pressed
    // console.log("Handle guess running")

    setRerun(prev => { // Make rerun the opposite of what it is
      return !prev
    })

    setGuessed(prevGuessed => { // Creates dataRef variable to assign the input value to a JSON data object
      const name = guessNameRef.current.value.split(", ")
      // console.log("Name: " + name)
      const lowerName = name[0].toLowerCase()
      let dataRef
      for (let i=0; i<data.length; i++) {
        if (!dataRef) {
          if (name.length === 1) {
            for (let j=0; j<data[i].accepted.length; j++) {
              if (data[i].accepted[j] === lowerName) {
                dataRef = data[i]
              }
            }
          } else {
            if (name[1].toUpperCase() === data[i].iso) {
              for (let j=0; j<data[i].accepted.length; j++) {
                if (data[i].accepted[j] === lowerName) {
                  dataRef = data[i]
                }
              }
            }
          }
        }
      }

      setError(() => { // If not a valid city, send an error message
        if(!dataRef) {
          return "Not a valid city"
        }
        return null
      })

      setVal("")

      if (!dataRef) {
        setVal(name)
        return [...prevGuessed]
      }

      setNumGuess(prev => { // Increase the number of guesses by 1
        return prev + 0.5
      })

      setMinDist(prev => {
        // console.log("data ref dist is: "+ dataRef.dist)
        if (dist < prev) {
          return dist
        }
        return prev
      })

      const dist = haversine(dataRef, curCity) // Calculate distance with the haversine formula

      if (dist === 0) {
        handleWin()
      }

      return [...prevGuessed, {key: uuidv4(), name: dataRef.name, check: lowerName, dataRef: dataRef, dist: dist, numGuess: numGuess}]
    })
  }

  function handleWin() {
    setTimeout(() => {
      // console.log("You win!")
      setDidWin(true)
      setIsOpen(true)
    }, 2000)
  }

  function handleGiveUp() {
    setDidLose(true)
    setIsOpen(true)
  }

  useEffect(() => {
    setCurCity(() => {
      const data2 = data.filter(item => item.iso === "US")
      return data2[Math.floor(Math.random()*(data2.length/(100)))]
    })
  }, [mode])

  function handleSetMode(n) {
    setMode(n)
    handlePlayAgain()
  }

  function handleSetMenu() {
    setMode(0)
  }

  if (mode === 0) {
    return (
    <div>
      <Menu setMode={handleSetMode}/>
    </div>
    )
  }

  return (
  <div className='screen'>
    <h1 className='title flex'>Guess The City</h1>
    <div className='flex'>Game Mode: {mode === 1 ? 'Easy' : mode === 2 ? 'Medium' : 'Hard'}</div>
    <div className='box flex'>
      <Guessed allCities={guessed} cur={curCity} mode={mode} minDist={minDist}/>
    </div>
    <div className='input flex'>
      <InputBox guessNameRef={guessNameRef} handleGuess={handleGuess} prevVal={val} rerun={rerun}/>
      <div className='error'>{error}⠀</div>
    </div>
    <div className='button flex'>
      <button className='submit' onClick={handleGuess}>Submit</button>
      <button className='again' onClick={handleGiveUp}>{didWin||didLose ? 'Show Stats' : 'Give Up'}</button>
    </div>
    <Modal open={isOpen} onClose={() => setIsOpen(false)} didWin={didWin} city={guessed} cur={curCity} handlePlayAgain={handlePlayAgain} handleSetMode={handleSetMenu}/>
  </div>
  )
}
export default App;