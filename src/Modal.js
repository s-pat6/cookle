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

export default function Modal({open, onClose, didWin, city, cur, handlePlayAgain, handleSetMode}) {
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
                <div className='text'>{didWin ? 'Congrats, you won!' : "Better luck next time."}</div>
                <div className='text'>The correct answer was {cur.name}.</div>
                {didWin ?<div className='text'>It took you {city[city.length-1].numGuess} guesses to find the correct answer.</div> : <div className='text'>You didn't find the right answer.</div> }
                <div>
                    <button className='again' onClick={handlePlayAgain}>Play Again</button>
                </div>
                <div className='text'>or...</div>
                <div><button className='menu' onClick={handleSetMode}>Try Another Mode</button></div>
            </div>
        </>,
        document.getElementById('portal')
  )
}
