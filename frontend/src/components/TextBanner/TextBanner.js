import React from 'react'
import './TextBanner.css'

const TextBanner = (props) => {
  return (
    <div className={props.type} id="textbanner">
        <h1>{props.slogan}</h1>
        <div className="highlight">{props.subslogan}</div>
    </div>
  )
}

export default TextBanner