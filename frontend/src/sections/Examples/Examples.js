import React from 'react'
import '../../index.css'

// Components
import TextBanner from '../../components/TextBanner/TextBanner'
import ImageTile from '../../components/ImageTile/ImageTile'

// Text Banner props
const Slogan = "Take a Look at the Possibilities"

// Image Tile props
const ExamplePage = "Example Page"
const ImageSource = "https://mobirise.com/assets52/images/features1.jpg"

const temp1 = "Template1.png"
const temp2 = "Template2.png"
const temp3 = "Template3.png"
const temp4 = "Template4.png"
const temp5 = "Template5.png"
const temp6 = "Template6.png"
const temp7 = "Template7.png"
const temp9 = "Template9.png"
const temp10 = "Template10.png"
const temp11 = "Template11.png"
const temp12 = "Template12.png"
const temp13 = "Template13.png"
const temp14 = "Template14.png"
const temp15 = "Template15.png"

const Examples = () => {

  return (
    <div className="image-section-container">
      <div className="image-section">
        <TextBanner type="dark-textbanner" slogan={Slogan}/>
          <div className="block">
            <ImageTile whereto={ExamplePage} imgsrc={temp7} />
            <ImageTile whereto={ExamplePage} imgsrc={temp5} />
          </div>
          <div className="block">
            <ImageTile whereto={ExamplePage} imgsrc={temp2} />
            <ImageTile whereto={ExamplePage} imgsrc={temp4} />
          </div>
          <div className="block">
            <ImageTile whereto={ExamplePage} imgsrc={temp3} />
            <ImageTile whereto={ExamplePage} imgsrc={temp1} />
          </div>
          <div className="block">
            <ImageTile whereto={ExamplePage} imgsrc={temp12} />
            <ImageTile whereto={ExamplePage} imgsrc={temp6} />
            <ImageTile whereto={ExamplePage} imgsrc={temp9} />
          </div>
          <div className="block">
            <ImageTile whereto={ExamplePage} imgsrc={temp10} />
            <ImageTile whereto={ExamplePage} imgsrc={temp14} />
          </div>
          <div className="block">
            <ImageTile whereto={ExamplePage} imgsrc={temp11} />
            <ImageTile whereto={ExamplePage} imgsrc={temp15} />
          </div>
      </div>
    </div>
    )
}

export default Examples