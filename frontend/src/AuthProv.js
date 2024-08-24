import { Auth0Provider } from "@auth0/auth0-react";

export const AuthProv = ({ children }) => {
    
    // Public environment variables
    const domain = "dev-2v12rbgkxr8wwust.us.auth0.com"
    const clientId = "cTS8zSUnJDxdNQtY4G6RZO8Oz0Lm3noD"
    const redirectUri = "https://www.quikwebsites.com"
    const audience = "QSserver"
    //console.log(domain)
    //console.log(clientId)
    //console.log(redirectUri)
    //console.log(audience)
    
      if (!(domain && clientId && redirectUri && audience)) {
        return null;
      }

      return (
        <Auth0Provider
          domain={domain}
          clientId={clientId}
          authorizationParams={{
            audience: audience,
            redirect_uri: redirectUri,
          }}
        >
          {children}
        </Auth0Provider>
      )
}