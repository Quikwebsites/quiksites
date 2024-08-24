import React, { useState } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import { createProductAndUserSession } from '../../services/message.service';

import "./SearchItem.css"

const serviceFee = .1

const SearchItem = ({ item }) => {
    const { user, getAccessTokenSilently } = useAuth0()
    let itemPrice = item.purchasePrice + (item.purchasePrice * serviceFee)
    itemPrice = itemPrice.toFixed(2)
    let itemRenewalPrice = item.renewalPrice + (item.renewalPrice * serviceFee)
    itemRenewalPrice = itemRenewalPrice.toFixed(2)

    const [numClicks, setNumClicks] = useState(0)
    
    //console.log(item.domainName)
    //console.log(item.purchasePrice)

    const handleClick = async ()=> {

        if(numClicks == 0)
        {
            setNumClicks(1)
            return
        }
        // If numClicks == 1
        else {
            const accessToken = await getAccessTokenSilently()
            const storedData = localStorage.getItem('newPageData')
            let pageData = storedData ? JSON.parse(storedData) : {};

            pageData = {
                ...pageData, 
                'Domain': item.domainName
            }

            localStorage.setItem('newPageData', JSON.stringify(pageData))
            createProductAndUserSession(accessToken, item.domainName, itemPrice, item.purchasePrice, user.email, "domain")
        }
    }

    return (
        <div className="search-item">
            <div className="domain">{item.domainName}</div>
            <div className="price">
                <strong>Price: </strong>
                {"$" + itemPrice}
            </div>
            <div className="renewal">
                <strong>Renewal Price: </strong>
                {"$" + itemRenewalPrice}
            </div>
            <button onClick={handleClick}>{numClicks == 0 ? "Purchace" : "Confirm purchase?"}</button>
        </div >
    )
}
export default SearchItem
