import { useAuth0 } from "@auth0/auth0-react"

const useSignup = () => {
    const { loginWithRedirect } = useAuth0()

    const Signup = async () => {
        await loginWithRedirect({           
            authorizationParams: {
              prompt: "signup",
              screen_hint: "signup",
            },
          });
    }

    return { Signup }
}

export default useSignup