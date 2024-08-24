import { useAuth0 } from "@auth0/auth0-react"

const useLogout = () => {
    const { logout } = useAuth0()

    const Logout = async () => {
        logout({
            logoutParams: {
                returnTo: window.location.origin,
            },
        });
    }

    return { Logout }
}

export default useLogout