import React, {useState} from "react"
import "./DelSet.css"

import {usePageContext} from "../../context/PageContext"

const DelSet = ()=> {
    const [{sub_page}, dispatch] = usePageContext();
    const [businessName, setBusinessName] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        
        dispatch({
            type: "SET_SUB_PAGE",
            sub_page: "DelConfirm",
        });
        
    }    
    return(
        <div className = "del-set subpage">
            <h3>Delete Website</h3>
            <p>This will delete your webpage and cancel any active subscription related to this site.</p>
            <button onClick={handleSubmit}>Delete Your Website</button>
        </div>
    );
}
export default DelSet