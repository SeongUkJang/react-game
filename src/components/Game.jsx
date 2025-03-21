import React, { useState ,useEffect} from 'react'
import './Game.scss'
import Button from './Button'

const Game = () => {

    const choices = ['가위', '바위', '보']

    const [userChoice, setUserChoice]= useState(null)
    const [comChoice, setComChoice]= useState(null)

    const [result, setResult]=useState('')
    const [winCount, setWinCount]=useState(0)

    useEffect(()=>{
        
        if(userChoice!==null){
            const randomIndex = Math.floor(Math.random()* choices.length)

            setComChoice(choices[randomIndex])
        }
    },[userChoice])



    useEffect(()=>{
        if(userChoice&&comChoice){
            if(userChoice==comChoice){
                setResult('무승부')
            }
            else if(
                (userChoice ==='가위' && comChoice==='보')||
                (userChoice ==='바위' && comChoice==='가위')||
                (userChoice ==='보' && comChoice==='바위')
            ){
                setResult('사용자 승리!')
                setWinCount(prev=>prev+1)
                
            }else{
                setResult('컴퓨터 승리!')

            }
        }



    },[comChoice])


    return (
        <div className='game-container'>
            <div className="choices">
                {choices.map((choice) => (
                    <Button
                        key={choice}
                        value={choice}
                        className="choice-btn"
                        onClick={(value)=> setUserChoice(value)}
                    />
                ))}
            </div>
            <div className="results">
                <p>🙋‍♂️사용자 : <span>{userChoice || '?'}</span></p>
                <p>🤖컴퓨터 : <span>{comChoice || '?'}</span></p>
                <div className="result-text">결과:{result}</div>
                <div className="win-count">🏆승리횟수:{winCount}</div>
            </div>
        </div>
    )
}

export default Game