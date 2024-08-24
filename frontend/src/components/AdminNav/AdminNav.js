import React, {useEffect} from 'react'
import "./AdminNav.css"
import {usePageContext} from "../../context/PageContext.js"
const AdminNav = ()=> {
    const [{sub_page}, dispatch] = usePageContext();
    const tabClick = (whereTo)=> {
        console.log(whereTo);
        dispatch({
            type: "SET_SUB_PAGE",
            sub_page: whereTo,
          });
          console.log(sub_page);
    }
    useEffect(() => {	
        let tabContainer = document.getElementById("admin_nav")
        //console.log(tabContainer)
        let tabs = tabContainer.getElementsByClassName("btn")
        /*console.log(tabs[0])
        console.log(tabs[1])
        console.log(tabs[2])
        console.log(tabs[3])*/
        for(let i=0; i<tabs.length;i++){
            tabs[i].addEventListener('click', ()=> {
                //console.log("YoYo")
                //console.log(document.getElementsByClassName("active").length)
                if(document.getElementsByClassName("active").length > 0){
                    document.getElementsByClassName("active")[0].className = "btn"
                }
                tabs[i].className += " active" 
            })
        }
	}, [])
    
    return(
        <div className="admin_nav">
            <ul id="admin_nav">
                <li className="btn active">
                    <a onClick={() => {tabClick("AdmnData")}}>Data</a>
                </li>
                <li className="btn">
                    <a onClick={() => {tabClick("AdmnWT")}}>WT</a>
                </li>
                <li className="btn">
                    <a onClick={() => {tabClick("AdmnSUCR")}}>SUCR</a>
                </li>
                {/*
                <li className="btn ">
                    <a onClick={() => {tabClick("AdmnCVBD")}}>CLV Breakdown</a>
                </li>
                <li className="btn ">
                    <a onClick={() => {tabClick("AdmnCVBM")}}>CLV By Month</a>
                </li>
                */}
                <li className="btn ">
                    <a onClick={() => {tabClick("AdmnCR")}}>CR</a>
                </li>
                <li className="btn ">
                    <a onClick={() => {tabClick("AdmnNPM")}}>NPM</a>
                </li>
                <li className="btn ">
                    <a onClick={() => {tabClick("AdmnUSRS")}}>USRS</a>
                </li>
                <li className="btn ">
                    <a onClick={() => {tabClick("AdmnReq")}}>Requests</a>
                </li>
                <div className="underline start-gen"></div>
            </ul>
        </div>
    );
}
export default AdminNav