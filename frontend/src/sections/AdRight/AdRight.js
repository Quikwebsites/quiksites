import React from 'react'
import '../../index.css'

import GetStartedPromptBlock from "../../components/GetStartedPromptBlock/GetStartedPromptBlock"
import AdBlock from '../../components/AdBlock/AdBlock'

const TextBodyTitle = "Some Catchy Marketing Point"
const TextBodyParagraph = "Something that you would say about said marketing point. Using words that are both convincing and enticing to get the customer thinking about why they need the product.";
const ButtonText = "Get Started";
const ScrollDestination = "ad2"

const ImageSource = "https://mobirise.com/assets52/images/features1.jpg"
const AdSlogan="This Gif Shows Something"


const AdRight = () => {
  return (
    <div className="split-section" id="ad1">
        <div className="block">
          <GetStartedPromptBlock title={TextBodyTitle} body={TextBodyParagraph} buttonText={ButtonText} scrollTo={ScrollDestination}/>
        </div>
        <div className="block">
          <AdBlock imgsrc={ImageSource} phrase={AdSlogan}/>
        </div>
    </div>
  )
}

export default AdRight