import { useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react"

import "./PriceTile.css";

import { createUserSession } from '../../services/message.service';
import { usePageContext } from "../../context/PageContext" 

const PricePageTile = (props) =>{
    const { getAccessTokenSilently } = useAuth0()
    const [selectedPlan, setSelectedPlan] = useState(null)
   
    const { email, monthlyPriceID, yearlyPriceID, pageID } = props

    const handleClick = async () => {
        const accessToken = await getAccessTokenSilently()

        const priceID = selectedPlan == "yearly" ? yearlyPriceID : monthlyPriceID

        createUserSession(accessToken, email, priceID, pageID)
    } 

    return(
        <div className={props.theme}>
            <h2>{props.title1}</h2>
            <p>{props.text1}</p>
 
            <h2>{selectedPlan == "yearly" ? props.yearlyPrice : props.monthlyPrice}</h2>

            <select className="price-dropdown" onChange={(e) => setSelectedPlan(e.target.value)} value={selectedPlan}>
                <option value="monthly">{props.monthlyPrice + " / Month"}</option>
                <option value="yearly">{props.yearlyPrice + " / Year"}</option>
            </select>

            <p>{`Per website, ${selectedPlan}`}</p>
            <button onClick={() => handleClick()}>
                {props.button_text}
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
export default PricePageTile;