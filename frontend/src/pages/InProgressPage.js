import React from 'react'

import useSignup from "../hooks/useSignup"
import Navbar from "../components/Navbar/Navbar"
import ProgressTile from "../components/ProgressTile/ProgressTile"

import './InProgressPage.css'

// This page prompts users to sign up in order to continue creating their website
const InProgressPage = () => {
    
    return (
        <div>
            <Navbar/>
            <div className="progress-section">
                <ProgressTile/>
            </div>
        </div>
    )
}

export default InProgressPage