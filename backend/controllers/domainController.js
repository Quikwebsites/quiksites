const axios = require('axios')
const {sendEmail} = require("../middleware/nodeMailer.middleware")
dotenv = require('dotenv')

// ENV dependencies
dotenv.config()
const DOMAIN_PASS = process.env.DOMAIN_PASS
const DOMAIN_USER = process.env.DOMAIN_USER 

exports.searchForDomains = async (req, res) => {
    const { keyword } = req.body

    const config = {
      url: `https://api.name.com/v4/domains:search`, 
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
      },
      auth: {
        username: DOMAIN_USER,
        password: DOMAIN_PASS,
      },
      data: JSON.stringify({
        keyword
      })
    }

    try {
      const { data } = await axios(config)
      let searchResults = data.results

      // Filter out domains that are not purchasable from name.com
      searchResults = searchResults.filter(item => item.hasOwnProperty('purchasable'))
      
      return res.status(200).json({searchResults: searchResults})

    } catch (error) {
      console.log(error)
      return res.status(400).json({error: "Could not retrieve domain availability"})
    }
}

exports.getDomainInfo = async (req, res) => {
  const { domain } = req.body
  console.log("The domain requested was")
  console.log(domain)
  const config = {
    url: `https://api.name.com/v4/domains/${domain}`,
    auth: {
      username: DOMAIN_USER,
      password: DOMAIN_PASS,
    }
  }

  try {
    const domainInfo = await axios(config)
    
    console.log(domainInfo.data)

    res.status(200).json(domainInfo.data)
  } catch (err) {
    console.log(err)

    const emails = ["ai@quikwebsites.com"]
    const subject = `Domain purchase error`
    const text = `There was an error purchasing ${domain} from name.com`
    const textHTML = `<h1>There was an error purchasing the domain</h1>
                      <p><strong>Domain: </strong> ${domain}</p>`

    await sendEmail(emails, subject, text, textHTML)
    res.status(400).json({error: err.message})
  }
}

