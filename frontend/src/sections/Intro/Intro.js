import React from 'react'
import '../../index.css'

// Components
import GetStartedPromptBlock from '../../components/GetStartedPromptBlock/GetStartedPromptBlock'
import ImageBlock from '../../components/ImageBlock/ImageBlock'
import ImageTile from '../../components/ImageTile/ImageTile'

const Intro = () => {

  // Block prop definitions
  const TextBodyTitle = "Get Your Dream Website In 24 Hours With Our AI Powered Platform"
  const TextBodyParagraph = `Elevate your online presence with our expert web developers and AI. We craft compelling 
                            website copy and select from millions of high quality images and videos. Our seamless blend of 
                            professional skill and AI innovation brings your dream website to life with precision and creativity,
                            all within 24 hours.`
  const ButtonText = "Get Started"

  //const ImageSource = "https://mobirise.com/assets52/images/features1.jpg"
  const ImageSource = "IntroGraphic.png"

  const ScrollDestination = "start"

  return (
      <div className="split-section-graphic">
        <div className="block">
          <GetStartedPromptBlock title={TextBodyTitle} body={TextBodyParagraph} buttonText={ButtonText} scrollTo={ScrollDestination}/>
        </div>
        <div className="block">
          <ImageBlock imgSrc={ImageSource} />
        </div>
      </div>
  )
}

export default Intro

//<VideoBlock vidSrc={VideoSource}/>