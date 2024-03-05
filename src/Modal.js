import React from 'react'
import ReactDOM from 'react-dom'
import './Modal.css'

const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
    padding: '50px',
    zIndex: 1000
}

const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 1000
}

export default function Modal({open, onClose, didWin, guessed, cur, handlePlayAgain, handleSetMode, time}) {
    function handleMouseOver(event) {
        event.target.style.backgroundColor='#aaa'
    }

    function handleMouseOut (event) {
        event.target.style.backgroundColor='#fff'
    }

    if (!open) return null

    return ReactDOM.createPortal(
        <>
            <div style={OVERLAY_STYLES} />
            <div className='modalflex' style={MODAL_STYLES}>
                <button className='close' onClick={onClose} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>x</button>
                <div className='modaltext'>{didWin ? 'Congrats, you won!' : "Better luck next time."}</div>
                <div className='modaltext'>The correct answer was {cur.recipe_name}.</div>
                {didWin ?<div className='modaltext'>It took you {guessed.length} guesses to find the correct answer.</div> : <div className='text'>You didn't find the right answer.</div> }
                <img className='modalimg' src={cur.image}/>
                <br />
                <div>
                    <button className='again' onClick={handlePlayAgain}>New Random Recipe</button>
                </div>
                <h2>Next daily game in: {time}</h2>
            </div>
        </>,
        document.getElementById('portal')
  )
}
