// How it works section
import React from 'react';
import './Tutorial.css';
import TextTile from '../../components/TextTile/TextTile';
import ThickBanner from '../../components/ThickBanner/ThickBanner';

const Slogan = "How It Works";
const SubSlogan = "A Straight forward And Streamlined Workflow";

const Title1="Enter Business Info";
const Text1_1="Tell us the name of your company, what your company does, and purchase your Domain";
const Text1_2="Our team will generate a website tailored to your business";

const Title2="Choose A Template";
const Text2_1="Start with one of our sleek and eye catching templates built with SEO in mind";
const Text2_2="Work with our team to make quick changes and personalize the selected template to fit your vision";

const Title3="Launch Your Website";
const Text3_1="Once your website is built within 24 hours, we will publish the site and keep you updated";
const Text3_2="All websites are automatically hosted on secure servers with fast loading times, ensuring optimal performance for your customers";

const Tutorial = () => {
  return (
    <div className="how-it-works-section" id="tutorial">
      <div className="grid-section">
        <ThickBanner className="top" slogan={Slogan} subslogan={SubSlogan}/>
        <div className="clear-section bottom">
          <div className="block">
            <TextTile type="text-space-light" title={Title1} firsttext={Text1_1} secondtext={Text1_2} />
          </div>
          <div className="block">
           <TextTile type="text-space-light" title={Title2} firsttext={Text2_1} secondtext={Text2_2} />
          </div>
          <div className="block">
            <TextTile type="text-space-light" title={Title3} firsttext={Text3_1} secondtext={Text3_2} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tutorial