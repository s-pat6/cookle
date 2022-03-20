import React, { useState } from 'react'
import HowtoModal from './HowtoModal'
import './Menu.css'

export default function Menu({setMode}) {
    const [open, setOpen] = useState(false)


    function handleEasyOver(event) {
        event.target.style.backgroundColor='#8bdd0d'
    }

    function handleEasyOut(event) {
        event.target.style.backgroundColor='#adff2f'
    }

    function handleMediumOver(event) {
        event.target.style.backgroundColor='#dd0'
    }

    function handleMediumOut(event) {
        event.target.style.backgroundColor='#ff0'
    }

    function handleHardOver(event) {
        event.target.style.backgroundColor='#dd2300'
    }

    function handleHardOut(event) {
        event.target.style.backgroundColor='#ff4500'
    }

    function handleHowtoOver(event) {
        event.target.style.backgroundColor='#8bb6c4'
    }

    function handleHowtoOut(event) {
        event.target.style.backgroundColor='#add8e6'
    }

    function handleSetOpen() {
        setOpen(true)
    }

    function onClose() {
        setOpen(false)
    }

  return (
    <div className='flexbox'>
        <div className='title flex'>Welcome to Guess The City</div>
        <button onClick={() => setMode(1)} className='easy flex' onMouseOver={handleEasyOver} onMouseOut={handleEasyOut}>Easy</button>
        <button onClick={() => setMode(2)} className='medium flex' onMouseOver={handleMediumOver} onMouseOut={handleMediumOut}>Medium</button>
        <button onClick={() => setMode(3)} className='hard flex' onMouseOver={handleHardOver} onMouseOut={handleHardOut}>Hard</button>
        <button onClick={handleSetOpen} className='howto flex' onMouseOver={handleHowtoOver} onMouseOut={handleHowtoOut}>How To Play?</button>
        <HowtoModal open={open} onClose={onClose}/>
    </div>
  )
}
