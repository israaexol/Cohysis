import React from 'react'
import './Intro.css'
import cohbot from '../../assets/cohbot.png'

const Intro = () => {
  return (
    <div className='main'>
        <div className='intro'>
            <h1 className='title'>Cohysis</h1>
            <p className='description'>Analyzing and evaluating how <span style={{color: '#F4B400'}}>coherent</span> your texts are <tr/> (let it be emails, reviews, any!) has never been easier!</p>
        </div>
        <div className='bot'>
            <img src={cohbot} className='image'></img>
        </div>

    </div>
  )
}

export default Intro