import React, { useEffect, useRef } from 'react'
import { useAuth0 } from "@auth0/auth0-react"

import { createBillingPortalSession } from '../../services/message.service';


// Stylesheets
import './Navbar.css'

// Context hooks
import { usePageContext } from "../../context/PageContext" 
import ImageButton from '../ImageButton/ImageButton'
import useWindowDimensions from "../../hooks/useWindowDimensions"
import LoginButton from '../Buttons/LoginButton'
import LogoutButton from '../Buttons/LogoutButton'
import SignupButton from '../Buttons/SignupButton'

const Navbar = () => {
  const [{ page, visable }, dispatch] = usePageContext()
  const { getAccessTokenSilently } = useAuth0()
  const shownav = useWindowDimensions()
  const { isAuthenticated, user } = useAuth0()
  const navRef = useRef()

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if(section) {
      section.scrollIntoView()
    }
  };
  const handleExpandClick = () => {
    dispatch({
      type: "SET_NAV_VIZ",
      visable: !visable,
    });
  }
  const handleDashboardClick = () => {
    dispatch({
      type: "SET_PAGE",
      page: "user",
    });
  }

  const mouseClick = (event) => {
    if(navRef.current){
      if(!navRef.current.contains(event.target)){
        dispatch({
          type: "SET_NAV_VIZ",
          visable: false,
        });
      }
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", mouseClick)
  }, [])


  return (

    <div className="nav" ref={navRef}>
      <div className = "topbar">
        {/* If you wish to add pages to the desktop view of the nav bar, place them here within a li element*/}
        {page=="home" ? (
        <div className = "desktop top"> 
          <ul>
            <li>
            <ImageButton imgSrc = "logo.jpeg" action = "SET_PAGE" value = "home"/>
            </li>
            <li style={{fontSize: '25px'}}>
              QuikWebsites
            </li>
          </ul>
          <ul>
            <li onClick={() => scrollToSection("tutorial")}>
              <a>How It Works</a>
            </li>
            <li onClick={() => scrollToSection("pricing")}>
              <a>Pricing</a>
            </li>
          </ul>
          <ul>
              {isAuthenticated ? ( 
              <li>
                  <LogoutButton />
              </li>
              ) : (
                <div>
                  <li>
                    <LoginButton />
                  </li>
                  <li>
                    <SignupButton />
                  </li>
                </div>         
              )}
            {
            /**Like this
            <li>
              <element to be added/>
            </li>} 
            */
            }
          </ul>
        </div>
        ) : (page == "user" || page == "pageSettings") ? (
          <div className="desktop top"> 
          <ul>
            <li >
              <ImageButton imgSrc="logo.jpeg" action="SET_PAGE" value="home"/>
            </li>
            <li style={{fontSize: '25px'}}>
              QuikWebsites
            </li>
          </ul>
          <ul>
            <li>
              <ImageButton imgSrc = "user.png" action = "SET_NAV_VIZ"  size="small"/>
            </li>
          </ul>
        </div>
        ):(
        <div className = "desktop">
          <ul>
            <li>
              <ImageButton imgSrc = "logo.jpeg" action = "SET_PAGE" value = "home"/>
            </li>
            <li style={{fontSize: '25px'}}>
              QuikWebsites
            </li>
          </ul>
          <ul>
            <li>
              {isAuthenticated ? (
                  <LogoutButton />
              ) : (
                  // <LoginButton />
                  <SignupButton />         
              )}
            </li>
            {
            /**Like this
            <li>
              <element to be added/>
            </li>} 
            */
            }
          </ul>
        </div>
        )}

        {/**if you wish to add a page within the mobile view dropdown menu add it within the navbar div below as an li element **there is an example inline */}
        {page=="user"||page=="pageSettings"?(
        <div className="mobile white">
          <ul>
            <li >
              <ImageButton imgSrc = "logo.jpeg" action = "SET_PAGE" value = "home"/>
            </li>
            <li>
              QuikWebsites
             </li>
          </ul>
          <ul>
            <li>
              <ImageButton imgSrc = "user.png" action = "SET_NAV_VIZ"  size="small"/>
            </li>
          </ul>
        </div>):(
           <div className="mobile">
           <ul>
             <li >
               <ImageButton imgSrc = "logo.jpeg" action = "SET_PAGE" value = "home"/>
             </li>
           </ul>
           <ul>
             <li>
               <ImageButton imgSrc = "1024px-Hamburger_icon_white.svg.png" action = "SET_NAV_VIZ"  size="small"/>
             </li>
           </ul>
           </div>
        )}  
      </div>
      <div className="navbar">
        {visable? 
              /* items placed in this ul will be seen in the mobile navbar for the home page*/      
              page == "home"? (
                <ul className="gen-items">
                  <li onClick={() => scrollToSection("tutorial")}>
                    <a>How It Works</a>
                  </li>
                  <li onClick={() => scrollToSection("pricing")}>
                    <a>Pricing</a>
                  </li>
                  <li>
                  {isAuthenticated ? (
                    <LogoutButton />
                  ) : (
                    // <LoginButton />
                    <SignupButton />         
                  )}
                  </li>
                  {
                  /**Like this
                  <li>
                    <element to be added/>
                  </li>} 
                  */
                  }
                </ul>
              ):page == "user"||page == "pageSettings"?(
                <ul>
                  <li>
                    <a onClick={handleDashboardClick}>Dashboard</a>
                  </li>
                  <li>
                    <a onClick={async () => {
                      const accessToken = await getAccessTokenSilently()
                      const { data, error } = await createBillingPortalSession(accessToken, user.email)
                      window.location = data.session_url
                    }}>Billing</a>
                  </li>
                  <li>
                    <LogoutButton />
                  </li>
                </ul>
              ):page == "admin"?(
                <ul>
                  <li style={{fontSize: '25px'}}>
                    QuikWebsites
                  </li>
                  <li>
                    <LogoutButton />
                  </li>
                </ul>
              ):(//items placed in this ul will be viewable in the mobile nav on all pages that arent the home page
                <ul className="gen-items">
                  <li>
                    QuikWebsites
                  </li>
                  <li>
                  {isAuthenticated ? (
                    <LogoutButton />
                  ) : (
                    // <LoginButton />
                    <SignupButton />         
                  )}
                  </li>
                </ul>
              ):null}
                
            
      </div>
    </div>
      


  /*other old nav bar
  <div className="logo" onClick={() => scrollToSection("home")}>
    <img src="logo.jpeg" alt="Logo" className="logo-img" />
    QuikSites
  </div>
  <ul>
    <li onClick={() => scrollToSection("tutorial")}>
      <a>How It Works</a>
    </li>
    <li onClick={() => scrollToSection("pricing")}>
      <a>Pricing</a>
    </li>
    <li onClick={() => scrollToSection("contact")}>
      <a>Contact</a>
    </li>
    {isAuthenticated ? (
      <LogoutButton />
    ) : (
      // <LoginButton />
      <SignupButton />         
    )}
    
  </ul>*/


      /*OLD NAV BAR
     <nav className="navbar"> 
     <div className="logo" onClick={() => scrollToSection("home")}>
        <img src="logo.jpeg" alt="Logo" className="logo-img" />
        QuikSites
      </div>
      <div className="options">
        <button onClick={() => scrollToSection("tutorial")}>How it works</button>
        <button onClick={() => scrollToSection("pricing")}>Pricing</button>
        <button onClick={() => scrollToSection("contact")}>Contact</button>
        <button onClick={gotoLogin}>Login</button>
        <button onClick={gotoSignup}>Signup</button>
      </div>
    </nav> */






     
    
  );
}

export default Navbar

