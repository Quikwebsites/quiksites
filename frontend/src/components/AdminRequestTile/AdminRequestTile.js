import React, { useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react"
import { resolveRequest, reopenRequest, updateConversionRates } from '../../services/message.service'
import {usePageContext} from "../../context/PageContext"

import "./AdminRequestTile.css"

export const AdminRequestTile = ({ request, website_id, index }) => {
    const [{admin_view, admin_user}, dispatch] = usePageContext();
    const [requestActive, setRequestActive] = useState(request)
    const { getAccessTokenSilently } = useAuth0()

    const resolve = async () => {
        const accessToken = await getAccessTokenSilently()
        await resolveRequest(accessToken, admin_user, website_id, index)

        if(request.requestType === "plan-change")
        {
            // Updates the conversion rate information 
            // Increments the corresponding plan type (newPlan) and decrements the opposing plan
            await updateConversionRates(accessToken, request.body.newPlan);
        }

        window.location.reload()
    }

    const openRequest = async () => {
        const accessToken = await getAccessTokenSilently()
        await reopenRequest(accessToken, admin_user, website_id, index)

        if(request.requestType === "plan-change")
        {
            const planType = (request.body.newPlan === "basic" ? "premium" : "basic")

            // Updates the conversion rate information 
            // Increments the corresponding plan type (newPlan) and decrements the opposing plan
            await updateConversionRates(accessToken, planType);
        }

        window.location.reload()
    }

    return (
        <div>
            {
                (request.requestType === "new-page" ? (
                    request.active ? (
                        <div className={request.active ? "admin-request-tile-active" : "admin-request-tile-inactive"}>
                            <div className="request-item">
                                <strong>Request Type: </strong>
                                <p>New Page</p>
                            </div>
                            <div className="request-item">
                                <strong>Business Name: </strong>
                                <p>{request.body.businessName}</p>
                            </div>
                            <div className="request-item">
                                <strong>Domain: </strong>
                                <p>{request.body.domain}</p>
                            </div>
                            <div className="request-item">
                                <strong>Description 1: </strong>
                                <p>{request.body.description}</p>
                            </div>
                            <div className="request-item">
                                <strong>Description 2: </strong>
                                <p>{request.body.fullDescription}</p>
                            </div>
                            <div className="request-item">
                                <strong>Style: </strong>
                                <p>{request.body.style}</p>
                            </div>
                            <div className="request-item">
                                <button onClick={request.active? () => resolve() : () => openRequest()}>{request.active ? "Mark Resolved" : "Reopen Request"}</button>
                            </div>
                        </div> ) : (
                            <div className={request.active ? "admin-request-tile-active" : "admin-request-tile-inactive"}>
                                <p><strong>Request Resolved</strong></p>
                                <button onClick={request.active? () => resolve() : () => openRequest()}>{request.active ? "Mark Resolved" : "Reopen Request"}</button>
                            </div>
                        )
                ) : 
                (request.requestType === "page-edit" ? (
                    request.active ? (
                        <div className={request.active ? "admin-request-tile-active" : "admin-request-tile-inactive"}>
                            <p>Request Type: <strong>Page Revision</strong></p>
                            <p>Domain: <strong>{request.body.domain}</strong></p>
                            <p><strong>Request: </strong>{request.body.reqText}</p>
                            <button onClick={request.active? () => resolve() : () => openRequest()}>{request.active ? "Mark Resolved" : "Reopen Request"}</button>
                        </div>
                    ) : (
                        <div className={request.active ? "admin-request-tile-active" : "admin-request-tile-inactive"}>
                            <p><strong>Resolved Request: {request.requestType}</strong></p>
                            <button onClick={request.active? () => resolve() : () => openRequest()}>{request.active ? "Mark Resolved" : "Reopen Request"}</button>
                        </div>
                    )             
                    ) : 
                    (request.requestType === "delete-page" ? (
                        request.active ? (
                            <div className={request.active ? "admin-request-tile-active" : "admin-request-tile-inactive"}>
                                <p>Request Type: <strong>PAGE DELETION</strong></p>
                                <p>Domain: <strong>{request.body.domain}</strong></p>
                                <button onClick={request.active? () => resolve() : () => openRequest()}>{request.active ? "Mark Resolved" : "Reopen Request"}</button>
                            </div>
                        ) : (
                            <div className={request.active ? "admin-request-tile-active" : "admin-request-tile-inactive"}>
                                <p><strong>Resolved Request: {request.requestType}</strong></p>
                                <button onClick={request.active? () => resolve() : () => openRequest()}>{request.active ? "Mark Resolved" : "Reopen Request"}</button>
                            </div>
                        )   
                    ) : (
                        // request type is "plan-change"
                        request.active ? (
                            <div className={request.active ? "admin-request-tile-active" : "admin-request-tile-inactive"}>
                                <p>Request Type: <strong>Subscription Change</strong></p>
                                <p><strong>Change to: </strong>{request.body.newPlan}</p>
                            <button onClick={request.active? () => resolve() : () => openRequest()}>{request.active ? "Mark Resolved" : "Reopen Request"}</button>
                        </div>
                        ) : (
                            <div className={request.active ? "admin-request-tile-active" : "admin-request-tile-inactive"}>
                                <p><strong>Resolved Request: {request.requestType}</strong></p>
                            <button onClick={request.active? () => resolve() : () => openRequest()}>{request.active ? "Mark Resolved" : "Reopen Request"}</button>
                        </div>
                        )
                    )
                )
            ))}

        </div>
    )
}

export default AdminRequestTile