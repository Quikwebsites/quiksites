import DomainSearchTile from "../components/DomainSearchTile/DomainSearchTile";
import { callExternalApi } from "./external-api.service";

// Development
//const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

// Deployment
const apiServerUrl = "https://quiksites-backend-zzx5r2pxva-uc.a.run.app"
//const apiServerUrl = "http://localhost:4000"

export const logPageLoad = async () => {
  const config = {
    url: `${apiServerUrl}/log-page-load`,
    method: "GET",
  }

  const { data, error } = await callExternalApi({ config })

  return {
    data: data || null,
    error,
  };
}

// Get user requests from admin db
export const getUserRequests = async (accessToken) => {
  const config = {
    url: `${apiServerUrl}/get-user-requests`,
    method: "GET",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
    }
  }

  const { data, error } = await callExternalApi({ config })

  return {
    data: data || null,
    error,
  };
}

// Get user request from user db
export const getUserPageRequests = async (accessToken, email, website_id) => {
  const config = {
    url: `${apiServerUrl}/get-user-page-requests`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${accessToken}`,
    },
    data: JSON.stringify({
      email,
      website_id,
    })
  }

  const { data, error } = await callExternalApi({ config })
  return {
    data: data || null,
    error
  }
}

export const updateUserUrl = async (accessToken, email, website_id, url) => {
  const config = {
    url: `${apiServerUrl}/update-user-url`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${accessToken}`,
    },
    data: JSON.stringify({
      email,
      website_id,
      url
    })
  }

  const { data, error } = await callExternalApi({ config })
  return {
    data: data || null,
    error
  }
}

export const getWebsiteTraffic = async (accessToken) => {
  const config = {
    url: `${apiServerUrl}/get-web-traffic`,
    method: "GET",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
    }
  }

  const { data, error } = await callExternalApi({ config })

  return {
    data: data || null,
    error,
  };
}

export const getLifetimeValue = async (accessToken) => {
  const config = {
    url: `${apiServerUrl}/get-lifetime-value`,
    method: "GET",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
    }
  }

  const { data, error } = await callExternalApi({ config })

  return {
    data: data || null,
    error,
  };
}

export const getSubscriptionActivations = async (accessToken) => {
  const config = {
    url: `${apiServerUrl}/get-subscription-activations`,
    method: "GET",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
    }
  }

  const { data, error } = await callExternalApi({ config })

  return {
    data: data || null,
    error,
  };
}

export const getSubscriptionCancellations = async (accessToken) => {
  const config = {
    url: `${apiServerUrl}/get-subscription-cancellations`,
    method: "GET",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
    }
  }

  const { data, error } = await callExternalApi({ config })

  return {
    data: data || null,
    error,
  };
}

export const getConversionRates = async (accessToken) => {
  const config = {
    url: `${apiServerUrl}/get-conversion-rates`,
    method: "GET",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
    }
  }

  const { data, error } = await callExternalApi({ config })

  return {
    data: data || null,
    error,
  };
}

export const updateConversionRates = async (accessToken, newPlan) => {
  const config = {
    url: `${apiServerUrl}/update-conversion-rates`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${accessToken}`,
    },
    data: JSON.stringify({
      newPlan,
    })
  }

  const { data, error } = await callExternalApi({ config });

  return {
    data: data || null,
    error,
  };
}

export const deleteWebpage = async (accessToken, email) => {
  const config = {
    url: `${apiServerUrl}/delete-user-page`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${accessToken}`,
    },
    data: JSON.stringify({
      email
    })
  }

  const { data, error } = await callExternalApi({ config })
  return {
    data: data || null,
    error
  }
}

// This is not used - only for development purposes
export const checkDomainAvailability = async (accessToken, domain) => {
  const config = {
    url: `${apiServerUrl}/check-domain-availability`,
    method: "GET",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
    }
  };

  const { data, error } = await callExternalApi({ config });

  if(data)
    console.log(data)

  if(error)
    console.log(error)

  return {
    data: data || null,
    error,
  };
}

