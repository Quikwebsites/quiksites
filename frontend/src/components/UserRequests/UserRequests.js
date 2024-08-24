import { useEffect, useState} from 'react'
import { getUserRequests } from '../../services/message.service'
import { usePageContext } from "../../context/PageContext"
import { useAuth0 } from "@auth0/auth0-react"

import './UserRequests.css'

export const UserRequests = () => {
    const [{admin_user}, dispatch] = usePageContext();
    const [userRequests, setUserRequests] = useState(null);
    const { getAccessTokenSilently } = useAuth0()

    const getRequests = async () => {
        const accessToken = await getAccessTokenSilently()
        const { data, error } = await getUserRequests(accessToken);

        if (error) {
            console.error("Error fetching user requests:", error);
            return;
        }
        setUserRequests(data.values);
    };

    // On page mount
    useEffect(() => {
        getRequests();
        console.log(userRequests)
    }, []);

    const handleClick = (email) => {
        dispatch({
            type: "SET_ADMIN_USER",
            admin_user: email,
        });

        dispatch({
            type: "SET_ADMIN_VIEW",
            admin_view: "AdminUser"
        })
    }

    return (
        <div className="subpage">
            {userRequests?.map((request, index) => (
                request.active ? (
                    <a key={index} className="request-tile" onClick={() => handleClick(request.email)}>
                        <p>User Email: <strong>{request.email}</strong></p>
                    </a>
                ) : (null)
            ))}
        </div>
    );
}