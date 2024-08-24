// Explain why customer needs to use our website
import React from 'react'
import './Argument.css'

// Components
import TextBanner from '../../components/TextBanner/TextBanner'
import TextTile from '../../components/TextTile/TextTile'

// Text Banner props
const Slogan = "Why us?"
const SubSlogan = "We are the competitive edge"

// Left Text Tile props
const LeftTitle = "Tell Us About You"
const LeftFirstText = "Telling us your goals and background will allow our experts to get to work"
const LeftSecondText = "Our team has marketing and industry experience that will help you create a website that touches your intended audience"

// Right Text Tile props
const RightTitle = "Set and Forget"
const RightTitleFirstText = "We know how intensive managing a company can be. Let this part of the process for your website be one less thing to worry about"
const RightTitleSecondText = "Once your website is up and running, we'll take care of all the maintenance for you: keeping up to date with the ever changing internet landscape"

// Center Text Tile props
const CenterTitle = "Tailored Experience"
const CenterTitleFirstText = "Using the power of AI, we will customize your website until it meets your requirements"
const CenterTitleSecondText = "Our team is working around the clock to ensure the highest degree of ease and professionalism when making adjustments to your website"


const Argument = () => {
  return (
    <div className="argument-section">
        <TextBanner type="light-textbanner" slogan={Slogan} subslogan={SubSlogan}/>
        
        <div className="block">
          <TextTile type="text-space-light" title={LeftTitle} firsttext={LeftFirstText} secondtext={LeftSecondText}/>
        </div>
        <div className="block">
          <TextTile type="text-space-light" title={CenterTitle} firsttext={CenterTitleFirstText} secondtext={CenterTitleSecondText}/>
        </div>
        <div className="block">
          <TextTile type="text-space-light" title={RightTitle} firsttext={RightTitleFirstText} secondtext={RightTitleSecondText}/>
        </div>
    </div>
  )
}

export default Argument