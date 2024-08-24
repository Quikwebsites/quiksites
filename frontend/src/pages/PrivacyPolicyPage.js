
import { usePageContext } from '../context/PageContext.js'

import './PrivacyPolicyPage.css'

const PrivacyPolicyPage = () => {
    const [, dispatch] = usePageContext()

    const onClick = () => {
        dispatch({
            type: "SET_PAGE",
            page: "home",
        })

        window.scrollTo(0,0)
    }
    
    return (
        <div className="privacy-policy">
            <h3>Privacy Policy</h3>
            <div className="policy-section">
                <p>
                1. Introduction<br/><br/>
                Welcome to QuikWebsites 
                This Privacy Policy outlines how we collect, use, and share information about you when you engage with our services at 
                quikwebsites.com. By using our Site, you consent to the practices described in this policy.
                </p>
            </div>
            <div className="policy-section">
                <p>
                2. Information We Collect<br/><br/>
                When you use our services, we collect the following types of information:<br/>
                - Basic Data: Name, address, and phone number.<br/>
                - Website Data:I Information about the website we create for you.
                </p>
            </div>

            <div className="policy-section">
                <p>
                **3. Use of Information**<br/><br/>
                We use the information we collect for the following purposes:<br/>
                - To provide and manage the website services we offer.<br/>
                - To communicate with you regarding our services, updates, and promotions.<br/>
                - To post and promote the website we create for you on our social media channels.<br/>
                - To analyze and improve our services.<br/>
                </p>
            </div>

            <div className="policy-section">
                <p>
                4. Sharing and Selling Information<br/><br/>
                We may share and sell your information under the following circumstances: <br/>
                - Social Media: We may post content related to your website on our social media channels. <br/>
                - Business Transactions:In the event of a merger, acquisition, or sale of assets, your information may be transferred to a third party.<br/>
                - Legal Requirements: We may disclose information if required by law or to protect our legal rights.<br/>
                - Data Sales: We may sell or otherwise disclose your information to third parties as part of our business operations.<br/>
                </p>
            </div>

            <div className="policy-section">
                <p>
                5. Data Security<br/><br/>
                We implement reasonable measures to protect your information from unauthorized access or disclosure. However, no method of transmission over the internet or electronic storage is completely secure.
                </p>
            </div>

            <div className="policy-section">
                <p>
                6. Your Choices<br/><br/>
                Welcome to QuikWebsites 
                This Privacy Policy outlines how we collect, use, and share information about you when you engage with our services at 
                quikwebsites.com. By using our Site, you consent to the practices described in this policy.
                </p>
            </div>

            <div className="policy-section">
                <p>
                7. Changes to This Policy<br/><br/>
                You have the right to: <br/>
                - Access and update your basic data. <br/>
                - Opt-out of receiving marketing communications from us.<br/>
                - Request the removal of your information from our databases where applicable.<br/>
                </p>
            </div>

            <div className="policy-section">
                <p>
                8. Contact Us<br/><br/>
                If you have any questions or concerns about this Privacy Policy, please contact us at: support@quikwebsites.com
                </p>
            </div>
            <button onClick={onClick}>Go back</button>
        </div>

    )
}

export default PrivacyPolicyPage