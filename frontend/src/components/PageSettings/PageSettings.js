import React, { useState, useEffect } from 'react';
import SettingNav from "../SettingNav/SettingNav"
import GenSet from "../GenSet/GenSet"
import DomSet from "../DomSet/DomSet"
import DelSet from "../DelSet/DelSet"
import DelConfirm from "../DelConfirm/DelConfirm"
import AutorenewSet from '../AutorenewSet/AutorenewSet'
import PricingPage from "../../pages/PlansPage"
import PlanChange from "../../sections/PlanChange/PlanChange"
import { useAuth0 } from "@auth0/auth0-react"

import "./PageSettings.css"

import {usePageContext} from "../../context/PageContext"

import { getUserSubscriptionType } from '../../services/message.service'

const PageSettings = ()=> {
    const [subscriptionType, setSubscriptionType] = useState(null)
    const [{sub_page}, dispatch] = usePageContext();
    const { user, getAccessTokenSilently } = useAuth0()

    const userEmail = user.email
    
    const getSubscriptionType = async () => {
        const accessToken = await getAccessTokenSilently()
        const { data, error } = await getUserSubscriptionType(accessToken, userEmail)

        // Todo - get current subscription type and update that value
        setSubscriptionType(data.subscriptionType)
    }
    
    useEffect(() => {
        getSubscriptionType()
    }, [])

    const onBackClick = () => {
        dispatch({
            type: "SET_PAGE",
            page: "user",
          });
        window.scrollTo(0,0)
    }
    
    return(
        <div className = "clear-section">
            <div className = "page-settings" >
                <div className="plans-header">
                    <h2>Page Title</h2>
                    <button onClick={onBackClick}>Go Back</button>
                </div>
                <SettingNav />
                {sub_page == "PlanSet" ? (
                    (subscriptionType == "none" ? (
                        <PricingPage />
                    ) : 
                    (subscriptionType == "basic-monthly" 
                    || subscriptionType == "basic-yearly"
                    || subscriptionType == "premium-monthly"
                    || subscriptionType == "premium-yearly") ? (
                        <PlanChange currentPlan={subscriptionType}/>                      
                    ) : 
                    (
                        <div className="empty"></div>)
                    )
                ):sub_page == "DelSet" ? (
                    <DelSet />
                ):sub_page == "DelConfirm" ? (
                    <DelConfirm />
                ):sub_page == "AutorenewSet" ? (
                    <AutorenewSet />
                ) : (
                    <h1>Error-Subpage incorrect</h1>
                )}
            </div>
        </div>
    )
}
export default PageSettings