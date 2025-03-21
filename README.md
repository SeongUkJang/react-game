**가위, 바위, 보** 게임을 만들기 위한 코드입니다. 
게임은 사용자가 선택한 것과 컴퓨터가 선택한 것을 비교하여 승패를 결정합니다.

### 1. **게임 목표**

- 사용자와 컴퓨터가 **가위, 바위, 보** 중 하나를 선택하고, 그에 따라 승패를 정합니다.
- 예를 들어:
    - **가위**는 **보**를 이기고
    - **바위**는 **가위**를 이기고
    - **보**는 **바위**를 이깁니다.

### 2. **기본 구조**

게임을 구현하는 데 필요한 주요 요소는 아래와 같습니다:

- **사용자의 선택**: 사용자가 선택한 가위, 바위, 보
- **컴퓨터의 선택**: 컴퓨터가 랜덤으로 선택한 가위, 바위, 보
- **게임 결과**: 승리, 패배, 무승부
- **승리 횟수**: 사용자가 이긴 횟수

### 3. **코드 단계별 설명**

```jsx
import React, { useState, useEffect } from 'react';
import './Game.scss';
import Button from './Button';

```

- **React**와 **useState**, **useEffect**를 사용합니다.
    - `useState`는 상태를 관리하는 데 사용됩니다.
    - `useEffect`는 상태가 바뀔 때 자동으로 어떤 작업을 실행할 수 있게 도와줍니다.

```jsx
const Game = () => {
  const choices = ['가위', '바위', '보'];  // 게임에서 선택할 수 있는 3가지 옵션

```

- `choices`는 **가위, 바위, 보**의 3가지 선택지를 배열로 저장합니다.

```jsx
  const [userChoice, setUserChoice] = useState(null);  // 사용자의 선택 (초기값은 없으므로 null로 설정)
  const [comChoice, setComChoice] = useState(null);    // 컴퓨터의 선택 (초기값은 없으므로 null로 설정)
  const [result, setResult] = useState('');            // 게임 결과 (초기값은 빈 문자열)
  const [winCount, setWinCount] = useState(0);         // 사용자 승리 횟수 (초기값은 0)

```

- 상태 변수들을 `useState`로 선언하여 값을 관리합니다.
    - `userChoice`: 사용자가 선택한 값 (가위, 바위, 보)
    - `comChoice`: 컴퓨터가 선택한 값 (가위, 바위, 보)
    - `result`: 게임의 결과 (사용자 승리, 컴퓨터 승리, 무승부)
    - `winCount`: 사용자가 몇 번 이겼는지 세는 변수

### 4. **컴퓨터의 선택을 랜덤으로 결정하기**

```jsx
  useEffect(() => {
    if (userChoice !== null) {  // 사용자가 선택을 했다면
      const randomIndex = Math.floor(Math.random() * choices.length);  // 0, 1, 2 중 랜덤 번호 선택
      setComChoice(choices[randomIndex]);  // 랜덤으로 선택된 값을 컴퓨터 선택으로 설정
    }
  }, [userChoice]);

```

- `useEffect`를 사용하여 사용자가 선택을 하면 컴퓨터의 선택도 랜덤으로 결정됩니다.
    - `Math.random()`은 0과 1 사이의 난수를 발생시키고, 이를 `Math.floor()`로 내림하여 `choices` 배열에서 랜덤한 인덱스를 선택합니다.

### 5. **게임 결과 계산하기**

```jsx
  useEffect(() => {
    if (userChoice && comChoice) {  // 사용자가 선택하고, 컴퓨터가 선택한 후 실행
      if (userChoice === comChoice) {  // 사용자와 컴퓨터가 같은 것을 선택하면
        setResult('무승부');
      } else if (
        (userChoice === '가위' && comChoice === '보') ||
        (userChoice === '바위' && comChoice === '가위') ||
        (userChoice === '보' && comChoice === '바위')
      ) {  // 사용자가 이긴 경우
        setResult('사용자 승리!');
        setWinCount(prev => prev + 1);  // 사용자가 이겼으므로 승리 횟수 증가
      } else {  // 그 외의 경우는 컴퓨터가 이긴 경우
        setResult('컴퓨터 승리!');
      }
    }
  }, [comChoice, userChoice]);

```

- 두 번째 `useEffect`에서는 **사용자와 컴퓨터의 선택**을 비교하여 결과를 계산합니다.
    - **같으면 무승부**
    - **사용자가 이기면 승리**
    - **그 외에는 컴퓨터 승리**

### 6. **UI 출력**

```jsx
  return (
    <div className="game-container">
      <div className="choices">
        {choices.map((choice) => (
          <Button
            key={choice}
            value={choice}
            className="choice-btn"
            onClick={() => setUserChoice(choice)}  // 버튼 클릭 시 선택한 값을 userChoice로 설정
          />
        ))}
      </div>

      <div className="results">
        <p>🙋‍♂️사용자 : <span>{userChoice || '?'}</span></p>
        <p>🤖컴퓨터 : <span>{comChoice || '?'}</span></p>
        <div className="result-text">결과: {result}</div>
        <div className="win-count">🏆승리횟수: {winCount}</div>
      </div>
    </div>
  );
};

```

- `choices.map()`을 사용해 3개의 버튼을 렌더링합니다.
    - 각 버튼을 클릭하면 `setUserChoice`가 호출되어 사용자가 선택한 값을 `userChoice`에 저장합니다.
- 게임 결과와 승리 횟수를 화면에 표시합니다.

### 7. **정리**

- 이 코드는 사용자가 "가위", "바위", "보" 중 하나를 선택하면, 컴퓨터가 랜덤으로 하나를 선택하고, 그 선택에 따라 결과를 화면에 표시합니다.
- 게임 결과는 `결과: 사용자 승리!`, `결과: 컴퓨터 승리!`, `결과: 무승부` 중 하나로 표시됩니다.
- 사용자가 이길 때마다 승리 횟수가 1씩 증가합니다.

### 코드

- Game.jsx
    
    ```jsx
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
    ```
    
- Button.jsx
    
    ```jsx
    import React from 'react'
    
    const Button = ({
        value,
        className = '',
        onClick
    }) => {
        return (
            <button 
            className={`btn ${className}`}
            onClick={()=>onClick?.(value)}
            >
                {value}
            </button>
        )
    }
    
    export default Button
    ```
    
- Game.scss
    
    ```scss
    $primary-color:#877afe;
    $hover-color:#362b9a;
    $text-color:#fff;
    $result-color:rgb(186, 17, 17);
    
    .game-container{
        text-align: center;
        background-color: $text-color;
        padding: 30px;
        border-radius: 10px;
    
        .choices{
            display: flex;
            gap: 10px;
            justify-content: center;
            margin-bottom: 20px;
    
            .choice-btn{
                background-color: $primary-color;
                border: none;
                padding: 10px 20px;
                min-width: 65px;
                font-size: 18px;
                cursor: pointer;
                border-radius: 5px;
                color: $text-color;
                transition:background-color .3s ease;
    
                &:hover{
                    background-color: $hover-color;
                }
    
            }
        }
        .results {
            font-size: 20px;
    
            .result-text {
                font-weight: bold;
                margin-top: 10px;
                color: $result-color;
            }
        }
    
    }
    ```
    
- App.jsx
    
    ```jsx
    import './App.css'
    import Game from './components/Game'
    function App() {
    
      return (
        <div>
          <Game/>
    
        </div>
      )
    }
    
    export default App
    
    ```
    
- App.css
    
    ```css
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #eee;
    }
    ```
