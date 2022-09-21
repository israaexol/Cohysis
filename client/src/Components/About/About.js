import React from 'react'
import document from '../../assets/document.png'
import './About.css'

const About = () => {
  return (
    <div className='main-about'>
        <h1>About</h1>
        <div className='description-about'>
            <p className='about-cohysis'>
                <b><span style={{fontFamily:'Playfair Display', fontWeight: '900'}}>Cohysis</span></b> is a web application for textual coherence evaluation. Thanks to advanced Natural Language Processing Techniques,
                you will be able to evaluate how coherent your documents, are regardless of their type (e-mails, business reviews, you name it), in just one click.
                <tr/>
                The tool currently supports documents that are, at most, <b>300 caracters long</b> but will leverage support for longer documents in future releases!
                <tr/>
                Three levels of coherence scores are used: <b><span style={{color: '#E33A3A'}}>Low</span></b>, <b><span style={{color: '#FF9A02'}}>Medium</span></b> and <b><span style={{color: '#079615'}}>High</span></b>, calculated based on the contextual information and semantic relatedness contained in the document.
            </p>
            <img src={document} className='document'></img>
        </div>
    </div>
  )
}

export default About
