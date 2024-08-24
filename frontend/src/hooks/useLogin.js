import { useAuth0 } from "@auth0/auth0-react"

const useLogin = () => {
    const { loginWithRedirect } = useAuth0()
    
    const Login = async () => {
        await loginWithRedirect({
            authorizationParams: {
              prompt: "login",
            },
          });
    }

    return { Login }
}

export default useLogin