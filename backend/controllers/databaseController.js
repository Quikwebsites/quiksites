// Mongoose models
const User = require('../models/userModel')
const Admin = require('../models/adminModel')

// Stripe object 
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-04-10', // Latest at the time
});

exports.getUserWebpages = async (req, res) => {
    const { email } = req.body
  
        try{
        const user = await User.findOne({ email })
    
        res.status(200).json({websites: user.websites})
        } catch (error) {
        res.status(503).json({message: "User not found"})
        }
}

exports.getActiveUserWebpage = async (req, res) => {
    const { email } = req.body

    try{
        const user = await User.findOne({ email })
    
        const active_website_id = user.activeWebsiteID
    
        let active_website = null
    
        for(let i = 0; i < user.websites.length; i ++)
        {
            if(user.websites[i].id == active_website_id)
            {
            active_website = user.websites[i]
            break
            }
        }
    
        res.status(200).json({website: active_website})
    } catch (error) {
        res.status(503).json({message: "User not found"})
    }
}

exports.getUserSubscriptionType = async (req, res) => {
    const { email } = req.body
    
    try{
      
        const user = await User.findOne({ email })

        const active_website_id = user.activeWebsiteID
      
        let active_website = null
    
        for(let i = 0; i < user.websites.length; i ++)
        {
            if(user.websites[i].id == active_website_id)
            {
              active_website = user.websites[i]
              break
            }
        }

        if(active_website.subscription == "none")
        {
          return res.status(200).json({subscriptionType: "none"})
        }

        //console.log(active_website.subscription)
        const subscription = await stripe.subscriptions.retrieve(
          active_website.subscription
        );

        const priceID = subscription.plan.id;
        
        if(priceID == "price_1Pqhk4LFFDwzFn13cbShyHjR")
        {
          return res.status(200).json({subscriptionType: "basic-monthly"})
        }
        else if(priceID == "price_1Pqhk4LFFDwzFn130MqFiqLx")
        {
          return res.status(200).json({subscriptionType: "basic-yearly"})
        }
        else if(priceID == "price_1PqhkKLFFDwzFn13praxrtI6")
        {
          return res.status(200).json({subscriptionType: "premium-monthly"})
        }
        else if(priceID == "price_1PqhkJLFFDwzFn132MkTz9wh")
        {
          return res.status(200).json({subscriptionType: "premium-yearly"})
        }
        
        res.status(200).json({mssg: "No price id found"})

    } catch (error) {
        console.log(error)
        res.status(503).json({message: "User not found"})
    }
  }


exports.activateWebsite = async (req, res) => {
    const { email, websiteID } = req.body
    
    try {
      updatedUser = await User.activateWebsite(email, websiteID)
      res.status(200).json(updatedUser)
    }catch(err){
      res.status(400).json({error: err.message})
    }
}

exports.getNewDomainBool = async (req, res) => {
    const { email} = req.body
    //console.log(email)
    
    try {
      //console.log(user.newDomain)
      const user = await User.findOne({ email })
      res.status(200).json(user.newDomain)
    }catch(err){
      res.status(400).json({error: err.message})
    }
}

exports.getNewAutorenewalBool = async (req, res) => {
    const { email} = req.body
    //console.log(email)
    
    try {
      //console.log(user.newDomain)
      const user = await User.findOne({ email })
      res.status(200).json(user.newAutorenewal)
    }catch(err){
      res.status(400).json({error: err.message})
    }
}

// Checks if stripe checkout session had successful payment
exports.deactivateWebsite = async (req, res) => {
    const { email } = req.body

    try {
      updatedUser = await User.activateWebsite(email, "")
      res.status(200).json(updatedUser)
    }catch(err){
      res.status(400).json({error: err.message})
    }
}

exports.logPageLoad = async (req, res) => {
    try {
      await Admin.incrementConversionRate("Only Visited") 
      const admin = await Admin.addTrafficData(Date.now())
      res.status(200).json({traffic: admin.websiteTraffic})
    } catch (err) {
      res.status(400).json({error: err.message})
    }
}

exports.getUserRequests = async (req, res) => {
    try {
      const admin = await Admin.findOne({adminIdentifier: "admin-identifier"})
      res.status(200).json({values: admin.requests})
    } catch (err) {
      res.status(400).json({error: err.message})
    }
}

