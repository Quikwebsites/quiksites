// #C3FF61 - Green color of logo
import { useEffect } from 'react'
import { useAuth0 } from "@auth0/auth0-react"

// Pages
import Home from './pages/Home'
import UserPage from './pages/UserPage'
import AdminPage from './pages/AdminPage'
import TemplatesPage from './pages/TemplatesPage'
import InfoPage from './pages/InfoPage'
import PlansPage from './pages/PlansPage'
import SignupPromptPage from './pages/SignupPromptPage'
import DomainPage from './pages/DomainPage'
import PaymentPromptPage from './pages/PaymentPromptPage'
import InProgressPage from './pages/InProgressPage'
import SettingsPage from './pages/SettingsPage'
import AutorenewPage from './pages/AutorenewPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'

// Context hooks
import { usePageContext } from './context/PageContext'

import { getPublicResource, getProtectedResource, getAdminResource, sendPublicMessage, createDatabaseUrl } from './services/message.service';

// Todo next - update website settings page
function App() {
    const [{ page }, dispatch] = usePageContext()
    const { isAuthenticated, user, getAccessTokenSilently } = useAuth0()

    // Clear history on page load
    useEffect(() => {
      // Replace the current history entry with the current page
      window.history.replaceState(null, '', window.location.href);
    }, [])

    // Update page state depending on authentication state
    useEffect(() => {

      const updatePageState = async () => {
        if(isAuthenticated)
        {
          const accessToken = await getAccessTokenSilently()
          const { data, error } = await getAdminResource(accessToken)

          // Check if the server returned admin data
          if(data) 
          {
            dispatch({
              type: "SET_PAGE",
              page: "admin",
            });
          // If no admin data returned, user is regular user
          } else {
            const newPageData = JSON.parse(localStorage.getItem('newPageData'))

            if(newPageData)
            {
              dispatch({
                type: "SET_PAGE",
                page: "domain",
              });
            }
            else {
              dispatch({
                type: "SET_PAGE",
                page: "user",
              });
            }
          }
          
        // No user signed in
        } else {
          dispatch({
            type: "SET_PAGE",
            page: "home",
          })
        }
      }
      
      updatePageState()
    }, [isAuthenticated])

    return (
      <div className="app">
      {page == "home" ? (
        <Home />
      ) : page == "user" ? (
        <UserPage />
      ) : page == "admin" ? (
        <AdminPage />
      ) : page == "templates" ? (
        <TemplatesPage />
      ) : page == "info" ? (
        <InfoPage/>
      ) : page == "plans" ? ( 
        <PlansPage />
      ) : page == "signup" ? ( 
        <SignupPromptPage />
      ) : page == "domain" ? (
        <DomainPage />
      ) : page == "planPrompt" ? (  
        <PaymentPromptPage/>
      ) : page == "progress" ? (
        <InProgressPage />
      ) : page == "pageSettings" ? (
        <SettingsPage />
      ) : page == "renew" ? (
        <AutorenewPage />
      ) : page == "privacy" ? (
        <PrivacyPolicyPage />
      ) : (<p>Error - no page loaded</p>
      )}
    </div>
    );
}

export default App;
