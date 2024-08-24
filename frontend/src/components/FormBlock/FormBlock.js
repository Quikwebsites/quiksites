import React , {useEffect, useState } from 'react'
import { usePageContext } from "../../context/PageContext" 

import './FormBlock.css'
const FormBlock = (props) => {
        const [{ page }, dispatch] = usePageContext()
        const [businessName, setBusinessName] = useState('')
        const [description, setDescription] = useState('')
    
        const handleSubmit = (e) => {
            e.preventDefault()

            const newPageData = {
                'Business_Name': businessName,
                'Description': description
            }

            localStorage.setItem('newPageData', JSON.stringify(newPageData))
            
            dispatch({
              type: "SET_PAGE",
              page: "templates",
            });
            window.scrollTo(0,0)
            
        }
    
        return(
            <div className="form-container">
                <h1>Start Your Journey With Us!</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-items">
                        <label htmlFor="businessName">BUSINESS NAME</label>
                        <input
                            type="name"
                            id="businessName"
                            value={businessName}
                            onChange={(e) => setBusinessName(e.target.value)}
                            placeholder="Your Business Name"
                            required
                        />
                        <label htmlFor="description">DESCRIPTION</label>
                        <textarea
                            type="message"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Ex.  we  are  an  airplane  maintence  company  based  in  Longmont,  CO.  We  offer  tuning,  modification,  and  painting  services.  Our  hours  are  from  9am-5pm  everyday  except  sundays  on  which  we  are  closed.  Our  phone  number  is  (123)-456-7891."                            required
                        />
                    </div>
                    <button type="submit">Create Your Website</button>
                    <h2>Get your website in 24 hours or less! Built by professionals and powered by AI.</h2>
                </form>
            </div>
    );
}
export default FormBlock
