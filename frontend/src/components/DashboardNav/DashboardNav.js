import React from 'react'

// Stylesheets
import './DashboardNav.css'

import LogoutButton from '../Buttons/LogoutButton'

const DashboardNav = () => {

	const handleHomeClick = () => {
		console.log("Home click")
	}

    return (
        <nav className="dash-nav"> 
	    	<div className="logo" onClick={handleHomeClick}>
	        	<img src="logo.jpeg" alt="Logo" className="logo-img" />
	        	QuikSites
	      	</div>
	      	<li className="logout-button">
	      		<LogoutButton />
	      	</li>
	    </nav>
    )
}

export default DashboardNav

