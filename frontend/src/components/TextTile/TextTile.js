import React from 'react'
import './TextTile.css'

const TextTile = (props) => {
  return (
    <div className="text-tile" >
        <h2>{props.title}</h2>
        <div className={props.type}>
          <div className="text-container">
            <p>{props.firsttext}</p>
            <img src={'GreenLogo.png'}></img>
            <p>{props.secondtext}</p>
          </div>
        </div>
    </div>
  )
}

export default TextTile