import React from 'react'
import { usePageContext } from "../../context/PageContext" 
import './ProgressTile.css'

const ProgressText = "You're website is in the works! Our staff will have it published within 24 hours"

const ProgressTile = () => {
  const [, dispatch] = usePageContext()

  const handleClick = () => {
    dispatch({
      type: "SET_PAGE",
      page: "user",
    });
  }

  return (
    <div className="progress-tile">
        <h1>{ProgressText}</h1>
        <button onClick={handleClick} className="dashboard-button">Back to Dashboard</button>
    </div>
  )
}

export default ProgressTile