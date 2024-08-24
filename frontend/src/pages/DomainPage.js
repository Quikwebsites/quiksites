import React, { useState, useEffect } from 'react'
import { useAuth0 } from "@auth0/auth0-react"

import DomainSearchTile from '../components/DomainSearchTile/DomainSearchTile'
import Navbar from '../components/Navbar/Navbar'
import { createUser, searchForDomains, getNewDomainBool } from '../services/message.service';
import { usePageContext } from "../context/PageContext" 


import './DomainPage.css'

// Need to add a "no domain names found" warning
const DomainPage = () => {
    const { user, getAccessTokenSilently } = useAuth0()
    const [,dispatch] = usePageContext()
    const [choseDomain, setChoseDomain] = useState(false)
    
    let storedData
    
    const newUserCheck = async () => {
        if(!user)
            return

        const accessToken = await getAccessTokenSilently()

        await createUser(accessToken, user.email)
    }

    const domainCheck = async () => {
        const accessToken = await getAccessTokenSilently()
        const newDomainBool = await getNewDomainBool(accessToken, user.email)

        console.log(newDomainBool)
        
        if(newDomainBool.data == true){
            dispatch({
                type: "SET_PAGE",
                page: "renew",
            });
            window.scrollTo(0,0)
        } 
    }

    useEffect(() => {
        newUserCheck();

    }, [user])

    useEffect(() => {
        storedData = JSON.parse(localStorage.getItem('newPageData'))

        if(storedData.Domain) // If the 'Domain' data value is present, it means the user chose the domain
        {
            console.log("Domain is present in local storage")
            setChoseDomain(true)
        }
        else {
            console.log("Domain is not present in local storage")
            setChoseDomain(false)
        }

        // If there is a domain present, priodically check the db value
        if(storedData.Domain)
        {   
            // Call domainCheck immediately
            domainCheck();
        
            // Initialize the counter
            let count = 0;
        
            // Set an interval to call domainCheck every 1000 ms
            const interval = setInterval(() => {
                if (count < 19) { // Call it 20 more times before ceasing
                    domainCheck();
                    count++;
                } else {
                    // Clear the interval once it has been called 5 times
                    clearInterval(interval);

                    console.log("Finished querying server")
    
                    let pageData = {
                        ...storedData, 
                    }

                    pageData.Domain = null
                    console.log("new page data: ", pageData)
            
                    localStorage.setItem('newPageData', JSON.stringify(pageData))
                    setChoseDomain(false)
                }
            }, 1000);
        
            // Cleanup the interval on component unmount
            return () => {
                clearInterval(interval);
            };
        }
        else {
            return
        }

    }, []);

    return (
        <div>
            <Navbar/>
            <div className="domain-page">
                <div>
                    <DomainSearchTile buffering={choseDomain}/>
                </div>
            </div>
        </div>
    )
}

export default DomainPage

/*

<div className="domain-page">
            <h1>Search for a domain!</h1>
            <div>
                <input
                    type="text"
                    placeholder="Search for domains"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
                <button onClick={() => handleSkip()}>Skip</button>
            </div>
            {searchResults.map((result, index) => (
                <SearchItem key={index} item={result} />
            ))}
        </div>


*/
