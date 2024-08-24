import React from 'react'
//import '../index.css'
import './TemplatesPage.css'

// Components
import TextBanner from '../components/TextBanner/TextBanner'
import Navbar from '../components/Navbar/Navbar'
import StyleTile from '../components/StyleTile/StyleTile'


// Image Tile props
const StyleSlogan = "Choose the Style of Your Website" 
const StyleSubSlogan = "(The colors and text can be adjusted on every template)" 
const ImageSource = "chillimg.png"


// SaaS product website
const Image1 = "SaaSTemplate.png"
const Title1 = 'SaaS Product Website'
const Description1 = 'Incudes waitlist widget, pricing and more.'

// Playful template
const Image2 = "PlayfulTemplate.png"
const Title2 = 'Playful Template'
const Description2 = 'Includes Contact Us form.'

// Realtor & Landscaper showcase template
const Image3 = "LandscapeTemplate.png"
const Title3 = 'Realtor & Landscaper Template'
const Description3 = 'Includes Contact Us form.'

// Agency template
const Image4 = "AgentTemplate.png"
const Title4 = 'Agency Template'
const Description4 = 'Includes Contact Us form.'

// Design focused Website
const Image5 = "DesignTemplate.png"
const Title5 = 'Design Focused Website'
const Description5 = 'Includes Contact Us widget, image gallery and more.'

// Product template
const Image6 = "ProductTemplate.png"
const Title6 = 'Product Template'
const Description6 = 'A marketing page for your product or store'

// Image focused website
const Image7 = 'ImageTemplate.png'
const Title7 = 'Image Focused Website'
const Description7 = 'Includes Contact Us widget, image gallery and more.'

// Service company website
const Image8 = 'ServiceTemplate.png'
const Title8 = 'Service Company Website'
const Description8 = 'Includes Contact Us form.'



const TemplatesPage = () => {

  return (
    <div className="style">
      <Navbar/>
      <TextBanner slogan={StyleSlogan} subslogan={StyleSubSlogan} type="light-textbanner" />  
      <div className="templates">
          <div className="templates-block">
            <StyleTile imgsrc={Image1} templatetitle={Title1} tidbit={Description1} selectedstyle={Title1}/>  
          </div>
          <div className="templates-block">
            <StyleTile imgsrc={Image2} templatetitle={Title2} tidbit={Description2} selectedstyle={Title2}/>
          </div>
          <div className="templates-block">
            <StyleTile imgsrc={Image3} templatetitle={Title3} tidbit={Description3} selectedstyle={Title3}/>
          </div>
          <div className="templates-block">
            <StyleTile imgsrc={Image4} templatetitle={Title4} tidbit={Description4} selectedstyle={Title4}/>
          </div>
          <div className="templates-block">
            <StyleTile imgsrc={Image5} templatetitle={Title5} tidbit={Description5} selectedstyle={Title5}/>
          </div>
          <div className="templates-block">
            <StyleTile imgsrc={Image6} templatetitle={Title6} tidbit={Description6} selectedstyle={Title6}/>
          </div>
          <div className="templates-block">
            <StyleTile imgsrc={Image7} templatetitle={Title7} tidbit={Description7} selectedstyle={Title7}/>
          </div>
          <div className="templates-block">
            <StyleTile imgsrc={Image8} templatetitle={Title8} tidbit={Description8} selectedstyle={Title8}/>
          </div>
      </div>
    </div>
  )
}

export default TemplatesPage