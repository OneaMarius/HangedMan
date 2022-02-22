import React, { useEffect, useState } from "react";
import mod from "./Game.module.css";

function WordWindow(props) {
   const wordsDB = [
      "marius",
      "cosmin",
      "adelina",
      "george",
      "dumitru",
      "vasile",
   ];
   const [WORD, setWORD] = useState("");
   const [errorNr, setErrorNr] = useState(-1);
   const [myWord, setMyWord] = useState(wordsDB[Math.floor(Math.random()*(wordsDB.length))]);
   const [gameOver, setGameOver] = useState(false);
   const [loading, setLoading] = useState(true);
   const [wordDB, setWordDB] = useState([]);

   useEffect(() => {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/words/all`)
         .then((response) => response.json())
         .catch((err) => err.message)
         .then((data) => {
            console.log(data.wordList);
            setWordDB(()=>{
               let DB = data.wordList;
               let wordDB = DB.map(word => word.word);
               return wordDB;
            })

            setLoading(false);
            
         });
   }, []);


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
         if (errorNr + 1 === 5) {
            setWORD("YOU LOST");
            setGameOver(true);
            props.lost();
            setErrorNr(0);
            setMyWord(wordDB[Math.floor(Math.random()*(wordDB.length))]);
            reword();
         }
      }

      if (wordArr.findIndex((el) => el === "_") === -1) {
         setWORD("YOU WIN");
         setGameOver(true);
         props.win();
         setMyWord(wordDB[Math.floor(Math.random()*(wordDB.length))]);
         reword();
      }
     
   }, [props.newWord]);

   return  <div  className={mod.WordWindow}>{!loading && <div>{WORD}</div>}</div>  ;
}

export default WordWindow;
