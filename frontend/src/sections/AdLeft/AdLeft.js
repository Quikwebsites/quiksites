import React from 'react'
import '../../index.css'
import './AdLeft.css'

import PrivacyPolicy from '../PrivacyPolicy/PrivacyPolicy'

import GetStartedPromptBlock from "../../components/GetStartedPromptBlock/GetStartedPromptBlock"
import AdBlock from '../../components/AdBlock/AdBlock'

const TextBodyTitle = "Get your dream website!"
const TextBodyParagraph = "Don't spend hundreds or thousands of dollars on a new website. Get yours built with flexibility and your needs put first.";
const ButtonText = "Get Started";
const ScrollDestination = "ad1"

const ImageSource = "https://mobirise.com/assets52/images/features1.jpg"
const AdSlogan="Get your website in 24 hours or less!"


const AdLeft = () => {
  return (
    <div className="ad-left"> 
      <div className="split-section" id="ad2">
          <div className="block">
            <AdBlock imgsrc={ImageSource} phrase={AdSlogan}/>
          </div>
          <div className="block">
            <GetStartedPromptBlock title={TextBodyTitle} body={TextBodyParagraph} buttonText={ButtonText} scrollTo={ScrollDestination}/>
          </div>
      </div>
      <div className="policy">
        <PrivacyPolicy />
      </div>
    </div>
  )
}

export default AdLeft