
import { usePageContext } from '../../context/PageContext.js'

import './PrivacyPolicy.css'

const PrivacyPolicy = () => {
    const [, dispatch] = usePageContext()

    const onClick = () => {

        dispatch({
            type: "SET_PAGE",
            page: "privacy",
        })

        window.scrollTo(0,0)
    }

    return (
        <div className="privacy-section">
            <button onClick={onClick}>Privacy Policy</button>
        </div>
    )
}

export default PrivacyPolicy