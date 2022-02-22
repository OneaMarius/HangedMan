import React, { useState } from "react";
import Card from "./components/Cards/Card";
import TopInfoBar from "./components/GameLayout/TopInfoBar";
import HangedMan from "./components/GameLayout/HangedMan";
import WordWindow from "./components/GameLayout/WordWindow";
import GameControllers from "./components/GameLayout/GameControllers";


function App() {

  const [word, setWord] = useState('');
  const [score, setScore] = useState(0);
  const [winGame, setWinGame] = useState(false);
  const [errors, setErrors] = useState(0);


  function keyPress(key) {
    console.log('Play press: ', key);
    setWord(key);
  }
 function win() {
  setScore(prev => prev + (5-errors)*100);
  setWinGame(true);
  console.log("merge win", winGame);
 }
 function lost() {
   if (score < 100) {
     setScore(0)
   } else {
     setScore(prev => prev - 100);
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
   
   );
}

export default App;
