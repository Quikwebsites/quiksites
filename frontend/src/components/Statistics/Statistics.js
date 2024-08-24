import React from 'react'
import "./Statistics.css"
import {WebsiteTraffic, ConversionRates, LifetimeValueBrokenUp, LifetimeValue, ChurnRate, ActiveSubscriptions} from "../Graphs/Graphs"

const Statistics = ()=>{

    return(<div className = "statistics subpage">
        <div className = "graph1">
            <WebsiteTraffic/>
        </div>
        <div className = "graph2">
            <ConversionRates/>
        </div>
        {/*
        <div className = "graph3">
            <LifetimeValueBrokenUp/>
        </div>
        <div className = "graph4">
            <LifetimeValue/>
        </div>
        */}
        <div className = "graph5">
            <ChurnRate/>
        </div>
        <div className = "graph5">
            <ActiveSubscriptions/>
        </div>
    </div>);
}
export default Statistics;
