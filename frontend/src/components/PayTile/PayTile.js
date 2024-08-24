import './PayTile.css'
import { usePageContext } from '../../context/PageContext'

const PayTitle = "One last step to get your website rolling!"

const PayTile = () => {
    const [,dispatch] = usePageContext()

    const handleClick = () => {
        dispatch({
            type: "SET_PAGE",
            page: "plans",
          });
          window.scrollTo(0,0)
    }

    const handleBackClick = () => {
        dispatch({
            type: "SET_PAGE",
            page: "user",
          });
          window.scrollTo(0,0)
    }

    return(
        <div className="pay-tile">
            <h1>{PayTitle}</h1>
            <button onClick={handleClick}>Make It Happen</button>
            <button className="back-button" onClick={handleBackClick}>Back to dashboard</button>
        </div>
    );
}
export default  PayTile;