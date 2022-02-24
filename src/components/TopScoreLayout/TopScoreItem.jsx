import React from 'react'
import mod from './TopScore.module.css'

function TopScoreItem(props) {
    // console.log(props);
  return (
    <div className={mod.info}>
        <div className={mod.place}>{props.place}</div>
        <div className={mod.playerName}>{props.name}</div>
        <div className={mod.typeValue}>{props.type}</div>
    </div>
  )
}

export default TopScoreItem