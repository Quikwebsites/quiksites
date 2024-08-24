import React from 'react'
import './Pricing.css'


import TextBanner from '../../components/TextBanner/TextBanner'
import PriceTile from '../../components/PriceTile/PriceTile'
const Slogan = "Available Plans";
const SubSlogan = "Choose From Competitve Pricing Options That Will Meet Whatever Your Needs May Be";

const FirstTitle="Basic";
const FirstText ="Perfect Set Up For A New Business";
const FirstPrice = "$69.99";
const FirstRate ="Per Website, Per Month";
const FirstBtnTxt = "Select & Get Started";
const FirstPt1 = "Free website";
const FirstPt2 = "Unlimited revisions";
const FirstPt3 = "Built in 24 hours or less";
const FirstPt4 = "Basic hosting fee";
const FirstPt5 = "Domain auto renews yearly"

const SecondTitle="Premium";
const SecondText ="Perfect Set Up For Professionals And Small Companies";
const SecondPrice  = "$99.99";
const SecondRate ="Per Website, Per Month";
const SecondBtnTxt = "Select & Get Started";
const SecondPt1 = "All basic features";
const SecondPt2 = "Optimized on page SEO";
const SecondPt3 = "Meta data adjustments";
const SecondPt4 = "Page rank optimization";

const Pricing = () => {
  return (
    <div className="pricing-section-home" id="pricing">
        <TextBanner type="light-textbanner"slogan={Slogan} subslogan={SubSlogan}/>
        
        <div className="pricing-section-block">
          <PriceTile theme="light" title1={FirstTitle} text1={FirstText} price={FirstPrice} text2={FirstRate} button_text={FirstBtnTxt} point1={FirstPt1} point2={FirstPt2} point3={FirstPt3} point4={FirstPt4} point5={FirstPt5}/>
        </div>
        <div className="pricing-section-block">
          <PriceTile theme="dark" title1={SecondTitle} text1={SecondText} price={SecondPrice} text2={SecondRate} button_text={SecondBtnTxt} point1={SecondPt1} point2={SecondPt2} point3={SecondPt3} point4={SecondPt4}/>
        </div>
    </div>
  )
}

export default Pricing