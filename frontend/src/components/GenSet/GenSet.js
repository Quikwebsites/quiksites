import React, {useState} from "react"
import "./GenSet.css"

const GenSet = ()=> {
        const [googleAnalyticsID, setGoogleAnalyticsID] = useState('')
        const [headContent, setHeadContent] = useState('')
        const [emailOverride, setEmailOverride] = useState('')
        const [SEOTitle, setSEOTitle] = useState('')
        const [SEODescription, setSEODescription] = useState('')
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
            <div className = "gen-set subpage">
                <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="googleAnalyticsID">Google Analytics ID</label>
                            <input
                                type="name"
                                id="googleAnalyticsID"
                                value={googleAnalyticsID}
                                onChange={(e) => setGoogleAnalyticsID(e.target.value)}
                                placeholder="GA-XXXXXXXXXX"
                            />
                            <label htmlFor="headContent">{"Content in <head>"}</label>
                            <textarea
                                id="headContent"
                                value={headContent}
                                onChange={(e) => setHeadContent(e.target.value)}
                            />
                            <label htmlFor="emailOverride">Contact Form Email Override</label>
                            <input
                                type="email"
                                id="emailOverride"
                                value={emailOverride}
                                onChange={(e) => setEmailOverride(e.target.value)}
                                placeholder="ageneralperson@domainofoneschoosing.com"
                            />
                            <label htmlFor="SEOTitle">SEO Title</label>
                            <input
                                type="message"
                                id="SEOTitle"
                                value={SEOTitle}
                                onChange={(e) => setSEOTitle(e.target.value)}
                            />
                            <label htmlFor="SEODescription">SEO Description</label>
                            <textarea
                                id="SEODescription"
                                value={SEODescription}
                                onChange={(e) => setSEODescription(e.target.value)}
                            />
                            {/*<label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="example@email.com"
                                required
                            />*/}
                        </div>
                        <button type="submit">Save</button>
                    </form>
            </div>
    );
}
export default GenSet