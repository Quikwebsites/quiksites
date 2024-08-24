import React, {useEffect, useState} from 'react';
import {getActiveUserWebpage, createSubscriptionAndUserSession, createProductAndUserSession, cancelAutoRenewSubscription} from "../../services/message.service.js"
import { useAuth0 } from "@auth0/auth0-react"

const AutorenewSet= () => {
	const {user, getAccessTokenSilently} = useAuth0()
	const [activeWebsite, setActiveWebsite] = useState({})
	const [renewPrice, setRenewPrice] = useState(null)
	const [maxLease, setMaxLease] = useState(false)
	const userEmail = user.email
	//const userEmail = "test1@email.com"
    
    
	const serviceFee = .1
	let itemPrice = null
	const getActivePage = async () => {
		const accessToken = await getAccessTokenSilently()
    	let { data, error } = await getActiveUserWebpage(accessToken, userEmail)
   	 
    	if(data)
    	{
        	setActiveWebsite(data.website)
        	 
    	}
   	 
	}
	const getRenewPrice = ()=> {
    	let itemPrice = parseFloat(activeWebsite.renewalPrice) + parseFloat(activeWebsite.renewalPrice * serviceFee)
    	setRenewPrice(itemPrice.toFixed(2))
    	console.log("renewal price",renewPrice)
    	console.log("active website",activeWebsite)
	}
	const getMaxLease = ()=> {
    	const expDate = new Date(activeWebsite.domainExpDate)
    	const expYear = expDate.getFullYear()
    	const currDate = new Date()
    	const currYear = currDate.getFullYear()
    	const timeLeft = expYear - currYear
    	console.log(timeLeft)
    	if(timeLeft>7){
        	setMaxLease(true)
    	}else{
        	setMaxLease(false)
    	}
	}
	const handleSetUp = async () => {
		const accessToken = await getAccessTokenSilently()
    	await createSubscriptionAndUserSession(accessToken, activeWebsite.domain,renewPrice,activeWebsite.renewalPrice,userEmail,true)
	}
	const handleRenew = async () => {
    	//console.log("yo")
		const accessToken = await getAccessTokenSilently()
    	await createProductAndUserSession(accessToken, activeWebsite.domain, renewPrice, activeWebsite.renewalPrice, userEmail,"renew")
	}
	const handleCancel = async () => {
		const accessToken = await getAccessTokenSilently()
    	await cancelAutoRenewSubscription(accessToken, userEmail)

		window.location.reload()
	}
	useEffect(()=>{
    	getActivePage()
	},[])
	useEffect(()=>{
    	getRenewPrice()
    	getMaxLease()
	},[activeWebsite])
	/*return(
    	activeWebsite?null:!activeWebsite.domain?(
        	<div className="autorenew-set subpage">
            	<h3>You Do Not Have a Domain</h3>
            	<p>You need a domain to host your website</p>
            	<button>buy domain</button>
        	</div>
    	):activeWebsite.autoRenew?(
        	<div className="autorenew-set subpage">
        	</div>
    	):(
        	<div className="autorenew-set subpage">
            	<h3>Your Current Domain</h3>
            	<p>{activeWebsite.domain}</p>
            	<h3>Your Domain's Expiration Date</h3>
            	<p>{activeWebsite.domainExpDate}</p>
            	<p className="warning">If you let your domain expire there will be no way to visit your page</p>
            	<h3>Renewal Cost</h3>
            	<p>{renewPrice}</p>
            	<div>
            	<button>Renew Domain</button>
            	<button onClick={handleSetUp}>Set Up Autorenew</button>
            	</div>
        	</div>
    	)
    	);*/
    	return(
        	<div className="autorenew-set subpage">
            	{activeWebsite?activeWebsite.autoRenew?(
            	<div>
                	<h3>Your Current Domain</h3>
                	<p>{activeWebsite.domain}</p>
                	<h3>You are set up to autorenew, your domain will not expire</h3>
                	<button onClick={handleCancel}>Cancel Autorenew</button>
            	</div>
            	):(
            	<div>
                	<h3>Your Current Domain</h3>
                	<p>{activeWebsite.domain}</p>
                	<h3>Your Domain's Expiration Date</h3>
                	<p>{activeWebsite.domainExpDate}</p>
                	<p className="warning">If you let your domain expire there will be no way to visit your page</p>
                	<h3>Renewal Cost</h3>
                	<p>{renewPrice}</p>
                	<div>{maxLease?(
                        	<div>
                            	<p>You have maxed out your renewals</p>
                        	</div>
                    	):(
                        	<div>
                            	<button onClick={handleRenew}>Renew Domain</button>
                            	<button onClick={handleSetUp}>Set Up Autorenew</button>
                        	</div>
                    	)}
                   	 
                	</div>
            	</div>
            	):null}
        	</div>
    	);
}
export default AutorenewSet
