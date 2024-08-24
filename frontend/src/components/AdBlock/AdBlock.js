import React from 'react'
import '../../index.css'

// Components
import ImageBlock from '../../components/ImageBlock/ImageBlock'
import './AdBlock.css'

const AdBlock = (props) => {

  return (
      <div className="ad-block">
        <h3>{props.phrase}</h3>
        <div className="image-container">
          <ImageBlock imgSrc={props.imgsrc} />
        </div>
      </div>
  )
}

export default AdBlock