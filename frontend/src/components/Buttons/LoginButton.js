import React from 'react'
import useLogin from "../../hooks/useLogin"
import "./LoginButton.css"

const LoginButton = () => {
    const { Login } = useLogin()

    return (
        <li className = "login" onClick={Login}>
            <a>Log In</a>
        </li>
    )
}

export default LoginButton