// Get started page
import React from 'react'
import './Start.css'
import FormBlock from "../../components/FormBlock/FormBlock"
import AdBlock  from "../../components/AdBlock/AdBlock"
const ImageSource = "TemplatesGraphic.png"
const AdSlogan="Choose from one of our many templates!"

const Start = () => {
  return (
    <div className="split-section" id="start">
        <div className="block">
          <FormBlock/>
        </div>
        <div className="block">
          <AdBlock phrase={AdSlogan} imgsrc={ImageSource}/>
        </div>
      </div>
  )
}

export default Start