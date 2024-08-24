import React from 'react'
import './ImageTile.css'

const ImageTile = (props) => {
    const handleClick = () => {
        console.log("Go To Example Page")
        // To do - update page state to example page
    }

    return (
        <div className="image-tile">
            <a onClick={handleClick}>
                <img src={props.imgsrc}></img>
            </a>
        </div>
    )
}

export default ImageTile


