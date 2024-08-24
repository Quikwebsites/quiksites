
import React from 'react'
import { usePageContext } from '../context/PageContext'
import PayTile from "../components/PayTile/PayTile"
import Navbar from "../components/Navbar/Navbar"

import './PaymentPromptPage.css'

const PaymentPromptPage = () => {
    const [,dispatch] = usePageContext()

    const handleClick = ()=>{
        dispatch({
            type: "SET_PAGE",
            page: "plans",
          });
          window.scrollTo(0,0)
    } 
  return (
    <div>
        <Navbar/>
          <div className="payment-prompt-section">
            <PayTile/>
          </div>
    </div>
  )
}

export default PaymentPromptPage