import React, {useEffect, useState} from 'react'
import './WebsiteTile.css'
import { usePageContext } from "../../context/PageContext" 
import { useAuth0 } from "@auth0/auth0-react"

import { activateUserWebsite } from '../../services/message.service';

const WebsiteTile = ({ item }) => {
    const { user, getAccessTokenSilently } = useAuth0()
    const [{sub_page}, dispatch] = usePageContext()

    const ImageSource = "chillimg.png"

    const userEmail = user.email
    
    const handleRedirectClick = async (item) => {
        const accessToken = await getAccessTokenSilently()
        if(item.url !== "")
        {
            window.open(item.url, '_blank', 'noopener,noreferrer')
        }
        else if(item.status === "no_payment")
        {
            await activateUserWebsite(accessToken, userEmail, item.id)
            
            dispatch({
                type: "SET_PAGE",
                page: "planPrompt",
              });
            window.scrollTo(0,0)
        }
        else if(item.status === "in_progress")
        {
            dispatch({
                type: "SET_PAGE",
                page: "progress",   
              });
            window.scrollTo(0,0)
        }
    }

    const openSettings = async (item) => {
        const accessToken = await getAccessTokenSilently()
        await activateUserWebsite(accessToken, userEmail, item.id)

        dispatch({
            type: "SET_SUB_PAGE",
            sub_page: "PlanSet",
          });

        dispatch({
            type: "SET_PAGE",
            page: "pageSettings",
          });
        window.scrollTo(0,0)
    }

    const requestEdit = async () => {
        const accessToken = await getAccessTokenSilently()
        await activateUserWebsite(accessToken, userEmail, item.id)
        
        if(item.status === "no_payment")
        {
            dispatch({
                type: "SET_PAGE",
                page: "planPrompt",
              });
            window.scrollTo(0,0)

            return
        }

        dispatch({
            type: "SET_REQ_BOX_VIZ",
            req_box_visable: true,
          });

        window.scrollTo(0,0)
    }

    return (
        item.status === "deleted" ? (null) :
        <div className="website-tile">
            <div className="footer">
                <h3>{item.businessName}</h3>
                <p>{item.domain}</p>
                <div className="buttons">
                    <div className="top-buttons">
                        <button className="top-button" onClick={() => openSettings(item)}>Settings</button>
                        <button className="top-button" onClick={() => requestEdit(item)}>Request Edit</button>
                    </div>
                    <button className="bottom-button" onClick={() => handleRedirectClick(item)}>Visit Page</button>
                </div>
            </div>
        </div>
    )
}

export default WebsiteTile



