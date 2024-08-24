const axios = require('axios')
const {sendEmail} = require("../middleware/nodeMailer.middleware")
dotenv = require('dotenv')

// Mongoose models
const User = require('../models/userModel')
const Admin = require('../models/adminModel')

// ENV dependencies
dotenv.config()
const CLIENT_URL = process.env.CLIENT_ORIGIN_URL
const WH_SECRET = process.env.STRIPE_WEBHOOK_SECRET
const DOMAIN_PASS = process.env.DOMAIN_PASS
const DOMAIN_USER = process.env.DOMAIN_USER 

// Stripe object 
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-04-10', // Latest at the time
});

exports.createUser = async (req, res) => {
    const { email } = req.body

    if(!email)
      return res.status(400).json({error: "null email submitted"})

    const exists = await User.findOne({ email })

    // If the user has already been created
    if(exists) {
      const upatedUser = await User.deactivateWebsite()
      res.status(200).json({mssg: "User already exists"})
    }
    else {
      try {
        // Create stripe customer
        const customer = await stripe.customers.create({
          email: email
        })
        
        // Create user in db
        const user = await User.createUser(email, customer.id)

        // Update conversion rate information
        await Admin.incrementConversionRate("Created Account")
        await Admin.decrementConversionRate("Only Visited") 
        await Admin.addUserRequestTracker(email)
        
        res.status(200).json(user)
      } catch (err) {
        res.status(400).json({error: err.message})
      }
    }
}

exports.createCheckoutSession = async (req, res) => {
    const { email, priceID, pageID } = req.body
    console.log("Reached the create checkout session endpoing")
    console.log("Email: ", email)
    console.log("Price ID: ", priceID)
    console.log("Page ID:", pageID)
    
    // Later - check if user exists
    // There should never be an instance where the user does not exist because this is a protected route
    //  - only signed in users can access it
    console.log("Pulling user from database with email: ", email)
    const user = await User.findOne({ email })

    try {
      console.log("Creating stripe checkout session")
      const session = await stripe.checkout.sessions.create(
        {
          success_url: `${CLIENT_URL}`,
          cancel_url: `${CLIENT_URL}`,
          customer: user.stripeCustomerID,
          line_items: [
            {
              price: priceID,
              quantity: 1 // Only one subscription is being purchased
            },
          ],
          mode: 'subscription'
        }
      )

      console.log("Stripe checkout session created successfully, updating user with session ID")
      const updatedUser = await User.findOneAndUpdate(
        {email: email}, // Find by email
        { $push: {checkoutSessionIDs: session.id}}, // Push session id
        { new: true} // Return the update user object
      )

      console.log("Returning checkout session URL")
      console.log(session.url)
      res.status(200).json({session_url: session.url})
    } catch (err) {
      console.log(err)
      res.status(400).json({error: err.message})
    }
}

exports.createBillingPortalSession = async (req, res) => {
    const { email } = req.body

    // Later - check if user exists
    // There should never be an instance where the user does not exist because this is a protected route
    //  - only signed in users can access it
    const user = await User.findOne({ email })

    try {
      const session = await stripe.billingPortal.sessions.create(
        {
          customer: user.stripeCustomerID,
          return_url: `${CLIENT_URL}`,
        }
      )

      res.status(200).json({session_url: session.url})
    } catch (err) {
      console.log(err)
      res.status(400).json({error: err.message})
    }
}

