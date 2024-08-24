const mongoose = require('mongoose')
const Schema = mongoose.Schema

const requestObject = {
    requestType: {
        type: String,
        default: "",
    },
    active: {
        type: Boolean,
        default: true,
    },
    body: {
        type: Object,
        default: {},
    }
}

const websiteObject = {
    id: {
        type: String,
        unique: false,
        default: "",
    },
    url: {
        type: String,
        unique: false,
        default: "",
    },
    domain: {
        type: String,
        unique: false,
        default: "",
    },
    domainExpDate:{
        type: String,
        unique:false,
        default:"N/A"
    },
    autoRenew:{
        type: Boolean,
        unique:false,
        default:false
    },
    autorenewSubscription: {
        type: String,
        unique: false,
        default: "none"
    },
    renewalPrice:{
        type: String,
        unique:false,
        default:"N/A"

    },
    businessName: {
        type: String,
        unique: false,
        default: "",
    },
    status: {
        type: String,
        unique: false,
        default: "no_payment", // This can either be active, no_payment, or in_progress
    },
    subscription: {
        type: String,
        unique: false,
        default: "none", 
    },
    requestLogs: {
        type: [requestObject],
        default: []
    } 
}

// User pages must contain the email and the password
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true // Ensure emails are unique
    },
    newDomain: {
        type: Boolean,
        default: false,
    },
    newAutorenewal: {
        type: Boolean,
        default: false,
    }, 
    newAutorenewalID: {
        type: String, 
        default: ''
    },
    websites: {
        type: [websiteObject],
        default: []
    },
    activeWebsiteID: {
        type: String,
        default: "",
    }, 
    stripeCustomerID: { 
        type: String,
        default: null
    },
    checkoutSessionIDs: {
        type: [String],
        default: []
    },  
})

// This function creates a new user in the database. All three parameters are required for the creation to succeed
userSchema.statics.createUser = async function(email, stripeCustomerID) {
    // Check if an email was passed as a parameter
    if(!email)
        throw Error('No email specified for DB creation of user')

    if(!stripeCustomerID)
        throw Error('No stripeID specified for DB creation of user')

    // Check if email is already in DB
    const exists = await this.findOne({ email })

    if(exists) {
        throw Error('This email is already in use')
    }

    const user = await this.create({ email, stripeCustomerID })

    return user
}


userSchema.statics.addUserRequest = async function(email, website_id, request)
{
    const updatedUser = await this.findOneAndUpdate(
        { email: email, 'websites.id': website_id},
        { 
            $push: { 
                'websites.$.requestLogs': request,
            } 
        },
        { new: true }
    )
        
    return updatedUser
    
}

userSchema.statics.resolveUserRequest = async function(email, website_id, index)
{
    const updatedUser = await this.findOneAndUpdate(
        { email: email, 'websites.id': website_id},
        { 
            $set: { 
                [`websites.$.requestLogs.${index}.active`]: false, // Mark request as inactive
            } 
        },
        { new: true }
    )
    
    return updatedUser
}

userSchema.statics.reopenUserRequest = async function(email, website_id, index)
{
    const updatedUser = await this.findOneAndUpdate(
        { email: email, 'websites.id': website_id},
        { 
            $set: { 
                [`websites.$.requestLogs.${index}.active`]: true, // Mark request as inactive
            } 
        },
        { new: true }
    )
    
    return updatedUser
}

userSchema.statics.activateNewPageRequest = async function(email, website_id)
{
    const updatedUser = await this.findOneAndUpdate(
        { email: email, 'websites.id': website_id},
        { 
            $set: { 
                'websites.$.requestLogs.0.active': true, // Activate the first website request
            } 
        },
        { new: true }
    )
    
    return updatedUser
    
}

