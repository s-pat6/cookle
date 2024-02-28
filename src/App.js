import React, {useState, useRef, useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import data from './data.json'
import Guessed from './Guessed'
import InputBox from './InputBox'
import haversine from "./haversine"
import './App.css'
import Modal from './Modal'
import Menu from './Menu'
import logo from "./cooklelogo.png"

function App() {
  const [guessed, setGuessed] = useState([]) //Array of objects of all cities that were guessed
  const guessNameRef = useRef() //Whatever's in the input field
  const [curFood, setCurFood] = useState(data[0]) //JSON object of the answer
  //cooking_method: array of strings
  //image: string url
  //ingredients: array of strings
  //recipe_name: string
  const [error, setError] = useState('') // Sends message saying a city isn't valid
  const [numGuess, setNumGuess] = useState(1) // Sets the current number of guesses
  const [val, setVal] = useState("") //Sets the value of the input box
  const [rerun, setRerun] = useState(false) //Flips value every time handleGuess is run
  const [isOpen, setIsOpen] = useState(false) //Determines whether the modal should be open
  const [didWin, setDidWin] = useState(false)
  const [didLose, setDidLose] = useState(false)
  const [mode, setMode] = useState(0)
  const [ingreds, setIngreds] = useState(data[0].ingredients)
  const [selectedOption, setSelectedOption] = useState(null);

  const date = new Date()

  // console.log(curCity.name)

  function handlePlayAgain() {
    setGuessed([])
    setCurFood(() => {
      console.log(Math.floor(Math.random()*(data.length)))
      console.log(data.length)
      return data[Math.floor(Math.random()*(data.length))]
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
          return "Not a valid recipe"
        }
        return null
      })

      setVal("")

      if (!dataRef) {
        setVal(name)
        return [...prevGuessed]
      }

      setNumGuess(prev => { // Increase the number of guesses by 1
        return prev + 1
      })

      if (dataRef === curFood) {
        handleWin()
      }

      return [...prevGuessed, {key: uuidv4(), name: dataRef.name, check: lowerName, dataRef: dataRef, numGuess: numGuess}]
    })
  }

  function handleWin() {
    setTimeout(() => {
      // console.log("You win!")
      setDidWin(true)
      setIsOpen(true)
    }, 100)
  }

  function handleGiveUp() {
    setDidLose(true)
    setIsOpen(true)
  }

  useEffect(() => {
    setCurFood(() => {
      console.log("run")
      return data[Math.floor(Math.random()*(data.length/(100)))]
    })
    setIngreds(() => {
      return curFood.ingredients;
    });
  }, [])

  function handleSetMode(n) {
    setMode(n)
    handlePlayAgain()
  }

  function handleSetMenu() {
    setMode(0)
  }

  function handleOnSubtmit () {
    setGuessed( (x) => {
      return [...x, selectedOption.value]
    })

    if (selectedOption.value===curFood.recipe_name) {
      console.log("correct")
      handleWin();
    }
    console.log(guessed)
  }

  return (
  <div className="screen">
    <div className='header'>
      <h1 className='title'>Cookle</h1>
      <img src={logo} className='logo' width={150}></img>
    </div>
    <div className=''>
      <div>{date.getUTCDate()}</div>
      {!didWin ? <InputBox selectedOption={selectedOption} setSelectedOption = {setSelectedOption} handleOnSubtmit={handleOnSubtmit}/> : null}
      <Guessed guessed={guessed} ingredients={curFood.ingredients} selectedOption={selectedOption ? selectedOption.value : ""} steps={curFood.cooking_method} image = {curFood.image}/>
      <Modal open={isOpen} onClose={() => setIsOpen(false)} didWin={didWin} guessed={guessed} cur={curFood} handlePlayAgain={handlePlayAgain} handleSetMode={handleSetMenu}/>
      {didWin ? <button onClick={() => setIsOpen(true)}>See Results</button> : null}
    </div>
  </div>
  )
}
export default App; 