const {sendEmailTest, sendEmail} = require("../middleware/nodeMailer.middleware")
const { v4: uuidv4 } = require('uuid'); // For webpage ID generation

// Mongoose models
const User = require('../models/userModel')
const Admin = require('../models/adminModel')

// Stripe object 
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-04-10', // Latest at the time
});

exports.newPageRequest = async (req, res) => {
    try{
      let updatedUser = null
  
      const { email, businessName, description, fullDescription, style, domain, autoRenew, domainExpDate, renewalPrice } = req.body
      const type = "initial_message"
      const user = await User.findOne({email})
      const alreadyExists = await User.findOne({ 'websites.domain': domain})
     
      console.log("already exists:")
      console.log(alreadyExists)
      if(alreadyExists){
        res.status(200).json({msg: "website already exists"})
      }else{
  
        const webpage_id = uuidv4()
        
        let websiteObject = null;
  
        if(user.newDomain){
          websiteObject = {
            id: webpage_id,
            url: "",
            domain: domain,
            domainExpDate,
            autoRenew:user.newAutorenewal,
            autorenewSubscription: user.newAutorenewalID,
            renewalPrice ,
            businessName: businessName,
            status: "no_payment", 
            subscription: "none"
          }
          await User.setNewDomainValue(email,false)
        }else{
          websiteObject = {
            id: webpage_id,
            url: "",
            domain: "",
            businessName: businessName,
            status: "no_payment", 
            subscription: "none", 
          }
  
        }
        const emails = [email, "ai@quikwebsites.com"]
        const subject = `${email} has requested a new website`
        const text = `${email} would like anew website for their business, ${businessName}`
        const textHTML = `<h1>New Website Requested<h1>
                          <h2>Customer</h2>
                          <p>${email}</P>
                          <h2>Details</h2> 
                          <ul>
                            <li>
                              Website id: ${websiteObject.id}
                            </li>
                            <li>
                              Website url: ${websiteObject.url}
                            </li>
                            <li>
                              Website domain: ${websiteObject.domain}
                            </li>
                            <li>
                              Domain exp date: ${websiteObject.domainExpDate}
                            </li>
                            <li>
                              Domain autorenew: ${websiteObject.autoRenew}
                            </li>
                            <li>
                              Domain renewal price: ${websiteObject.renewalPrice}
                            </li>
                            <li>
                              Business name: ${websiteObject.business}
                            </li>
                            <li>
                              Status: ${websiteObject.status}
                            </li>
                            <li>
                              Subscription: ${websiteObject.subscription}
                            </li>
                          </ul>`
        if(user.newAutorenewal){
          updatedUser = await User.setNewAutorenewalValue(email,false)
        }

        if(user.newAutorenewalID)
        {
          updateduser = await User.setNewAutornewID(email, "")
        }

        updatedUser = await User.addUserWebsite(email, websiteObject)
        await sendEmail(emails,subject,text,textHTML)
  
        // Add the user request to the user dashboard
        const webpageRequest = {
          requestType: "new-page",
          active: false, // Nonactive until the user pays for the subscription
          body: {
            businessName: businessName,
            description: description,
            fullDescription: fullDescription,
            style: style,
            domain: domain,
          }
        }
  
        await User.addUserRequest(email, webpage_id, webpageRequest)
  
        res.status(200).json(updatedUser)
      }
    }catch(err){
      console.log(err)
      res.status(400).json({error: err.message})
    }
}

exports.addPageEditRequest = async (req, res) => {
    const { email, requestBody } = req.body
  
    try{
      const user = await User.findOne({ email })
  
      const websiteID = user.activeWebsiteID
  
      // Add request to user db
      const userRequest = {
        requestType: "page-edit",
        active: true,
        body: requestBody
      }
  
      await User.addUserRequest(email, websiteID, userRequest)
  
      await Admin.activateUserRequest(email)

      const emails = ["ai@quikwebsites.com"]
      const subject = `Page edit request`
      const text = `${email} has requested a page edit`
      const textHTML = `<h1>Page Edit Request</h1>
                        <p>${email} has requested a page edit</p>
                        <p><strong>Request: </strong>${requestBody.reqText}</p>`

      await sendEmail(emails, subject, text, textHTML)
  
      res.status(200).json({mssg: "Success"})
    } catch (error) {
      console.log(error)
      res.status(503).json({message: "User not found"})
    }
}

exports.requestPlanChange = async (req, res) => {
  const { email, newPlan } = req.body

  console.log("Received plan change request")
  
    try{
      const user = await User.findOne({ email })
  
      const websiteID = user.activeWebsiteID
  
      // Add request to user db
      const userRequest = {
        requestType: "plan-change",
        active: true,
        body: {
          newPlan: newPlan,
        }
      }
  
      await User.addUserRequest(email, websiteID, userRequest)
  
      await Admin.activateUserRequest(email)
      const emails = ["ai@quikwebsites.com"]
      const subject = `Plan change request`
      const text = `${email} has requested a plan change`
      const textHTML = `<h1>Plan Change Request</h1>
                        <p>${email} has requested a plan change to the ${newPlan} plan</p>`

      await sendEmail(emails, subject, text, textHTML)
  
      res.status(200).json({mssg: "Success"})
    } catch (error) {
      console.log(error)
      res.status(503).json({message: "User not found"})
    }
}

