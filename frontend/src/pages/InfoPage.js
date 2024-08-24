import React, {useState} from 'react'

import Navbar from '../components/Navbar/Navbar'
import DetailTile from "../components/DetailTile/DetailTile"

import './InfoPage.css'

const InfoPage = () => {

    return(
        <div>
            <Navbar/>
            <div className="info-page">
                <DetailTile/>
            </div>
        </div>
    );
}
export default  InfoPage;