import React, { useEffect, useState } from "react";
import mod from "./Game.module.css";
import Button from "../Buttons/Button";

function GameControllers(props) {
    const [gameWon, setGameWon] = useState(false);
   let lettersArr = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
   function showLetter(e) {
      props.keyPress(e.target.innerText);
   }

   function TryNewWord() {
    props.keyPress(' ');
    setGameWon(false);
    props.TryNewWord();
   }

   

   useEffect(()=>{
    setGameWon(props.gameWon);
   },[props.gameWon])

   return (
      <div className={mod.GameControllers}>
       {!gameWon && lettersArr.map((element) => {

            return (
               <Button key={Math.random()} onClick={showLetter} className={mod.ctrlBtn}>
                  {element}
               </Button>
            );
         })}  
       {gameWon && <Button onClick={TryNewWord}>New Word</Button>}  
  
      </div>
   );
}

export default GameControllers;
