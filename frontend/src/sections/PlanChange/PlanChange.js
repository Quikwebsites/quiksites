import React from 'react'
import { useAuth0 } from "@auth0/auth0-react"
import './PlanChange.css'
import '../../index.css'

import TextBanner from '../../components/TextBanner/TextBanner'
import ChangePlanTile from '../../components/ChangePlanTile/ChangePlanTile'
const Slogan = "Choose a Plan";
const SubSlogan = "Choose From Competitve Pricing Options That Will Meet Whatever Your Needs May Be";

const FirstTitle="Basic";
const FirstMonthlyPriceID = "price_1Pqhk4LFFDwzFn13cbShyHjR"
const FirstYearlyPriceID = "price_1Pqhk4LFFDwzFn130MqFiqLx"
const FirstText ="Perfect Set Up For A New Business";
const FirstMonthlyPrice = "$69.99";
const FirstYearlyPrice = "$699.99";
const FirstRate ="Per Website, Per Month";
const FirstBtnTxt = "Select & Get Started";
const FirstPt1 = "Free Website";
const FirstPt2 = "Unlimited Revisions";
const FirstPt3 = "Created in 24 hrs or less";
const FirstPt4 = "Basic hosting fee";

const SecondTitle="Premium";
const SecondMonthlyPriceID = "price_1PqhkKLFFDwzFn13praxrtI6"
const SecondYearlyPriceID = "price_1PqhkJLFFDwzFn132MkTz9wh"
const SecondText ="Perfect Set Up For Professionals And Small Companies";
const SecondMonthlyPrice  = "$99.99";
const SecondYearlyPrice  = "$999.99";
const SecondRate ="Per Website, Per Month";
const SecondBtnTxt = "Select & Get Started";
const SecondPt1 = "All basic features";
const SecondPt2 = "Optimized on page SEO";
const SecondPt3 = "Meta information";
const SecondPt4 = "Higher page rank";

// This page will only be accessible once a user is logged in
const PlanChange = ({ currentPlan }) => {
    const { user } = useAuth0()

    const userEmail = user.email
    //const userEmail = "test51@email.com"

    return (
        <div className="pricing-section" id="pricing">
            <TextBanner type="light-textbanner"slogan={Slogan} subslogan={SubSlogan}/>
            
            <div className="pricing-block">
            <ChangePlanTile 
                theme="light" 
                title1={FirstTitle} 
                monthlyPriceID={FirstMonthlyPriceID}
                yearlyPriceID={FirstYearlyPriceID}
                email={userEmail}
                text1={FirstText} 
                monthlyPrice={FirstMonthlyPrice} 
                yearlyPrice={FirstYearlyPrice}
                text2={FirstRate} 
                button_text={FirstBtnTxt} 
                point1={FirstPt1} 
                point2={FirstPt2} 
                point3={FirstPt3} 
                point4={FirstPt4}
                currentPlan={currentPlan} 
                tileType={"basic"} 
            />
            </div>
            <div className="pricing-block">
            <ChangePlanTile 
                theme="light" 
                title1={SecondTitle} 
                text1={SecondText} 
                monthlyPriceID={SecondMonthlyPriceID}
                yearlyPriceID={SecondYearlyPriceID}
                email={userEmail}
                monthlyPrice={SecondMonthlyPrice} 
                yearlyPrice={SecondYearlyPrice} 
                text2={SecondRate} 
                button_text={SecondBtnTxt} 
                point1={SecondPt1} 
                point2={SecondPt2} 
                point3={SecondPt3} 
                point4={SecondPt4}
                currentPlan={currentPlan} 
                tileType={"premium"}
            />
            </div>
        </div>
    )
}

export default PlanChange