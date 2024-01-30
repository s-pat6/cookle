import React, { useEffect, useState, useRef } from 'react'
import './Guessed.css'
import InputBox from './InputBox'

export default function Guessed({allCities, ingredients}) {
  // console.log("Guessed is running")

  return (
    <div className='box'>
      {ingredients}
    </div>
  )
}
