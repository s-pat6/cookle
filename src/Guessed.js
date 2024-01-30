import React, { useEffect, useState, useRef } from 'react'
import './Guessed.css'
import InputBox from './InputBox'

export default function Guessed({allCities, ingredients, selectedOption}) {
  // console.log("Guessed is running")

  return (
    <div className='box'>
      <h1>Ingredients: </h1>
      {ingredients.map((x) => {
        return (<div>{x}</div>)
      })}
      {selectedOption}
    </div>
  )
}
