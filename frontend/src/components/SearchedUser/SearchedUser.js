
import { usePageContext } from '../../context/PageContext'

import "./SearchedUser.css"

const SearchedUser = ({item}) => {

    const [,dispatch] = usePageContext()

    const handleEdit = () => {
    	dispatch({
        	type: "SET_ADMIN_USER",
        	admin_user: item.email,
      	});
    	dispatch({
        	type: "SET_ADMIN_VIEW",
        	admin_view: "AdminUser",
      	});
      	window.scrollTo(0,0)
	}

    return(
    <div>{item.email == "" || item.email == null ? (null)
        : (
            <div className="searched-user">
                <p><strong>Email: </strong>{item.email}</p>
                <p><strong>Stripe Customer ID: </strong>{item.stripeCustomerID}</p>
                <h3>Websites:</h3>
                <div>
                {item.websites.length > 0 ? item.websites.map((instance, index)=>(
                    <div key={index}>
                        <p>______________________________</p>
                        <p><strong>Domain: </strong>{instance.domain}</p>
                        <p><strong>Buisness Name: </strong>{instance.businessName}</p>
                        <p><strong>Payment State: </strong>{instance.status}</p>
                        <p><strong>Subscription: </strong>{instance.subscription}</p>
                        <p><strong>URL: </strong>{instance.url}</p>
                    </div>
                )) : (
                    <p>No websites yet</p>
                )}
                </div>
                <button onClick={handleEdit}>Make Changes</button>
            </div>
        )}
     </div>
    );
}
export default SearchedUser