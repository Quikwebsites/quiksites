import React from 'react'

import useSignup from "../hooks/useSignup"
import Navbar from "../components/Navbar/Navbar"
import SignUpTile from "../components/SignUpTile/SignUpTile"

import './SignupPromptPage.css'

// This page prompts users to sign up in order to continue creating their website
const SignupPromptPage = () => {
    const { Signup } = useSignup()

    return (
        <div>
            <Navbar/>
            <div className="signup-section">
                <SignUpTile/>
            </div>
        </div>
    )
}

export default SignupPromptPage