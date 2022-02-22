import React, { useEffect, useState } from "react";
import mod from "./HangMan.module.css";

function HangedMan(props) {
   const [head, setHead] = useState(false);
   const [body, setBody] = useState(false);
   const [hands, setHands] = useState(false);
   const [legs, setLegs] = useState(false);

    useEffect(()=>{

        if ( props.errors === 0) {
            setHead(false);
            setBody(false);
            setHands(false);
            setLegs(false);
        }
        if ( props.errors === 1) {
            setHead(true);
        }
        if ( props.errors === 2) {
            setBody(true);
        }
        if ( props.errors === 3) {
            setHands(true);
        }
        if ( props.errors === 4) {
            setLegs(true);
        }
        if ( props.errors === 5) {
            setLegs(true);
        }
    },[props.errors])

   return (
      <div className={mod.HangedMan}>
         <div className={mod.HMerrors}>{props.errors}</div>
         <div className={mod.hangTower}>
            <div className={mod.armA}></div>
            <div className={mod.armB}></div>
            <div className={mod.armC}></div>
            <div className={mod.armD}></div>
            {head && <div className={ props.errors === 5 ? mod.headEnd:mod.head}></div>}
            {body && <div className={mod.body}></div>}
            {hands && (
               <div>
                  <div className={mod.handR}></div>
                  <div className={mod.handL}></div>
               </div>
            )}
            {legs && (
               <div>
                  <div className={mod.legR}></div>
                  <div className={mod.legL}></div>
               </div>
            )}
         </div>
      </div>
   );
}

export default HangedMan;
