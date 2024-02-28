import React, { useEffect, useState, useRef } from 'react'
import './Guessed.css'
import InputBox from './InputBox'

export default function Guessed({guessed, ingredients, selectedOption, steps, image}) {
  // console.log("Guessed is running")

  function firstWords(x, l) {
    let str = ""
    for (var i = 0; i < l; i++) {
      str += x.substr(0,x.indexOf(' ')+1).trim()
      if (x.indexOf(' ') === -1) {
        str += x
        x = ""
        break
      }
      x = x.substr(x.indexOf(' ')+1)
      str += " "
    }
    x.length > 1 ? str += "..." : str += ""
    return str
  }

  return (
    <div className='box'>
      <h1>Ingredients: </h1>
      <div></div>
      <ul className='ashwin'>
        {ingredients.map((x, i) => {
          return (i < (ingredients.length/2)) ? (<li>{firstWords(x, 6)}</li>) : ""
        })}
      </ul>
      <ul className='ashwin'>
        {ingredients.map((x, i) => {
          return (i >= ingredients.length/2) ? (<li>{firstWords(x, 6)}</li>) : ""
        })}
      </ul>
      <div></div>
      <h1>Steps: </h1>
      <ol>
        {guessed.map((x, i) => {
          return (i < steps.length ? <li className='steps'>{steps[i]}</li> : null)
        })}
      </ol>
      <div></div>
      {guessed.length > ingredients.length ? <img src={image} /> : null}
      <h1>Your Guesses: </h1>
      {guessed.map((x, i) => {
      return (i !== guessed.length ? <div className=''>{x}</div> : null) 
      })}
      {selectedOption}
    </div>
  )
}
