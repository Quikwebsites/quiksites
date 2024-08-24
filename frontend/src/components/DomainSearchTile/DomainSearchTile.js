import React, { useState } from 'react'

import { searchForDomains } from '../../services/message.service';
import {usePageContext} from "../../context/PageContext"
import SearchItem from "../SearchItem/SearchItem"
import { useAuth0 } from "@auth0/auth0-react"

import './DomainSearchTile.css'

// Need to add a "no domain names found" warning
const DomainSearchTile = ({ buffering }) => {
    const { getAccessTokenSilently } = useAuth0()
    const [keyword, setKeyword] = useState('')
    const [searchResults, setSearchResults] = useState([]) // Initially, this is an empty array
    const [,dispatch] = usePageContext()

    const handleSkip = () => {
        const storedData = localStorage.getItem('newPageData')
        let pageData = storedData ? JSON.parse(storedData) : {};

        if(pageData.Domain)

        pageData = {
            ...pageData, 
            'Domain': ""
        }

        localStorage.setItem('newPageData', JSON.stringify(pageData))

        dispatch({
            type: "SET_PAGE",
            page: "user",
          });
          window.scrollTo(0,0)
    } 
    
    const handleSearch = async () => {
        if(buffering)
            return

        const accessToken = await getAccessTokenSilently()
        const { data, error } = await searchForDomains(accessToken, keyword)
        console.log(data);
        console.log(error);
        setSearchResults(data.searchResults)
    }

    return (
        <div className="domain-search-tile">
            <h1>Search for a website domain</h1>
            <div className="search-box">
                <input
                    type="text"
                    placeholder="Search for domains"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <button onClick={handleSearch}>{buffering ? "Processing, please wait" : "Search"}</button>
                
            </div>
            {!buffering ? (searchResults.map((result, index) => (
                <SearchItem key={index} item={result} />
            ))) : null}
            {/*<button onClick={() => handleSkip()}>Skip</button>*/}
        </div>
    )
}

export default DomainSearchTile