// Search name.com API for domains associated with the keyword
export const searchForDomains = async (accessToken, keyword) => {
  const config = {
    url: `${apiServerUrl}/search-for-domains`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${accessToken}`,
    },
    data: JSON.stringify({
      keyword
    })
  }
  
  const { data, error } = await callExternalApi({ config })

  if(data)
    console.log(data)

  return {
    data: data || null,
    error
  }
}

export const getDomainInfo = async (accessToken, domain) => {
  const config = {
    url: `${apiServerUrl}/get-domain-info`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${accessToken}`,
    },
    data: JSON.stringify({
      domain
    })
  }
  const { data, error } = await callExternalApi({ config })
  //console.log(data)
  //console.log(error)
  return {
    data: data || null,
    error
  }
}

export const createUser = async (accessToken, email) => {
  const config = {
    url: `${apiServerUrl}/create-user`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${accessToken}`,
    },
    data: JSON.stringify({
      email,
    })
  }

  const { data, error } = await callExternalApi({ config });

  return {
    data: data || null,
    error,
  };
}

export const getUserWebpages = async (accessToken, email) => {
  const config = {
    url: `${apiServerUrl}/get-user-webpages`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${accessToken}`,
    },
    data: JSON.stringify({
      email,
    })
  }

  const { data, error } = await callExternalApi({ config });

  return {
    data: data || null,
    error,
  };
}

export const getActiveUserWebpage = async (accessToken, email) => {
  const config = {
    url: `${apiServerUrl}/get-active-user-webpage`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${accessToken}`,
    },
    data: JSON.stringify({
      email,
    })
  }

  const { data, error } = await callExternalApi({ config });

  return {
    data: data || null,
    error,
  };
}

export const getUserSubscriptionType = async (accessToken, email) => {
  const config = {
    url: `${apiServerUrl}/get-user-subscription-type`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${accessToken}`,
    },
    data: JSON.stringify({
      email,
    })
  }

  const { data, error } = await callExternalApi({ config });

  return {
    data: data || null,
    error,
  };
}

// Resolve the request at a certain index within the request array
export const resolveRequest = async (accessToken, email, website_id, index) => {
  const config = {
    url: `${apiServerUrl}/resolve-request`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${accessToken}`,
    },
    data: JSON.stringify({
      email,
      website_id,
      index,
    })
  }

  const { data, error } = await callExternalApi({ config });

  return {
    data: data || null,
    error,
  };
}

// Reopen the request at a certain index within the request array
export const reopenRequest = async (accessToken, email, website_id, index) => {
  const config = {
    url: `${apiServerUrl}/reopen-request`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${accessToken}`,
    },
    data: JSON.stringify({
      email,
      website_id,
      index,
    })
  }

  const { data, error } = await callExternalApi({ config });

  return {
    data: data || null,
    error,
  };
}

export const searchForUsers = async (accessToken, email) => {
  const config = {
    url: `${apiServerUrl}/search-for-users`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${accessToken}`,
    },
    data: JSON.stringify({
      email,
    })
  }

  const { data, error } = await callExternalApi({ config });

  return {
    data: data || null,
    error,
  };
}

export const createProductAndUserSession = async (accessToken, domainName, price, purchasePrice, email, type) => {
  const config = {
    url: `${apiServerUrl}/create-product-and-checkout-session`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${accessToken}`,
    },
    data: JSON.stringify({
      domainName,
      price,
      purchasePrice,
      email,
      type,
    })
  }
  const { data, error } = await callExternalApi({ config })

  window.location = data.session_url

  return {
    data: data || null,
    error
  }
}

export const createSubscriptionAndUserSession = async (accessToken, domainName, price, purchasePrice, email, existance) => {
  const config = {
    url: `${apiServerUrl}/create-subscription-and-checkout-session`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${accessToken}`,
    },
    data: JSON.stringify({
      domainName,
      price,
      purchasePrice,
      email,
      existance,
    })
  }
  const { data, error } = await callExternalApi({ config })

  window.location = data.session_url

  return {
    data: data || null,
    error
  }
}

export const createUserSession = async (accessToken, email, priceID, pageID) => {
  const config = {
    url: `${apiServerUrl}/create-checkout-session`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${accessToken}`,
    },
    data: JSON.stringify({
      email,
      priceID,
      pageID
    })
  }
  const { data, error } = await callExternalApi({ config })

  window.location = data.session_url

  return {
    data: data || null,
    error
  }
}

