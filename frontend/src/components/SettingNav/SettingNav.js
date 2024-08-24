import React, {useEffect} from 'react'
import "./SettingNav.css"
import {usePageContext} from "../../context/PageContext.js"
const SettingNav = ()=> {
    const [{sub_page}, dispatch] = usePageContext();
    const tabClick = (whereTo)=> {
        dispatch({
            type: "SET_SUB_PAGE",
            sub_page: whereTo,
          });
    }
    useEffect(() => {	
        let tabContainer = document.getElementById("setting_nav")
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
        <div className="setting_nav">
            <ul id="setting_nav">
                <li className="btn active">
                    <a onClick={() => {tabClick("PlanSet")}}>Plans</a>
                </li>
                <li className="btn ">
                    <a onClick={() => {tabClick("DelSet")}}>Delete</a>
                </li>
                {/*<li className="btn ">
                    <a onClick={() => {tabClick("AutorenewSet")}}>Autorenew</a>
                    </li>*/}
                <div className="underline start-gen"></div>
            </ul>
        </div>
    );
}
export default SettingNav