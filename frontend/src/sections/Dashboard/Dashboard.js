import { useEffect, useState} from 'react'
import { useAuth0 } from "@auth0/auth0-react"

import "./Dashboard.css"
import AddNewButton from "../../components/Buttons/AddNewButton"
import WebsiteTile from "../../components/WebsiteTile/WebsiteTile"
import RequestBox from "../../components/RequestBox/RequestBox"

import { createUser, createBillingPortalSession, newWebpageRequest, getUserWebpages, deactivateUserWebsite, getDomainInfo } from '../../services/message.service';

import { usePageContext } from '../../context/PageContext'

const Dashboard = () => {
    const { user, getAccessTokenSilently } = useAuth0()
    const [{req_box_visable}, dispatch] = usePageContext()
    const [userWebsites, setUserWebsites] = useState([])
    
    const ImageSource = "chillimg.png"
    const userEmail = user.email
    
    const newUserCheck = async () => {
        if(!user)
            return

        const accessToken = await getAccessTokenSilently()

        await createUser(accessToken, userEmail)
        
        const newPageData = JSON.parse(localStorage.getItem('newPageData'))
        
        // If the user has just signed up after making a new page request
        if(newPageData)
        {
            console.log("New Page Data:", newPageData)

            const { Business_Name, Description, Full_Description, Style, Domain } = newPageData
            const email = userEmail

            const domainInfo = await getDomainInfo(accessToken, Domain)
            console.log(domainInfo.data)
            let { data, error } = await newWebpageRequest(accessToken, userEmail, Business_Name, Full_Description, Description, Style, Domain, domainInfo.data.autorenewEnabled, domainInfo.data.expireDate,domainInfo.data.renewalPrice)
            localStorage.removeItem('newPageData')
        }            
    }
    
    //displayPages();
    const getWebPages = async () => {
        if(!user)
            return

        const accessToken = await getAccessTokenSilently()

        let data = null
        let error = null

        while(!data)
        {
            // Expected data return is an object with an array of website objects
            //{websites: [websiteObject]}
            ({ data, error } = await getUserWebpages(accessToken, userEmail))

            // If data is still null, wait 1500 ms before the next iteration
            if (data === null) {
                await new Promise(resolve => setTimeout(resolve, 1500));
            }
        }

        if(data)
        {
            setUserWebsites(data.websites)
        }

        // Clear any active pages on user dashboard load
        await deactivateUserWebsite(accessToken, userEmail); 
    };
    
    
    useEffect(() => {	
		newUserCheck();
	}, [user])


    useEffect(() => {
        getWebPages();

        const timer1 = setTimeout(() => {
            getWebPages();
        }, 2500);

        // Clear all timeouts on cleanup
        return () => {
            clearTimeout(timer1);
        };
    }, [user]);
    
    
    return(
        <div className="dashboard padded-b">
            <ul>
                <li>
                    <p>Your Pages</p>
                </li>
                <li>
                    <AddNewButton />
                </li>
            </ul>
            {!req_box_visable ? (<div>
                <div className="refresh-prompt">
                    {/*(userWebsites.length === 0) ? <h1>Expecting to see your website here? Try refreshing the page.</h1> : <></>*/}
                </div>
                <div className="clear-section" id="webpages">
                    {userWebsites?.map((website, index) => (
                        <WebsiteTile key={index} item={website}/>
                    ))}
                </div>    
            </div>) : <RequestBox email={userEmail}/>}  
        </div>
    );   
}
                    

export default Dashboard