exports.resolveRequest = async (req, res) => {
    const { email, website_id, index } = req.body
  
    try{
      const user = await User.resolveUserRequest(email, website_id, index)
  
      let active_request = false
  
      for(let i = 0; i < user.websites.length; i ++)
      {
        for(let j = 0; j < user.websites[i].requestLogs.length; j ++)
        {
          if(user.websites[i].requestLogs[j].active == true)
          {
            active_request = true
            break
          }
        }
  
        if(active_request)
          break
      }
  
      if(!active_request)
        await Admin.resolveUserRequest(email)
  
      res.status(200).json({user: user})
    } catch (error) {
      console.log(error)
      res.status(503).json({message: "User not found"})
    }
}

exports.reopenRequest = async (req, res) => {
    const { email, website_id, index } = req.body
  
    try{
      const user = await User.reopenUserRequest(email, website_id, index)
  
      let requestType = null
      
      for(let i = 0; i < user.websites.length; i++) {
        if(user.websites[i].id == website_id)
        {
          requestType = user.websites[i].requestLogs[index]
          break
        }
      }
  
      await Admin.activateUserRequest(email) // Add to admin db
  
      res.status(200).json({user: user})
    } catch (error) {
      console.log(error)
      res.status(503).json({message: "User not found"})
    }
}

exports.deleteUserPage = async (req, res) => {
    const { email } = req.body
    console.log(" ================= User delete requested for " + email)
  
    try{
      const user = await User.findOne({ email })
      
      const websiteID = user.activeWebsiteID

      let domain = null
  
      // Delete website info from db
      for(let i = 0; i < user.websites.length; i ++)
      {
        if(user.websites[i].id === websiteID)
        {

          domain = user.websites[i].domain

          if(user.websites[i].subscription !== "none")
          {
            console.log("retrieving subscription object")
            const subscription = await stripe.subscriptions.retrieve(
              user.websites[i].subscription
            );

            console.log(subscription)
            
            try {
              // Cancel stripe plan subscription
              await stripe.subscriptions.cancel(
                user.websites[i].subscription
              );
            }
            catch (err)
            {
              console.log("Error while cancelling primary subscription - it may not be found")
              console.log(err)
            }

            try {
              // Cancel stripe autorenewal subscription
              await stripe.subscriptions.cancel(
                user.websites[i].autorenewSubscription
              );
            }
            catch (err)
            {
              console.log("Error while cancelling renewal subscription")
              console.log(err)
            }

            const priceID = subscription.plan.id;

            console.log("Successfully cancelled both subscriptions - updating conversion rates")

            // Decrement conversion rates
            if(priceID == "price_1Pqhk4LFFDwzFn13cbShyHjR" || priceID == "price_1Pqhk4LFFDwzFn130MqFiqLx")
            {
              console.log("Decrementing basic conversion rate")
              await Admin.decrementConversionRate("Basic Subscription")
            } 
            else if(priceID == "price_1PqhkKLFFDwzFn13praxrtI6" || priceID == "price_1PqhkJLFFDwzFn132MkTz9wh")
            {
              console.log("Decrementing premium conversion rate")
              await Admin.decrementConversionRate("Premium Subscription")
            }
    
          }
          
          // Update website status to 'deleted'
          await User.deleteWebsiteStatus(email, websiteID)
          await Admin.activateUserRequest(email) // Add to admin db

          const emails = ["ai@quikwebsites.com"]
          const subject = `Page deletion request`
          const text = `${email} has requested a page deletion`
          const textHTML = `<h1>Page Deletion Request</h1>
                            <p>${email} has requested a page deletion for</p>`
          
          console.log("Sending admin email notification")
          await sendEmail(emails, subject, text, textHTML)

          const clientEmail = [email]
          const clientSubject = "Deleted Website"
          const clientText = `You have successfully deleted your website. All your subscriptions, 
                              including any renewal subscriptions, have been canceled. Feel free to create 
                              a new website at any point!`
          const clientHTML = `<h1>Deleted website</h1></br></br>
                              <h3>You have successfully deleted your website. </h3></br>
                              <p>All your subscriptions, including any renewal subscriptions, have been canceled.</p><br/>
                              <p>Feel free to create a new website at any point!`

          console.log("Sending client email notification")
          await sendEmail(clientEmail, clientSubject, clientText, clientHTML)
        }
      }
      await user.save()

      const request = {
        requestType: 'delete-page',
        active: true,
        body: {
          domain: domain,
        }
      }

      await User.addUserRequest(email, websiteID, request)

      res.status(200).json({user})
    } catch (err) {
      console.log(err)
      res.status(503).json({message: "User not found"})
    }
}