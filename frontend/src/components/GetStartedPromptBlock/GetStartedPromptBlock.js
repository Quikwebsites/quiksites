import React from 'react'
import { useAuth0 } from "@auth0/auth0-react"
import { usePageContext } from "../../context/PageContext" 

import { getPublicResource, getProtectedResource, getAdminResource, createUser, createUserSession, createBillingPortalSession, checkDomainAvailability } from '../../services/message.service';

import './GetStartedPromptBlock.css'

const GetStartedPromptBlock = (props) => {

  const [{ page, visable }, dispatch] = usePageContext()
  const { getAccessTokenSilently } = useAuth0()
  
  const handleButtonClick = () => {
    const section = document.getElementById("start")
    if(section){
      section.scrollIntoView({ behavior: 'smooth'})
    }
  };

  // Used this to test authentication functionality - will eventually be removed
  const devClick = async () => {
      //const accessToken = await getAccessTokenSilently()
      //const { data, error } = await getProtectedResource(accessToken)
      //const { data, error } = await getPublicResource()
      //const { data, error } = await sendPublicMessage()
      //const { data, error } = await checkDomainAvailability("example")
      //const { data, error } = await createUser("roger@gmail.com")
      //const { data, error } = await createUserSession("newbie@gmail.com")
      //const { data, error } = await createBillingPortalSession("hey@gmail.com")
      //const { data, error } = await getAdminResource(accessToken) // - admin login: admin@gmail.com - admin123!
      
      //if(data)
        //console.log(data)

      //if(error)
        //console.log(error)

      //window.location = data.session_url

  }

  const handleInfoClick = () => {
    dispatch({
      type: "SET_PAGE",
      page: "info",
    });
  }

  return (
    <div className="get-started-prompt-block">
          <h2>{props.title}</h2>
          <p>{props.body}</p>
          <button onClick={handleButtonClick}>{props.buttonText}</button>
    </div>
  )
}

export default GetStartedPromptBlock

// This makes the button change to the plans page
/*
<button onClick={() => {
            dispatch({
              type: "SET_PAGE",
              page: "plans",
            })
          }}>{props.buttonText}</button>

*/