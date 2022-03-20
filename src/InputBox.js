import React, { useState, useEffect} from 'react'
import './InputBox.css'

export default function InputBox({ guessNameRef, handleGuess, prevVal, rerun }) {
    const [val, setVal] = useState("")
    useEffect(() => {
        setVal(prevVal)
    }, [rerun])
  return (
    <div>
        <input placeholder='Enter a city...' onChange={e => {setVal(() => {return e.target.value})}} value={val} ref={guessNameRef} type='text' onKeyPress={e => { if (e.key === "Enter") {setVal(e.key.value); return handleGuess()} }} />
    </div>
  )
}
