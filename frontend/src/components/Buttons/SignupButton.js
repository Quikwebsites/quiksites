import React from 'react'
import useSignup from "../../hooks/useSignup"
import './SignupButton.css'

const SignupButton = () => {
    const { Signup } = useSignup()

    return (
        <li className="signup" onClick={Signup}>
          <a>Sign up</a>
        </li>
    )
}

export default SignupButton
