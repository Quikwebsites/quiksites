import React, { useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react"
import { usePageContext } from '../../context/PageContext'

import { deactivateUserWebsite, pageEditRequest, getActiveUserWebpage } from '../../services/message.service';

import './RequestBox.css'

const RequestBox = ({ email }) => {
    const [{req_box_visable}, dispatch] = usePageContext()
    const { getAccessTokenSilently } = useAuth0()
    const [reqText, setReqText] = useState("")
    
    const goBack = async () => {
        const accessToken = await getAccessTokenSilently()
        await deactivateUserWebsite(accessToken, email)

        dispatch({
            type: "SET_REQ_BOX_VIZ",
            req_box_visable: false,
        });
    }

    const submitRequest = async () => {
        const accessToken = await getAccessTokenSilently()

        let { data, error } = await getActiveUserWebpage(accessToken, email)

        const request = {
            reqText: reqText,
            domain: data.website.domain
        }

        await pageEditRequest(accessToken, email, request)

        await deactivateUserWebsite(accessToken, email)

        dispatch({
            type: "SET_REQ_BOX_VIZ",
            req_box_visable: false,
        });

        alert('Your request has been submitted! Our team is on it!')
    }

    return (
        <div className="request-form">
            <textarea 
                placeholder="Enter your request here!"
                value={reqText}
                onChange={(e) => setReqText(e.target.value)}
            />
            <div className="request-form-button-wrapper">
                <button onClick={() => goBack()}>Go Back</button>
                <button onClick={() => submitRequest()}>Submit Request</button>
            </div>
        </div>
    )
}

export default RequestBox