exports.createProductCheckoutSession = async (req, res) => {
    const { domainName, price, purchasePrice, email, type } = req.body
    console.log(domainName)
    console.log(price)
    console.log(email)
    // Later - check if user exists
    // There should never be an instance where the user does not exist because this is a protected route
    //  - only signed in users can access it
    
    
    //finding user
    const user = await User.findOne({ email })
    decimalPrice = price*100
    decimalPrice = decimalPrice.toFixed(2)
    //creating product that correlates to the domain in stripe
    let product = await stripe.products.create({
        name: domainName,
        default_price_data:{
            currency: "usd",
            unit_amount_decimal: decimalPrice,
        },
      })
    
    //printing check that object was created and added to products
    let products = await stripe.products.list({
      limit: 12,
    })
    console.log("Before")
    //console.log(product)
    const domainPrice = product.default_price

    //opening checkout seesion through stripe
    try {
      //creating transfer request for name.com
      const session = await stripe.checkout.sessions.create(
        {
          success_url: `${CLIENT_URL}`,
          cancel_url: `${CLIENT_URL}`,
          customer: user.stripeCustomerID,
          line_items: [
            {
              price: domainPrice,
              quantity: 1, // Only one subscription is being purchased
            }
          ],
          mode: 'payment',
          invoice_creation: {
            enabled:true,
            invoice_data:{
              custom_fields:[
                {
                  name: 'type',
                  value: type
                },
                {
                  name: 'domainName',
                  value: domainName
                },{
                  name: 'purchasePrice',
                  value: purchasePrice
                }
              ]
            },
          }
            
          
        }
      )

      //setting product to inactive after search
      console.log("After:")
      product = await stripe.products.update(product.id,
        {
          active: false,
        }
      );

      //printing check that product was set to inactive
      //console.log(product)
      products = await stripe.products.list({
        limit: 12,
      })
      //console.log(products)

      //updating the user in the database
      const updatedUser = await User.findOneAndUpdate(
        {email: email}, // Find by email
        { $push: {checkoutSessionIDs: session.id}}, // Push session id
        { new: true} // Return the update user object
      )
    
      res.status(200).json({session_url: session.url})
    } catch (err) {
      res.status(400).json({error: err.message})
      console.log(err)
    }
}

exports.createSubscriptionCheckoutSession = async (req, res) => {
    const { domainName, price, purchasePrice, email, existance } = req.body
    console.log("This subscription exists", existance)
    //console.log(price)
    //console.log(email)
    // Later - check if user exists
    // There should never be an instance where the user does not exist because this is a protected route
    //  - only signed in users can access it
    
    

    //finding user
    const user = await User.findOne({ email })
    decimalPrice = price*100
    decimalPrice = decimalPrice.toFixed(2)
    //creating product that correlates to the domain in stripe
    let product = await stripe.products.create({
        name: `${domainName} Renewal Subscription`,
        default_price_data:{
            currency: "usd",
            unit_amount_decimal: decimalPrice,
        },
        metadata:{
          purchaseType: 'domain renewal',
          name: domainName,
          purchasePrice,
          existance,
        },
      })
    //printing check that object was created and added to products
    let products = await stripe.products.list({
      limit: 12,
    })
    console.log("Before")
    //console.log(product)
    const domainPrice = product.default_price

    //opening checkout seesion through stripe
    try {
      //creating transfer request for name.com
      const session = await stripe.checkout.sessions.create(
        {
          success_url: `${CLIENT_URL}`,
          cancel_url: `${CLIENT_URL}`,
          customer: user.stripeCustomerID,
          line_items: [
            {
              price_data:{
                currency:"usd",
                product: product.id,
                recurring:{
                  interval:'year'
                },
                unit_amount_decimal: decimalPrice,
              },
              quantity: 1,// Only one subscription is being purchased
            }
          ],
          mode: 'subscription',
          subscription_data:{
            metadata:{
              purchaseType: 'domain renewal',
              name: domainName,
              purchasePrice,
              existance,
            },
          }
        }
      )
      //console.log("yo")
      //console.log("Session:", session)
      //setting product to inactive after search
      //console.log("After:")
      /*product = await stripe.products.update(product.id,
        {
          active: false,
        }
      );*/

      //printing check that product was set to inactive
      //console.log(product)
      products = await stripe.products.list({
        limit: 12,
      })
      //console.log(products)

      //updating the user in the database
      const updatedUser = await User.findOneAndUpdate(
        {email: email}, // Find by email
        { $push: {checkoutSessionIDs: session.id}}, // Push session id
        { new: true} // Return the update user object
      )
    
      res.status(200).json({session_url: session.url})
    } catch (err) {
      res.status(400).json({error: err.message})
      console.log(err)
    }
}

exports.stripeSession = async (req, res) => {
    const { email } = req.body

    const user = await User.findOne({ email })

    try {
      const session = await stripe.checkout.sessions.retrieve(user.checkoutSessionIDs[user.checkoutSessionIDs.length - 1])
      
      console.log(session)
      res.status(200).json({message: "Success"})
    } catch (err) {
      res.status(400).json({error: err.message})
    }
}

