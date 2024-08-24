import './SignUpTile.css'
import useSignup from "../../hooks/useSignup"

const SignUpTitle = "You're almost there! Create an account with us to continue"

const SignUpTile = () => {
    const { Signup } = useSignup()

    return(
        <div className="sign-up-tile">
            <h1>{SignUpTitle}</h1>
            <button onClick={Signup} className="signup-button">Sign Up</button>
        </div>
    );
}

export default  SignUpTile;