// Retrieve the user requests from the user db
exports.getUserPageRequests = async (req, res) => {
    const { email, website_id } = req.body
    
    try {
      const user = await User.findOne({email})
      let requests = []

      for(let i = 0; i < user.websites.length; i ++)
      {
        if(user.websites[i].id == website_id) {
          requests = user.websites[i].requestLogs
          break
        }
      }

      res.status(200).json({values: requests})
    } catch (err) {
      console.log(err)
      res.status(400).json({error: err.message})
    }
}

exports.updateUserUrl = async (req, res) => {
    const { email, website_id, url } = req.body
    
    try {
      const user = await User.addUserUrl(email, website_id, url)
      res.status(200).json({mssg: "Successfully updated url"})
    } catch (err) {
      console.log(err)
      res.status(400).json({error: err.message})
    }
}

exports.getWebTraffic = async (req, res) => {
    try {
      const admin = await Admin.findOne({adminIdentifier: "admin-identifier"})
      res.status(200).json({traffic: admin.websiteTraffic})
    } catch (err) {
      res.status(400).json({error: err.message})
    }
}

exports.createBlankAdmin = async (req, res) => {
    try {
      const admin = await Admin.createAdminData()
      res.status(200).json(admin)
    } catch (err) {
      res.status(400).json({error: err.message})
    }
}

exports.getLifetimeValue = async (req, res) => {
    try {
      const admin = await Admin.findOne({adminIdentifier: "admin-identifier"})
      res.status(200).json({values: admin.lifetimeValue})
    } catch (err) {
      res.status(400).json({error: err.message})
    }
}

exports.getSubscriptionActivations = async (req, res) => {
    try {
      const admin = await Admin.findOne({adminIdentifier: "admin-identifier"})
      res.status(200).json({values: admin.subscriptionActivations})
    } catch (err) {
      res.status(400).json({error: err.message})
    }
}

exports.getSubscriptionCancellations = async (req, res) => {
    try {
      const admin = await Admin.findOne({adminIdentifier: "admin-identifier"})
      res.status(200).json({values: admin.subscriptionCancellations}) // Returns an array if time stamps which indicate the time the customer was churned
    } catch (err) {
      res.status(400).json({error: err.message})
    }
}

exports.incrementConversionRate = async (req, res) => {
    try {
      await Admin.updateConversionRate("Premium Subscription", 500)
      await Admin.updateConversionRate("Created Account", 500)
      await Admin.updateConversionRate("Basic Subscription", 500)
      const admin = await Admin.updateConversionRate("Only Visited", 500)
      res.status(200).json({values: admin.conversionRates})
    } catch (err) {
      res.status(400).json({error: err.message})
    }
}

exports.getConversionRates = async (req, res) => {
    try {
      const admin = await Admin.findOne({adminIdentifier: "admin-identifier"})
      res.status(200).json({values: admin.conversionRates})
    } catch (err) {
      res.status(400).json({error: err.message})
    }
}

exports.getUserWebpages = async (req, res) => {
  const { email } = req.body

      try{
      const user = await User.findOne({ email })
  
      res.status(200).json({websites: user.websites})
      } catch (error) {
      res.status(503).json({message: "User not found"})
      }
}


exports.updateConversionRates = async (req, res) => {
  const { newPlan } = req.body

  let planToIncrement;
  let planToDecrement;

  console.log("============ Updating conversion rates =================")
  console.log("Incrementing: ", newPlan)

  if(newPlan === "basic")
  {
    planToIncrement = "Basic Subscription"
    planToDecrement = "Premium Subscription"
  }
  else {
    planToIncrement = "Premium Subscription"
    planToDecrement = "Basic Subscription"
  }

  console.log("Plan to increment: ", planToIncrement)
  console.log("Plan to decrement: ", planToDecrement)

  try {
    await Admin.incrementConversionRate(planToIncrement) 
    await Admin.decrementConversionRate(planToDecrement)  
    res.status(200).json({mssg: "Updated conversion rates!"})
  } catch (err) {
    console.log(err)
    res.status(400).json({err})
  } 
}


exports.searchForUsers = async (req, res) => {
    const { email } = req.body

    console.log("Admin user search endpoint met")
    console.log("Searching for user with email: ", email)
    try{
      const user = await User.findOne({ email })

      console.log("Found user: ")
      console.log(user)
  
      res.status(200).json({user})
    } catch (error) {
      console.log("There was an error finding the user. Here is the error message")
      console.log(error)
      res.status(503).json({message: "User not found"})
    }
}