exports.cancelAutorenew = async (req, res) => {
  const { email } = req.body

  try{
    const user = await User.findOne({ email })
    
    const websiteID = user.activeWebsiteID

    // Delete website info from db
    for(let i = 0; i < user.websites.length; i ++)
    {
      if(user.websites[i].id === websiteID)
      {
        const subscription = await stripe.subscriptions.cancel(
          user.websites[i].autorenewSubscription
        );
        const updatedUser = await User.setWebsiteAutoRenewValue(email, websiteID, false, "none")
        console.log("Auto renewal canceled", updatedUser)
      }
    }
    await user.save()

    
    
    res.status(200).json({user})
  } catch (error) {
    res.status(503).json({message: "User not found"})
  }
}

exports.webhook = async (req, res) => {
    console.log("webhook endpoint has been reached")
  
    const sig = req.headers['stripe-signature']
    
    let event;
  
    try{
      event = stripe.webhooks.constructEvent(req.body, sig, WH_SECRET)
      //console.log(event)
    }catch (error) {
      res.status(400).send(`Webhook Error: ${error.message}`)
      return;
    }
    console.log("Event Type: " + event.type)
  
    switch (event.type) {
  
      case 'invoice.payment_succeeded':
        const invoice = event.data.object;
        console.log("Invoice payment succeeded for: ", invoice.customer_email)
        console.log("Here is the invoice: ", invoice)

        const email = invoice.customer_email
        const user = await User.findOne({ email })

        
        // Handle domain purchases
        if(invoice.custom_fields!=null){
          console.log("Here are the invoice's custom fields")
          console.log(invoice.custom_fields)

          switch(invoice.custom_fields[0].value) {
            case 'domain':
              console.log("Attempting to purchase domain: ")
              console.log(invoice.custom_fields[1].value)
              //configuring buy domain request
              let domain = {
                "domainName": invoice.custom_fields[1].value
              }
              let purchasePrice = invoice.custom_fields[2].value
              const buyDomainConfig = {
                url: `https://api.name.com/v4/domains/`,
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                auth: {
                  username: DOMAIN_USER,
                  password: DOMAIN_PASS
                },
                data: JSON.stringify({
                  domain,
                  purchasePrice
                })
              }

              console.log("Domain purchase config:")
              console.log(buyDomainConfig)

              console.log("Configuring name server update")
              //configuring update nameservers request
              const nameservers = ["ns1.landingsite.ai","ns2.landingsite.ai","ns3.landingsite.ai","ns4.landingsite.ai"]
              const updateNameServersConfig = {
                url: `https://api.name.com/v4/domains/${invoice.custom_fields[1].value}:setNameservers`,
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  //Authorization: `Bearer ${accessToken}`,
                },
                auth: {
                  username: DOMAIN_USER,
                  password: DOMAIN_PASS
                },
                data: JSON.stringify({
                  nameservers
                })
              }

              console.log("Configuring autorenew config")
              //Disabling AutoRenew
              const disableAutorenewConfig = {
                url: `https://api.name.com/v4/domains/${invoice.custom_fields[1].value}:disableAutorenew`,
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  //Authorization: `Bearer ${accessToken}`,
                },
                auth: {
                  username: DOMAIN_USER,
                  password: DOMAIN_PASS
                }
              }
              
              // Buy/configure domain and update name servers
              try {
                //buying domain
                console.log("Attempting to purchase domain")
                const buyDomain = await axios(buyDomainConfig)

                //updating nameservers
                console.log("Domain purchase request successful. Attempting to update nameserver config")
                const updateNS = await axios(updateNameServersConfig)
                
                // Update user database value
                console.log("Name server config successful. Updating user db state: new domain purchased set to true")
                let updatedUser = await User.setNewDomainValue(email,true)

                //Disabling autorenew for the domain
                console.log("User db state updated. Making request to disable autorenew")
                const disableAutorenew = await axios(disableAutorenewConfig)
                console.log("Auto renew disable request successful")

                console.log("User payment complete and domain successfully purchased: ", buyDomain)
                console.log("Nameservers updated:",updateNS)
                console.log("User updated to have new domain:",updatedUser)
                console.log("Autorenew disabled for the domain:",disableAutorenew)
                
                res.status(200).json({msg: 'payment complete, nameservers updated domain purchased'})
              }
              catch (error)
              {
                console.log(`There was an error trying to purchase ${invoice.custom_fields[1].value} from name.com: `, error)
                res.status(400).json(error)
              }

            break;
            case 'renew':
              const renewConfig = {
                url: `https://api.name.com/v4/domains/${invoice.custom_fields[1].value}:renew`,
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  //Authorization: `Bearer ${accessToken}`,
                },
                auth: {
                  username: DOMAIN_USER,
                  password: DOMAIN_PASS
                },
                data: JSON.stringify({
                  purchasePrice: invoice.custom_fields[2].value
                })
              }
              try{
                const renewDomain = await axios(renewConfig)
                console.log("Renewed domain Successfully",renewDomain)
                const updatedUser = await User.updateWebsiteExpirationDate(email, user.activeWebsiteID, renewDomain.data.domain.expireDate)
                console.log("Website updated to have new expiration date",updatedUser)
                res.status(200).json({message: "domain  renewed successfully"})
              }catch(error){
                console.log(error);
                res.status(404).json({message: `there was a problem renewing ${invoice.custom_fields[1].value}`})
              }
              break;
            default:
                console.log("No processing defined for this purchase")
                res.status(404).json({msg: "No processing defined for this purchase"})
            break;
          }
        }else if (invoice.subscription!=null){
          if(invoice.lines.data[0].price.id=="price_1Pqhk4LFFDwzFn13cbShyHjR"  // Basic monthly
            || invoice.lines.data[0].price.id=="price_1Pqhk4LFFDwzFn130MqFiqLx" // Basic yearly
            || invoice.lines.data[0].price.id == "price_1PqhkKLFFDwzFn13praxrtI6" // Premium monthly
            || invoice.lines.data[0].price.id == "price_1PqhkJLFFDwzFn132MkTz9wh" // Premium yearly
          ){
  
            const websiteID = user.activeWebsiteID
            const subscription = invoice.lines.data[0].subscription
  
            try{
              await User.updateWebsiteSubscription(email, websiteID, subscription)
              console.log("Updating subscription for ", email)
              console.log("Website ID: ", websiteID)
              console.log("Subscription ID: ", subscription)
  
              updatedUser = await User.activateNewPageRequest(email, websiteID)
  
              await Admin.activateUserRequest(email)
  
              // Update admin subscription data
              await Admin.addSubscriptionActivation(Date.now())

              const emails = ["ai@quikwebsites.com"]
              const subject = `New page request`
              const text = `${email} has requested a new web page`
              const textHTML = `<h1>New Page Request</h1>
                                <p>${email} has requested a new web page</p>`

              await sendEmail(emails, subject, text, textHTML)

              console.log("Attempting to increment subscription")
              console.log(invoice.lines.data[0].price.id)
              
              if(invoice.lines.data[0].price.id == "price_1Paq5FLFFDwzFn133AohUYYa" || invoice.lines.data[0].price.id == "price_1PnRr4LFFDwzFn132BexoRlr")
              {
                console.log("Incrementing basic subscription") 
                await Admin.incrementConversionRate("Basic Subscription")
              } 
              else if(invoice.lines.data[0].price.id == "price_1Paq5XLFFDwzFn134TgokxKv" || invoice.lines.data[0].price.id == "price_1PnS7GLFFDwzFn13jP3VIG1C")
              {
                console.log("Incrementing premium subscription")
                await Admin.incrementConversionRate("Premium Subscription")
              }
  
              res.status(200).json(updatedUser)
            }
            catch (error) {
              console.log("There was an error handling the invoice: ", error)
              res.status(400).json(error)
  
            }
          }else{ // Set up auto renewal
            console.log("Setting up auto renewal")
            console.log("Price ID:  ",invoice.lines.data[0].metadata)
            let email = invoice.customer_email
            console.log(email)
            
            console.log("Creating autorenew config")
            const renewConfig = {
              url: `https://api.name.com/v4/domains/${invoice.lines.data[0].metadata.name}:renew`,
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              auth: {
                username: DOMAIN_USER,
                password: DOMAIN_PASS
              },
              data: JSON.stringify({
                purchasePrice: invoice.lines.data[0].metadata.purchasePrice
              })
            }
            console.log(renewConfig)

            try{
              const user = await User.findOne({ email })
       	 
              console.log("Making autorenewal external request")
              const renewedDomain = await axios(renewConfig)
              console.log("Domain renewed:",renewedDomain)
              //const expUpdated = await User.updateWebsiteExpirationDate(email, user.activeWebsiteID, renewedDomain.data.domain.expireDate)
              //console.log("Website updated to have new expiration date",expUpdated)
              //const updatedUser = await User.setWebsiteAutoRenewValue(email, user.activeWebsiteID, true, invoice.lines.data[0].subscription)
              //console.log("Website updated to have autorenew:",updatedUser)
              console.log("existance", invoice.lines.data[0].metadata.existance)
              if(invoice.lines.data[0].metadata.existance == "false"){
                let updatedUser = await User.setNewAutorenewalValue(email,true)
                updatedUser = await User.setNewAutornewID(email, invoice.lines.data[0].subscription)
                console.log("user updated to know about new autorenewal plan")
                const subscription = await stripe.subscriptions.update(
                  invoice.lines.data[0].subscription,
                  {
                    metadata: {
                      name: invoice.lines.data[0].metadata.name,
                      purchasePrice: invoice.lines.data[0].metadata.purchasePrice,
                      existance:true
                    },
                  }
                );
                
                console.log(subscription)
    
              }
             res.status(200).json(renewedDomain)
            }catch(error){
              console.log("Could not update auto renewal value - Name.com may have responded with status 500 upon renewal request")
              console.log(error)
              let updatedUser = await User.setNewAutorenewalValue(email,true)
              res.status(400).json(error)
            }
          }
        }
  
      break;
  
      case "customer.subscription.updated":
          console.log("A subscription was updated")
          const updatedSubscription = event.data.object;

          console.log("============= subscription stuff")
          console.log(updatedSubscription)

          // If the user cancelled
          if(updatedSubscription.cancel_at)
          {
            console.log("Adding subscription cancellation")

            // Log the cancellation
            await Admin.addSubscriptionCancellation(Date.now())
  
            try {
              // Delete user website
              const user = await User.findOne({stripeCustomerID: updatedSubscription.customer})
  
              for(let i = 0; i < user.websites.length; i ++)
              {
                if(user.websites[i].subscription == updatedSubscription.id)
                {
                  const subscription = await stripe.subscriptions.cancel(user.websites[i].subscription);

                  // Cancel stripe autorenewal subscription
                  await stripe.subscriptions.cancel(
                    user.websites[i].autorenewSubscription
                  );
  
                  // Update website status to 'deleted'
                  await User.deleteWebsiteStatus(email, user.websites[i].id)

                  const request = {
                    requestType: 'delete-page',
                    active: true,
                    body: {
                      domain: user.websites[i].domain,
                    }
                  }
            
                  await User.addUserRequest(email, websiteID, request)

                  await Admin.activateUserRequest(email) // Add to admin db

                  break
                }
              }
              
              await user.save()

              const emails = ["ai@quikwebsites.com"]
              const subject = `Page deletion request`
              const text = `${user.email} has requested a page deletion`
              const textHTML = `<h1>Page Deletion Request</h1>
                                <p>${user.email} has requested a page deletion</p>`

              await sendEmail(emails, subject, text, textHTML)

              
              console.log("Decrementing conversion rate")
              if(updatedSubscription.plan.id == "price_1Paq5FLFFDwzFn133AohUYYa" || updatedSubscription.plan.id == "price_1PnRr4LFFDwzFn132BexoRlr")
              {
                console.log("Basic")
                await Admin.decrementConversionRate("Basic Subscription")
              } 
              else if(updatedSubscription.plan.id == "price_1Paq5XLFFDwzFn134TgokxKv" || updatedSubscription.plan.id == "price_1PnS7GLFFDwzFn13jP3VIG1C")
              {
                console.log("Premium")
                await Admin.decrementConversionRate("Premium Subscription")
              }
                

            } catch (err) {
              console.log(err)
            }
          }
          
          break;
      default:
        console.log("Received event went unhandled. No handling process defined.")
        break;
    }
    //res.status(200).send("Webhook received")
}