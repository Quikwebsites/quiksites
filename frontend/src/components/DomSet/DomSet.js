import React, {useState} from "react"
import "./DomSet.css"

const DomSet = ()=> {
        const [customDomain, setCustomDomain] = useState('')
        const handleSubmit = (e) => {
            e.preventDefault()
    
            /*const newPageData = {
                'Business_Name': businessName,
                'Description': description
            }
    
            localStorage.setItem('newPageData', JSON.stringify(newPageData))
            
            dispatch({
              type: "SET_PAGE",
              page: "templates",
            });*/
            window.scrollTo(0,0)
                
        }    
        return(
            <div className = "dom-set subpage">
                <h3>Custom Domain Settings</h3>
                <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="customDomain">Custom Domain:</label>
                            <input
                                type="name"
                                id="customDomain"
                                value={customDomain}
                                onChange={(e) => setCustomDomain(e.target.value)}
                                placeholder="yourdomain.com"
                            />
                        </div>
                        <button type="submit">Save</button>
                    </form>
            </div>
    );
}
export default DomSet