import { useState } from 'react'
import './App.css'
import { guess, startGame, restart } from './axios'

function App() {
  const [hasStarted, setHasStarted] = useState(false)
  const [hasWon, setHasWon] = useState(false)
  const [number, setNumber] = useState('')
  const [status, setStatus] = useState('')
  const [ERR, setERR] = useState('')
  


  const startMenu = (
    <div>
      <button
        onClick={async () => {
          try
          {
            await startGame()
            setHasStarted(true)
            setERR('')
          }
          catch(error)
          {
            setERR(error.toString())
          }
          
        }}
      >
        start game
      </button>
    </div>
  )

  const winningMode = (
    <>
      <p>you won! the number was {number}.</p>
      <button
        onClick={async () => {
          try
          {
            await restart()
            setHasWon(false)
            setStatus('')
            setNumber('')
            setERR('')
          }
          catch(error)
          {
            setERR(error.toString())
          }
          
        }}
      >
        restart
      </button>
    </>
  )

  // TODO:
  // 1. use async/await to call guess(number) in Axios
  // 2. Process the response from server to set the proper state values
  const handleGuess = () => {
    
    let re_msg = guess(number)
    re_msg.then(function(value){
      if(value !== 'XX')
      {
        setERR('')
        setStatus(value)
        if(value === 'Equal!')
        {
          setHasWon(true)
        }
      }
      else
      {
        setERR('Error: Network Error')
      }
      
    })
    
  }

  

  const gameMode = (
    <>
      <p>Guess a number between 1 to 100</p>
      <input
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      ></input>
      <button
        onClick={handleGuess}
        disabled={!number}
      >
        guess!
      </button>
      <p>{status}</p>
    </>
  )

  const game = (
    <div>
      {hasWon ? winningMode : gameMode}
    </div>
  )

  let err_css = {
    position: 'fixed',
    left: '0',
    bottom: '0',
    width: '100%',
    backgroundColor: 'red',
    color: 'white',
    textAlign: 'center',
  }

  return <div className="App">
          {hasStarted ? game : startMenu}
          <p style = {err_css}>{ERR}</p>
         </div>
}

export default App
