
import { useState, useEffect } from 'react'
import {usePageContext} from "../../context/PageContext"
import { useAuth0 } from "@auth0/auth0-react"
import Navbar from "../Navbar/Navbar"
import AdminWebTile from '../AdminWebTile/AdminWebTile'

import { getUserWebpages, getUserRequests } from '../../services/message.service';

import './AdminUserView.css'

export const AdminUserView = () => {
    const [{admin_view, admin_user}, dispatch] = usePageContext();
    const { getAccessTokenSilently } = useAuth0()
    const [userWebsites, setUserWebsites] = useState([])
    const [userRequests, setUserRequests] = useState([])

    const getWebPages = async () => {
        const accessToken = await getAccessTokenSilently()
        // Expected data return is an object with an array of website objects
        //{websites: [websiteObject]}
        let { data, error } = await getUserWebpages(accessToken, admin_user)
        
        if(data)
        {
            setUserWebsites(data.websites)
        }
    }

    const getRequests = async () => {
        const accessToken = await getAccessTokenSilently()
        // Expected data return is an object with an array of website objects
        //{websites: [websiteObject]}
        let { data, error } = await getUserRequests(accessToken, admin_user)
        
        if(data)
        {
            setUserRequests(data.values)
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

    // On load
    useEffect(() => {
        getWebPages()
        getRequests()
    }, [])

    return (
        <div className="user-data">
            <Navbar />
            <div className="user-data-header">
                <h1>Websites for {admin_user}</h1>
                <button onClick={goBackClick}>Go Back</button>
            </div>
            <div className="subpage">
                {userWebsites?.map((website, index) => (
                    <AdminWebTile key={index} website={website} email={admin_user} index={index}/>
                ))}
            </div>
        </div>
    )
}