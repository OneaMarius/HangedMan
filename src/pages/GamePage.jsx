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
    const [wordDB, setWordDB] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/words/all`)
         .then((response) => response.json())
         .catch((err) => err.message)
         .then((data) => {
            // console.log(data.wordList);
            setWordDB(()=>{
               let DB = data.wordList;
               let wordDB = DB.map(word => word.word);
               return wordDB;
            })

            setLoading(false);
           
         });
   }, []);

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
    setWinGame(true);
   }

   function gameStart() {
      if (score < 100) {
         setScore(0)
         UpdatePlayerScore(0);
       } else {
         setScore(prev => prev - 100);
         UpdatePlayerScore(+score - 100);
       }
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
       {!loading && <WordWindow DB={wordDB} newWord={word} win={win} lost={lost}  gameStart={gameStart}  newGame={winGame} addError={addError}></WordWindow>} 
       <GameControllers keyPress={keyPress} gameWon={winGame} TryNewWord={TryNewWord}></GameControllers>
     </Card>
  )
}

export default GamePage