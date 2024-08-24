import React, { useState, useEffect} from 'react'
import {usePageContext} from "../../context/PageContext"
import { getActiveUserWebpage } from "../../services/message.service"
import Navbar from "../Navbar/Navbar"
import { AdminRequestTile } from '../AdminRequestTile/AdminRequestTile'
import { useAuth0 } from "@auth0/auth0-react"

import './AdminRequests.css'

export const AdminRequests = () => {
    const [{admin_view, admin_user}, dispatch] = usePageContext();
    const { getAccessTokenSilently } = useAuth0()
    const [activeWebsite, setActiveWebsite] = useState(null)
    const [requests, setRequests] = useState(null)

    const getActiveWebpage = async () => {
        const accessToken = await getAccessTokenSilently()
        let { data, error } = await getActiveUserWebpage(accessToken, admin_user)
        
        if(data)
        {
            setActiveWebsite(data.website)
        }
    }

    const goBackClick = () =>{
        dispatch({
            type: "SET_ADMIN_USER",
            admin_user: "",
          });

        dispatch({
            type: "SET_ADMIN_VIEW",
            admin_view: "AdminMain",
          });
    }

    // On page load
    useEffect(() => {
        getActiveWebpage()

    }, [])

    // On data update
    useEffect(() => {
        if(!activeWebsite)
            return

        setRequests(activeWebsite.requestLogs)
    }, [activeWebsite])

    return (
        <div className="admin-user-request">
            <Navbar />
            <div className="admin-request-header">
                <h1>Requests for {admin_user}'s Business</h1>
                <button onClick={goBackClick}>Go Back</button>
            </div>
            
            <div className="subpage">
                {requests?.map((request, index) => (
                    <AdminRequestTile key={index} request={request} website_id={activeWebsite.id} index={index}/>
                ))}
            </div>
        </div>
    )
}


