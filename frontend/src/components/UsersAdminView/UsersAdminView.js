import {useState} from "react"
import AdminSearchBox from "../AdminSearchBox/AdminSearchBox"
import "./UsersAdminView.css"
const UsersAdminView = () => {

    return(
        <div className="users-admin-view">
            <AdminSearchBox/>
        </div>
    );
} 
export default UsersAdminView