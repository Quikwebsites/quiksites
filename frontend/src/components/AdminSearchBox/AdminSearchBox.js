import {useState} from 'react'
import {searchForUsers} from "../../services/message.service"
import SearchedUser from "../SearchedUser/SearchedUser"
import { useAuth0 } from "@auth0/auth0-react"

import "./AdminSearchBox.css"

const AdminSearchBox = ()=> {
    const { getAccessTokenSilently } = useAuth0()
    const [userSearched, setUserSearched] = useState("");
    const [searchResults,setSearchResults] = useState([]);

    const handleSearch = async ()=> {
        const accessToken = await getAccessTokenSilently()
        const { data, error } = await searchForUsers(accessToken, userSearched)
        console.log(data);
        console.log(error);
        setSearchResults(data.user)
        console.log(searchResults)
    }
    return(
        <div className="admin-search-box">
            <div className="search-box">
                <input
                type = "text"
                placeholder = "Search user by email"
                value = {userSearched}
                onChange = {(e) => setUserSearched(e.target.value)} 
                />
                <button onClick={handleSearch}>Search</button>
            </div> 
            {searchResults==[null]?(
                <></>
            ):searchResults == null?(
                <h1>User not found.</h1>
            ):(
                <SearchedUser item={searchResults}/>
            )}
        </div>
       
    );
}
export default AdminSearchBox 