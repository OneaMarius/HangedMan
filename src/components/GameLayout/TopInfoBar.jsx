import React, { useEffect, useState } from 'react'
import mod from "./Game.module.css";

function TopInfoBar(props) {
    const [score, setScore] = useState(0);  
    useEffect(()=> {
        setScore(props.getScore)
    },[props.getScore])
  return (
    <div className={mod.TopInfoBar}><div className={mod.score}>{score}</div></div>
  )
}

export default TopInfoBar