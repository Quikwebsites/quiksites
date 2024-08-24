import React from 'react'

import './ImageBlock.css'

const ImageBlock = (props) => {
  return (
    <div className="image-block">
        <img src={props.imgSrc}></img>
    </div>
  )
}

export default ImageBlock