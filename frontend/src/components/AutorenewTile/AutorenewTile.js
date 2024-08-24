import React from 'react'
import "./AutorenewTile.css"
import { usePageContext } from '../../context/PageContext'
import {getDomainInfo,createSubscriptionAndUserSession} from "../../services/message.service" 
import { useAuth0 } from "@auth0/auth0-react"

const AutorenewTile = ({buffering}) => {
    const { user, getAccessTokenSilently } = useAuth0()
    const serviceFee = .1
    const [,dispatch] = usePageContext()

    const newPageData = JSON.parse(localStorage.getItem('newPageData'))

    const handleClick = async ()=> {
        if(buffering)
            return

        const accessToken = await getAccessTokenSilently()
        
        //console.log(newPageData)

        const domainInfo = await getDomainInfo(accessToken, newPageData.Domain)
        //console.log(domainInfo.data)

        let itemRenewalPrice = domainInfo.data.renewalPrice + (domainInfo.data.renewalPrice*serviceFee)
        itemRenewalPrice = itemRenewalPrice.toFixed(2)

        let pageData = {
            ...newPageData, 
            'AutorenewProcessing': true
        }

        localStorage.setItem('newPageData', JSON.stringify(pageData))

        createSubscriptionAndUserSession(accessToken, domainInfo.data.domainName, itemRenewalPrice, domainInfo.data.renewalPrice, user.email, false)
    }
    
    return(
        <div className="autorenew-tile">
             <h1>Set up your autorenewal subscription</h1>
              <div>  
                    <button onClick = {()=> handleClick()}>{buffering ? "Processing..." : "Ok"}</button>
                    {/*<button onClick = {handleNo}>No</button>*/}
              </div>
        </div>
    );
}
export default  AutorenewTile;