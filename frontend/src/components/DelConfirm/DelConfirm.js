import React, {useState} from "react"
import { useAuth0 } from "@auth0/auth0-react"
import "./DelConfirm.css"

import { usePageContext } from "../../context/PageContext"
import { deleteWebpage } from "../../services/message.service"

const DelConfirm = ()=> {
    const { user, getAccessTokenSilently } = useAuth0()
    const [{sub_page}, dispatch] = usePageContext();
    const [businessName, setBusinessName] = useState('')

    const handleDeletion = async (e) => {
        e.preventDefault()

        const accessToken = await getAccessTokenSilently()
        
        // Todo - delete website
        // The current page's id will be saved as the active-website within the database at this point
        // Basically, just send a request to the server indicating that this user (specified by email) wants to delete their page
        // The server will find the user and find the active website associated with their account
        // It then deletes that object from the database and cancels their subscription
        // So, there are two things that need to be deleted
        //  website object within db
        //  stripe subscriptions associated w that website
        await deleteWebpage(accessToken, user.email)

        window.location.reload()
    }    

    const handleReturn = (e) => {
        e.preventDefault()

        dispatch({
            type: "SET_SUB_PAGE",
            sub_page: "DelSet",
        });

    }

    return(
        <div className = "del-conf subpage">
            <h3>Confirm deletion</h3>
            <p>Are you sure?</p>
            <p>All of you customizations will be permenantly destroyed and any associated subscriptions will be canceled.</p>
            <button onClick={handleReturn} className="return-button">No, cancel</button>
            <button onClick={handleDeletion} className="confirm-button">Delete Your Website</button>
        </div>
    );
}
export default DelConfirm