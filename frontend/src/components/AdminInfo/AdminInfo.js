import React, {useEffect} from 'react';
import AdminNav from "../AdminNav/AdminNav"
import Statistics from "../Statistics/Statistics"
import Navbar from "../Navbar/Navbar"
import UsersAdminView  from "../UsersAdminView/UsersAdminView"
import {usePageContext} from "../../context/PageContext"

import { WebsiteTraffic, 
         ConversionRates, 
         LifetimeValueBrokenUp, 
         LifetimeValue, 
         ChurnRate, 
         ActiveSubscriptions, 
         LineChart } from "../Graphs/Graphs"

import { UserRequests } from "../UserRequests/UserRequests"

import "./AdminInfo.css"

const AdminInfo = () => {
    const [{sub_page}, dispatch] = usePageContext();

    useEffect(() => {
        dispatch({
            type: "SET_SUB_PAGE",
            sub_page: "AdmnData",
          });
	}, [])
    
    return(
    <div>
        <Navbar/>
        <div className = "clear-section">
            
            <div className = "admin-info" >
            <h2>Admin Dashboard</h2>
                <div className="below">
                        <AdminNav/>
                    {sub_page == "AdmnData" ? (
                            <Statistics/>
                    ):sub_page == "AdmnWT" ? (
                        <div className="subpage graphical">
                            <WebsiteTraffic />
                        </div>
                    ):sub_page == "AdmnSUCR" ? (
                        <div className="subpage graphical">
                            <ConversionRates />
                        </div>
                    /*):sub_page == "AdmnCVBD" ? (
                        <div className="subpage graphical">
                            <LifetimeValueBrokenUp/>
                        </div>
                    ):sub_page == "AdmnCVBM" ? (
                        <div className="subpage graphical">
                            <LifetimeValue />
                        </div>*/
                    ):sub_page == "AdmnCR" ? (
                        <div className="subpage graphical">
                            <ChurnRate />
                        </div>
                    ):sub_page == "AdmnNPM" ? (
                        <div className="subpage graphical">
                            <ActiveSubscriptions />
                        </div>
                    ):sub_page == "AdmnUSRS" ?(
                        <UsersAdminView/>
                    ):sub_page == "AdmnReq" ?(
                        <UserRequests />
                    ) : (
                        <h1>Error-Subpage incorrect</h1>  
                    )}
                </div>
            </div>
        </div>
    </div>
    )

}
export default AdminInfo