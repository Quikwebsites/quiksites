import React, { useEffect, useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react"

import Navbar from "../components/Navbar/Navbar"
import AutorenewTile from "../components/AutorenewTile/AutorenewTile"
import { getAutorenewalBool } from '../services/message.service';
import { usePageContext } from "../context/PageContext" 


const AutorenewPage = () => {
    const { user, getAccessTokenSilently } = useAuth0()
    const [,dispatch] = usePageContext()
    const [processing, setProcessing] = useState(false)

    const storedData = JSON.parse(localStorage.getItem('newPageData')) 
   
    const autorenewalCheck = async () => {
        const accessToken = await getAccessTokenSilently()
        const newAutorenewalBool = await getAutorenewalBool(accessToken, user.email)

        console.log("autorenew bool value: ", newAutorenewalBool)

        if(newAutorenewalBool.data == true){
            dispatch({
                type: "SET_PAGE",
                page: "user",
              });
              window.scrollTo(0,0)
        } 
    }

    useEffect(() => {

        if(storedData.AutorenewProcessing)// If the 'Domain' data value is present, it means the user chose the domain
        {
            setProcessing(true)
        }
        else {
            setProcessing(false)
        }

        if(storedData.AutorenewProcessing)
        {
            // Call domainCheck immediately
            autorenewalCheck();
        
            // Initialize the counter
            let count = 0;
        
            // Set an interval to call domainCheck every 1000 ms
            const interval = setInterval(() => {
                if (count < 19) { // Since it's already called once, call it 4 more times
                    autorenewalCheck();
                    count++;
                } else {
                    // Clear the interval once it has been called 20 times
                    clearInterval(interval);

                    let pageData = {
                        ...storedData, 
                    }
    
                    pageData.AutorenewProcessing = false
            
                    localStorage.setItem('newPageData', JSON.stringify(pageData))
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
    },[]);

    return(
        <div>
            <Navbar/>
            <div className="section">
                <AutorenewTile buffering={processing}/>
            </div>
        </div>
    )
}
export default AutorenewPage