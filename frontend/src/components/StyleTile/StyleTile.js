import React, {useEffect, useState} from 'react'
import './StyleTile.css'
import { usePageContext } from "../../context/PageContext" 

const StyleTile = (props) => {
    const [{ subpage }, dispatch] = usePageContext()
    const [style, setStyle] = useState('') 

    const handleClick = () => {
        const storedData = localStorage.getItem('newPageData')
        let pageData = storedData ? JSON.parse(storedData) : {};

        pageData = {
            ...pageData, 
            'Style': props.selectedstyle
        }

        localStorage.setItem('newPageData', JSON.stringify(pageData))
        
        dispatch({
            type: "SET_PAGE",
            page: "info",
        });
        window.scrollTo(0,0);
    }

    return (
        <div className="style-tile">
            <div className="header"> 
            </div>
            <a>
                <img src={props.imgsrc}></img>
            </a>
            <div className="footer">
                <h3>{props.templatetitle}</h3>
                <p>{props.tidbit}</p>
                <button onClick={handleClick}>Choose Style</button>
            </div>
        </div>
    )
}

export default StyleTile