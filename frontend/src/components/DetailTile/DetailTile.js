import React, {useEffect, useState} from 'react'
import './DetailTile.css'
import { usePageContext } from "../../context/PageContext" 
import { useAuth0 } from "@auth0/auth0-react"

const DetailsTitle = "Tailor Your Website With Additional Details"
const DetailTile = () => {
    const { isAuthenticated } = useAuth0()
    const [fullDescription, setFullDescription] = useState('')
    const [{ subpage }, dispatch] = usePageContext()
    
    const handleSubmit = () => {
        const storedData = localStorage.getItem('newPageData')
        let pageData = storedData ? JSON.parse(storedData) : {};

        pageData = {
            ...pageData, 
            'Full_Description': fullDescription
        }
        
        localStorage.setItem('newPageData', JSON.stringify(pageData))
        if(isAuthenticated){
            dispatch({
                type: "SET_PAGE",
                page: "domain",
            });
            window.scrollTo(0,0);
        }else{
            dispatch({
                type: "SET_PAGE",
                page: "signup",
            });
            window.scrollTo(0,0);
        }
        // To do - update page state to example page
    }

    return(
        <div className="detail-tile">
            <h1>{DetailsTitle}</h1>
            <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="fulldescription">Full Business Description</label>
                        <textarea
                            type="message"
                            id="fulldescription"
                            value={fullDescription}
                            onChange={(e) => setFullDescription(e.target.value)}
                            placeholder="Write a full and thourough description of your business. 
                                        You can also include information about colors and other design
                                        preferences."                            
                            required
                        />
                    </div>
                    <button type="submit">Build</button>
                </form>
        </div>
    );
}
export default  DetailTile;