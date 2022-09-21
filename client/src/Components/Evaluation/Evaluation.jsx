import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import './Evaluation.css'
import cohbot from '../../assets/cohbot.png'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Form } from "react-bootstrap";
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios'

const Evaluation = () => {

    const [text, setText] = useState("");
    const [score, setScore] = useState(null)
    const [isLoading, setLoading] = useState(null)

    const handleChange = txt => {
        console.log('here')
        setText(txt)
        console.log(text)
      };

    const handleSubmit = (event) => {
        setLoading(true)
        event.preventDefault();
        const body = { text };
          axios
            .post('http://localhost:8080/evaluate/', body)
            .then((res) => {
              const data = res.data.results
              let msg = data.pred
              console.log(msg)
            //   divelement.hidden = false
              setScore(msg)
    
              setLoading(false)
            })
            .catch((error) => {
            //   divelement.hidden = false
              setScore(error.message)
              setLoading(false)
            })
        }

    function Score({ score }) {
        let val
        if (score == 'Low') {
            val = <span style={{color: '#E33A3A', fontFamily: 'GeorgiaBold'}}>{score}</span>

        }
        else if (score == 'Medium') {
            val = <span style={{color: '#FF9A02', fontFamily: 'GeorgiaBold'}}>{score}</span>
        }
        else if (score == 'High') {
            val = <span style={{color: '#079615', fontFamily: 'GeorgiaBold'}}>{score}</span>
        }
        return (
            <div className='result'>Coherence level : {val}</div>
        );
        }

    function Result({isLoading, score}) {
        if (isLoading == null ) {
            return <></>
        }
        else if (isLoading == true) {
            return <CircularProgress id='loading'/>
        }
        else {
            return <Score score={score}/>
        }
    }

  return (
    <div className='main-form'>
        <h1>Try it out!</h1>
            <div className='form'>
                <Form id="_form" onSubmit={handleSubmit}>
                    <div className='input_text'>
                        <textarea
                            id='CheckIt'
                            className='_textarea'
                            required
                            type='text'
                            placeholder="Insert your text here!"
                            value={text}
                            onChange={(e) => handleChange(e.target.value)}
                        />
                    </div>

                    <div className='eval'>
                        <Button type="submit" id='eval_btn'>Evaluate</Button>
                        <Result isLoading={isLoading} score={score}/>
                    </div>
                </Form>
            </div>
            
        
        
    </div>
  )
}

export default Evaluation