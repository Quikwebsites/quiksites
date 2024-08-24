import React from 'react'
import useLogout from "../../hooks/useLogout"

const LogoutButton = () => {
    const { Logout } = useLogout()

    return (
        <li onClick={Logout}>
          <a>Logout</a>
        </li>
    )
}

export default LogoutButton
