import React, { useEffect, useState, useRef } from 'react'
import './Guessed.css'
import InputBox from './InputBox'

export default function Guessed({guessed, ingredients, selectedOption}) {
  // console.log("Guessed is running")

  function firstWords(x, l) {
    let str = ""
    for (var i = 0; i < l; i++) {
      str += x.substr(0,x.indexOf(' ')+1).trim()
      if (x.indexOf(' ') === -1) {
        x = ""
        break
      }
      x = x.substr(x.indexOf(' ')+1)
      console.log(x)
      str += " "
    }
    x.length > 1 ? str += "..." : str += ""
    return str
  }

  return (
    <div className='box'>
      <h1>Ingredients: </h1>
      <ul className='ashwin'>
        {ingredients.map((x, i) => {
          return (i < (ingredients.length/2)) ? (<li>{firstWords(x, 5)}</li>) : ""
        })}
      </ul>
      <ul className='ashwin'>
        {ingredients.map((x, i) => {
          return (i >= ingredients.length/2) ? (<li>{firstWords(x, 5)}</li>) : ""
        })}
      </ul>
      {guessed.map((x) => {
      return <div>{x}</div>
      })}
      {selectedOption}
    </div>
  )
}
