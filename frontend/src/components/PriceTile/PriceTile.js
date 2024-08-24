import "./PriceTile.css";
import useLogin from "../../hooks/useLogin"

const PriceTile = (props) =>{
    const { Login } = useLogin()

    return(
        <div className={props.theme}>
            <h2>{props.title1}</h2>
            <p>{props.text1}</p>
            <h2>{props.price}</h2>
            <p>{props.text2}</p>
            <button onClick={Login} className="login-redirect">{props.button_text}</button>
            <ul>
            {props.point1?(<li>
                    {props.point1}
                </li>):null}
                {props.point2?(<li>
                    {props.point2}
                </li>):null}
                {props.point3?(<li>
                    {props.point3}
                </li>):null}
                {props.point4?(<li>
                    {props.point4}
                </li>):null}
                {props.point5?(<li>
                    {props.point5}
                </li>):null}
            </ul>
        </div>
    );
}
export default PriceTile;