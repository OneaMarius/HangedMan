import React, { useEffect, useState } from "react";
import mod from "./Game.module.css";

function WordWindow(props) {

   const [WORD, setWORD] = useState("New Game");
   const [errorNr, setErrorNr] = useState(-1);
   const [myWord, setMyWord] = useState(props.DB[Math.floor(Math.random()*(props.DB.length))]);
   const [gameOver, setGameOver] = useState(true);
 

   let finalWord = "";
   let firstLetter = "";
   let lastLetter = "";
   let wordArr = [];
   let correctLetter = false;
   

   for (let index = 0; index < myWord.length; index++) {
     
      if (index === 0) {
         finalWord = myWord[0].toUpperCase();
         firstLetter = myWord[0].toUpperCase();
         lastLetter = myWord[myWord.length - 1].toUpperCase();
      } else {
         if (myWord[index].toUpperCase() === firstLetter.toUpperCase() || myWord[index].toUpperCase() === lastLetter.toUpperCase()) {
            finalWord += myWord[index].toUpperCase();
         } else {
            finalWord += "_";
         }
      }
   }

   function reword() {
      for (let index = 0; index < myWord.length; index++) {
         if (index === 0) {
            finalWord = myWord[0].toUpperCase();
            firstLetter = myWord[0].toUpperCase();
         } else {
            if (myWord[index].toUpperCase() === firstLetter.toUpperCase()) {
               finalWord += myWord[index].toUpperCase();
            } else {
               finalWord += "_";
            }
         }
      }
      setErrorNr(0);
   
   }

   useEffect(() => {
      if (WORD !== "" && !gameOver) {
         finalWord = WORD;
      }
      setGameOver(false);
      correctLetter = false;
      let checkLetter = props.newWord;
    
      for (let i = 0; i < myWord.length; i++) {
     
         wordArr[i] = finalWord[i];
         if (myWord[i].toUpperCase() === checkLetter.toUpperCase()) {
            wordArr.splice(i, 1, checkLetter.toUpperCase());
            correctLetter = true;
         }
      }
     
      finalWord = "";
      wordArr.forEach((el) => (finalWord += el));
      setWORD(finalWord);

      if (!correctLetter && props.newWord !== " ") {
         setErrorNr((prev) => +prev + 1);
         props.addError(errorNr + 1);
         if (errorNr === 0) {
            props.gameStart();
         }
         if (errorNr + 1 === 5) {
            setWORD("YOU LOST");
            setGameOver(true);
            props.lost();
            setErrorNr(0);
            setMyWord(props.DB[Math.floor(Math.random()*(props.DB.length))]);
            reword();
         }
      }

      if (wordArr.findIndex((el) => el === "_") === -1) {
         setWORD("YOU WIN");
         setGameOver(true);
         props.win();
         setMyWord(props.DB[Math.floor(Math.random()*(props.DB.length))]);
         reword();
      }
     
   }, [props.newWord]);

   return  <div  className={mod.WordWindow}><div>{WORD}</div></div>  ;
}

export default WordWindow;