userSchema.statics.addUserWebsite = async function(email, websiteObject)
{
    const updatedUser = await this.findOneAndUpdate(
        {email: email}, // Find by email
        { $push: {websites: websiteObject}}, // Push new website
        { new: true} // Return the update user object
    )

    return updatedUser
}

userSchema.statics.addUserUrl = async function(email, website_id, url)
{
    const updatedUser = await this.findOneAndUpdate(
        { email: email, 'websites.id': website_id},
        { 
            $set: { 
                'websites.$.url': url,
            } 
        },
        { new: true }
    )
    
}

// This will mark a specified website as "active" in the db
userSchema.statics.activateWebsite = async function(email, websiteID)
{
    const updatedUser = await this.findOneAndUpdate(
        { email: email },
        {activeWebsiteID: websiteID},
        {new: true}
    )

    return updatedUser
}

//adjusts new domain boolean 
userSchema.statics.setNewDomainValue = async function(email, newDomainValue)
{
    const updatedUser = await this.findOneAndUpdate(
        { email: email },
        {newDomain: newDomainValue},
        {new: true}
      )
    
      return updatedUser
}

userSchema.statics.setNewAutorenewalValue = async function(email, newAutorenewalValue)
{
    const updatedUser = await this.findOneAndUpdate(
        { email: email },
        {newAutorenewal: newAutorenewalValue},
        {new: true}
      )
    
      return updatedUser
}

// This will deactivate the active website
userSchema.statics.deactivateWebsite = async function(email)
{
    const updatedUser = await this.findOneAndUpdate(
        { email: email },
        {activeWebsiteID: ""},
        {new: true}
    )

    return updatedUser
}


userSchema.statics.updateWebsiteSubscription = async function(email, websiteID, subscriptionInfo)
{
    const updatedUser = await this.findOneAndUpdate(
        { email: email, 'websites.id': websiteID},
        { 
            $set: { 
                'websites.$.subscription': subscriptionInfo,
                 'websites.$.status': 'in_progress'
            } 
        },
        { new: true }
    )

    return updatedUser
}

// Set status of a webpage to 'deleted'
userSchema.statics.deleteWebsiteStatus = async function(email, websiteID)
{
    const updatedUser = await this.findOneAndUpdate(
        { email: email, 'websites.id': websiteID},
        { 
            $set: { 
                 'websites.$.status': 'deleted'
            } 
        },
        { new: true }
    )

    return updatedUser
}

userSchema.statics.setWebsiteAutoRenewValue = async function(email, websiteID, AutoRenewValue, subscriptionID)
{
	const updatedUser = await this.findOneAndUpdate(
    	{ email: email, 'websites.id': websiteID},
    	{
        	$set: {
            	'websites.$.autoRenew': AutoRenewValue,
            	'websites.$.autorenewSubscription': subscriptionID
           	 
        	}
    	},
    	{ new: true }
	)
    
	if(updatedUser)
	{
    	console.log("Successfully updated user subscription status")
    	return updatedUser
	} else {
    	console.log("Could not update user subscription status")
    	return null
	}
}

userSchema.statics.updateWebsiteExpirationDate = async function(email, websiteID, expirationDate)
{   console.log(email)
	console.log(websiteID)
	console.log(expirationDate)
	const updatedUser = await this.findOneAndUpdate(
    	{ email: email, 'websites.id': websiteID},
    	{
        	$set: {
            	'websites.$.domainExpDate': expirationDate,
        	}
    	},
    	{ new: true }
	)
	console.log(updatedUser)
	if(updatedUser)
	{
    	console.log("Successfully updated website expiraton date")
    	return updatedUser
	} else {
    	console.log("Failed to update website expiration date")
    	return null
	}
}

userSchema.statics.setNewAutornewID = async function(email, newAutorenewalID)
{
	const updatedUser = await this.findOneAndUpdate(
    	{email: email},
    	{ newAutorenewalID},
    	{ new: true}
	)

	return updatedUser
}



module.exports = mongoose.model('User', userSchema)