import { useState, useEffect } from 'react'
import { useAuth0 } from "@auth0/auth0-react"

import "./ChangePlanTile.css";

import { createUserSession } from '../../services/message.service';
import { usePageContext } from "../../context/PageContext" 

import { changeUserPlanRequest, getActiveUserWebpage } from '../../services/message.service'

const ChangePlanTile = (props) =>{
    const [selectedPlan, setSelectedPlan] = useState(null)
    const { getAccessTokenSilently } = useAuth0()
    const [buttonText, setButtonText] = useState("")
    const [, dispatch] = usePageContext();
   
    const { email, monthlyPriceID, yearlyPriceID, pageID } = props

    const subscriptionType = (props.currentPlan == "basic-monthly" || props.currentPlan == "basic-yearly") ? "basic" : "premium"
    const subscriptionPeriod = (props.currentPlan == "basic-monthly" || props.currentPlan == "premium-monthly") ? "monthly" : "yearly"
        
    const handleClick = async () => {

        const priceID = subscriptionPeriod == "yearly" ? yearlyPriceID : monthlyPriceID

        // Selecting the current plan does nothing
        if(props.tileType == subscriptionType)
           return

        const accessToken = await getAccessTokenSilently()

        await changeUserPlanRequest(accessToken, email, props.tileType)
        
        dispatch({
            type: "SET_PAGE",
            page: "user",
          });
        window.scrollTo(0,0)
        
        alert('Your plan change request has been submitted successfully! Our staff will get you transferred.')
        
    } 

    useEffect(() => {

        if(props.tileType == subscriptionType)
        {
            setButtonText("Your current plan")
        }
        else
        {
            setButtonText("Change your plan?")
        }

    }, [])

    return(
        <div className={props.tileType == subscriptionType ? "change-plan-tile-selected" : "change-plan-tile-unselected"}>
            <h2>{props.title1}</h2>
            <p>{props.text1}</p>
 
            <h2>{subscriptionPeriod == "yearly" ? props.yearlyPrice : props.monthlyPrice}</h2>

            {/*
            <select className="price-dropdown" onChange={(e) => setSelectedPlan(e.target.value)} value={selectedPlan}>
                <option value="monthly">{props.monthlyPrice + " / Month"}</option>
                <option value="yearly">{props.yearlyPrice + " / Year"}</option>
            </select>
            */}

            <p>{`Per website, ${subscriptionPeriod}`}</p>
            <button onClick={() => handleClick()}>
                {buttonText}
            </button>
            <ul>
            {props.point1?(<li>
                    {props.point1}
                </li>):null}
                {props.point2?(<li>
                    {props.point2}
                </li>):null}
                {props.point3?(<li>
                    {props.point3}
                </li>):null}
                {props.point4?(<li>
                    {props.point4}
                </li>):null}
                {props.point5?(<li>
                    {props.point5}
                </li>):null}
            </ul>
        </div>
    );
}
export default ChangePlanTile;