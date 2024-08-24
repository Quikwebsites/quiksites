import React, { useEffect } from 'react'
// Page Components
import AdminInfo from '../components/AdminInfo/AdminInfo'
import { AdminRequests } from '../components/AdminRequests/AdminRequests'
import { AdminUserView } from '../components/AdminUserView/AdminUserView'

import {usePageContext} from "../context/PageContext"

const AdminPage = () => {
	const [{admin_view, admin_user}, dispatch] = usePageContext();

	// On page mount, AdminMain subpage is set to default
	useEffect(() => {	
        dispatch({
            type: "SET_ADMIN_VIEW",
            admin_view: "AdminMain",
          });
	}, [])
	
  	return (
    	<div>
			{admin_view == "AdminMain" ? (
				<AdminInfo />
			) : admin_view == "AdminUser" ? (
				<AdminUserView />
			) : admin_view == "AdminReq" ? (
				<AdminRequests />
			) : (
				<h1>Improper subpage</h1>
			)}
			
    	</div>
  	)
}

export default AdminPage