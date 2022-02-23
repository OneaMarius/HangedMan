import React, { useContext, useEffect, useState } from 'react'
import TopInfoBar from '../components/GameLayout/TopInfoBar';
import GameControllers from '../components/GameLayout/GameControllers';
import Card from '../components/Cards/Card';
import WordWindow from '../components/GameLayout/WordWindow';
import HangedMan from '../components/GameLayout/HangedMan';
import AuthContext from '../context/auth-context';


function GamePage() {
    const authCtx = useContext(AuthContext);
    const user = authCtx.user;
    const [word, setWord] = useState('');
    const [score, setScore] = useState(user.score);
    const [winGame, setWinGame] = useState(false);
    const [errors, setErrors] = useState(0);

  async  function UpdatePlayerScore (lastScore) {
        let responseData;
      try {
         const response = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/users/score`,
            {
               method: "PATCH",
               headers: {
                  "Content-type": "application/json",
               },
               body: JSON.stringify({
                userId:user._id,
                userScore:lastScore
               }),
            }
         );
         responseData = await response.json();
         if (!response.ok) {
            throw new Error(responseData.message);
         } else {
            // console.log(responseData);
            authCtx.updateUser(responseData)
         }
      } catch (error) {
         console.log(error.message);
      }
    }
  
    function keyPress(key) {
    //   console.log('Play press: ', key);
      setWord(key);
    }
   function win() {
    setScore(prev => +prev + (5-errors)*100);
    setWinGame(true);
    UpdatePlayerScore(+score + (5-errors)*100);
   }
   function lost() {
     if (score < 100) {
       setScore(0)
       UpdatePlayerScore(0);
     } else {
       setScore(prev => prev - 100);
       UpdatePlayerScore(+score - 100);
     }
    setWinGame(true);
    
   }
  
   function TryNewWord() {
    setWinGame(false);
    setErrors(0);
   }
    
  
   function addError(nr) {
     setErrors(nr);
   }

  return (
    <Card>
       <TopInfoBar getScore={score}></TopInfoBar>
       <HangedMan errors={errors}></HangedMan>
       <WordWindow newWord={word} win={win} lost={lost} newGame={winGame} addError={addError}></WordWindow>
       <GameControllers keyPress={keyPress} gameWon={winGame} TryNewWord={TryNewWord}></GameControllers>
     </Card>
  )
}

export default GamePage