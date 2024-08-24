
import { useState, useEffect } from 'react'
import {usePageContext} from "../../context/PageContext"
import { useAuth0 } from "@auth0/auth0-react"

import './AdminWebTile.css'

import { updateUserUrl, getUserPageRequests, activateUserWebsite } from '../../services/message.service';

const AdminWebTile = ({website, email}) => {
    const [{admin_view, admin_user}, dispatch] = usePageContext();
    const { getAccessTokenSilently } = useAuth0()
    const [phrase, setPhrase] = useState("")
    const [requests, setRequests] = useState([])
    const [numRequests, setNumRequests] = useState(0)

    const handleUrlClick = async () => {
        const accessToken = await getAccessTokenSilently()
        await updateUserUrl(accessToken, email, website.id, phrase)
    }

    const handleLogsClick = async () => {
        const accessToken = await getAccessTokenSilently()
        await activateUserWebsite(accessToken, email, website.id)

        dispatch({
            type: "SET_ADMIN_VIEW",
            admin_view: "AdminReq",
          });
    }

    const getUserRequests = async () => {
        const accessToken = await getAccessTokenSilently()
        let { data, error } = await getUserPageRequests(accessToken, email, website.id)
        
        if(data)
        {
            setRequests(data.values)
        }
    }
    
    // On mount
    useEffect(() => {
        getUserRequests()

        if(website.url === "")
            return

        setPhrase(website.url)
    }, [])

    // Whenever the requests array is updated, run this
    useEffect(() => {
        
        let count = 0

        for(let i = 0; i < requests.length; i++) 
        {
            if(requests[i].active == true)
            {
                count ++
            }
        }

        setNumRequests(count)
    }, [requests])

    return (
        <a className="admin-user-tile">
            <p>Business Name: <strong>{website.businessName}</strong></p>
            <div className="url-update">
                <input
                    type="text"
                    placeholder={"Type business url here"}
                    value={phrase}
                    onChange={(e) => setPhrase(e.target.value)}
                />
                <button onClick={() => handleUrlClick()}>Update</button>
            </div>
            <button onClick={handleLogsClick}>New Requests: {numRequests}</button>
        </a>
    )
}

export default AdminWebTile