// Send request to backend to change user plan to specified priceID
// Sends request to admin
export const changeUserPlanRequest = async (accessToken, email, newPlan) => {
  const config = {
    url: `${apiServerUrl}/request-plan-change`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${accessToken}`,
    },
    data: JSON.stringify({
      email,
      newPlan,
    })
  }

  const { data, error } = await callExternalApi({ config })

  return {
    data: data || null,
    error
  }
}

export const cancelAutoRenewSubscription = async (accessToken, email) => {
	const config = {
  	url: `${apiServerUrl}/cancel-autorenew`,
  	method: 'POST',
  	headers: {
    	'Content-Type': 'application/json',
    	"Authorization": `Bearer ${accessToken}`,
  	},
  	data: JSON.stringify({
    	email
  	})
	}

  const { data, error } = await callExternalApi({ config })

  return {
    data: data || null,
    error
  }
  
}

export const getNewDomainBool = async (accessToken, email) => {
  const config = {
    url: `${apiServerUrl}/get-new-domain-bool`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${accessToken}`,
    },
    data: JSON.stringify({
      email
    })
  }
  const { data, error } = await callExternalApi({ config })

  return {
    data: data || null,
    error
  }
}

export const getAutorenewalBool = async (accessToken, email) => {
  const config = {
    url: `${apiServerUrl}/get-new-autorenewal-bool`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${accessToken}`,
    },
    data: JSON.stringify({
      email
    })
  }
  const { data, error } = await callExternalApi({ config })

  return {
    data: data || null,
    error
  }
}

export const activateUserWebsite = async (accessToken, email, websiteID) => {
  const config = {
    url: `${apiServerUrl}/activate-website`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${accessToken}`,
    },
    data: JSON.stringify({
      email,
      websiteID
    })
  }
  const { data, error } = await callExternalApi({ config })

  return {
    data: data || null,
    error
  }
}

export const deactivateUserWebsite = async (accessToken, email) => {
  const config = {
    url: `${apiServerUrl}/deactivate-website`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${accessToken}`,
    },
    data: JSON.stringify({
      email
    })
  }
  const { data, error } = await callExternalApi({ config })

  return {
    data: data || null,
    error
  }
}

export const createBillingPortalSession = async (accessToken, email) => {
  const config = {
    url: `${apiServerUrl}/create-billing-portal-session`,  
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${accessToken}`,
    },
    data: JSON.stringify({
      email
    })
  }

  const { data, error } = await callExternalApi({ config })

  if(data)
    console.log(data)

  if(error)
    console.log(error)

  //window.location = data.session_url

  return {
    data: data || null,
    error
  }
}

export const newWebpageRequest = async (accessToken, email, businessName, fullDescription, description, style, domain,autoRenew, domainExpDate, renewalPrice) => {
  const config = {
    url: `${apiServerUrl}/new-page-request`,
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${accessToken}`,
    },
    data: JSON.stringify({
      email,
      businessName, 
      fullDescription, 
      description, 
      style,
      domain,
      autoRenew,
      domainExpDate,
      renewalPrice
    })
  }

  const { data, error } = await callExternalApi({ config });
  
  return {
    data: data || null,
    error
  }
}

export const pageEditRequest = async (accessToken, email, requestBody) => {
  const config = {
    url: `${apiServerUrl}/add-page-edit-request`,
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${accessToken}`,
    },
    data: JSON.stringify({
      email,
      requestBody,
    })
  }

  const { data, error } = await callExternalApi({ config });
  
  return {
    data: data || null,
    error
  }
}

// Ping server public resource
export const getPublicResource = async () => {
    const config = {
      url: `${apiServerUrl}/ping`,
      method: "GET",
    };

    console.log("Public resource")
    const { data, error } = await callExternalApi({ config });

    if(data)
      console.log(data);

    if(error)
    console.log(error)

    return {
      data: data || null,
      error,
    };
  };


  export const getProtectedResource = async (accessToken) => {
    const config = {
      url: `${apiServerUrl}/protected-ping`,
      method: "GET",
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
    };
    
    console.log("Protected resource")
    const { data, error } = await callExternalApi({ config });

    if(data)
        console.log(data);

    if(error)
      console.log(error)
  
    return {
      data: data || null,
      error,
    };
  };
  
  export const getAdminResource = async (accessToken) => {
    const config = {
      url: `${apiServerUrl}/admin-ping`,
      method: "GET",
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
    };
  
    const { data, error } = await callExternalApi({ config });

    return {
      data: data || null,
      error,
    };
  };
  