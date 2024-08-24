import React, { useEffect } from 'react'

// Page Components
import Navbar from '../components/Navbar/Navbar'
import Intro from '../sections/Intro/Intro'
import Examples from '../sections/Examples/Examples'
import Tutorial from '../sections/Tutorial/Tutorial'
import Argument from '../sections/Argument/Argument'
import Pricing from '../sections/Pricing/Pricing'
import PricingPage from '../sections/Pricing/PricingPage'
import Start from '../sections/Start/Start'
import AdRight from '../sections/AdRight/AdRight'
import AdLeft from '../sections/AdLeft/AdLeft'

import { getPublicResource, getProtectedResource, getAdminResource, logPageLoad } from '../services/message.service'

const Home = () => {
    
    const pageLoad = async () => {
      await logPageLoad()
    }

    useEffect(() => {
      pageLoad()
    }, [])

  return (
    <div>
      <Navbar />
      <Intro />
      <Examples />
      <Tutorial />
      <Start />
      <Argument />
      <Pricing />
      <AdLeft/>
    </div>
  )
}

export default Home