//Line Graph Data
export const WebsiteTrafficData = {
    //Will fill this labels using "objectArray.map((data) => data.date)"
    labels: [
        "7/1/22",
        "7/2/22",
        "7/3/22",
        "7/4/22",
        "7/5/22",
        "7/6/22",
        "7/7/22",
        "7/8/22",
        "7/9/22"

    ],
    datasets: [
        {
            label: "Number of Users",
            data: /*Will populate data with "objectArray.map((data) => data.numVisits)"*/[3000,1200,500,200,400,500,300,100,200],
            backgroundColor: "rgba(0,255,0,.5)",
            borderColor: "green",
            borderWidth:".5"
        }
    ]
}
export const LifetimeValueData = {
    //Will fill this labels using "objectArray.map((data) => data.date)"
    labels: [
        "July 2022",
        "August 2022",
        "September 2022",
        "October 2022",
        "November 2022",
        "December 2022",
        "January 2023",
        "Febuary 2023",
        "March 2023"

    ],
    datasets: [
        {
            label: "Customer Lifetime Value",
            data: /*Will populate data with "objectArray.map((data) => data.numVisits)"*/[0,61,200,98,150,110,120,132,133],
            backgroundColor: "rgba(0,255,0,.5)",
            borderColor: "green",
            borderWidth:".5"
        }
    ]
}
export const NetMembershipData = {
    //Will fill this labels using "objectArray.map((data) => data.date)"
    labels: [
        "July 2022",
        "August 2022",
        "September 2022",
        "October 2022",
        "November 2022",
        "December 2022",
        "January 2023",
        "Febuary 2023",
        "March 2023"

    ],
    datasets: [
        {
            label: "Number of Paying Members",
            data: /*Will populate data with "objectArray.map((data) => data.numVisits)"*/[0,5,30,32,60,72,68,64,90],
            backgroundColor: "rgba(0,0,255,.5)",
            borderColor: "blue",
            borderWidth:".5"
        }
    ]
}
export const ChurnRateData = {
    //Will fill this labels using "objectArray.map((data) => data.date)"
    labels: [
        "July 2022",
        "August 2022",
        "September 2022",
        "October 2022",
        "November 2022",
        "December 2022",
        "January 2023",
        "Febuary 2023",
        "March 2023"

    ],
    datasets: [
        {
            label: "Churn Rate in Percent",
            data: /*Will populate data with "objectArray.map((data) => data.numVisits)"*/[/*These values are calculated as ((#number of people unsubscribed for the month / number of people subscribed for the month)*100)*/1,10,20,10,5,6,4,30,2 ],
            backgroundColor: "rgba(255,0,0,.5)",
            borderColor: "red",
            borderWidth:".5"
        }
    ]
}

//Bar Graph Data
/*based on average lifetime in months*/
export const LifetimeValueBrokenUpData = {
    labels:["Domain", "Subscription vs Maintenance"],
    datasets:[
        {
            label: "Earned",
            data: [3/2/*(Domain sold for/ average customer lifetime)*/,70*2/*(average subscription cost * average Lifetime) */],
            backgroundColor: "rgba(100,255,100, .2)",
            borderColor: "rgba(100,255,100, 1)",
            borderWidth: 1
        },
        {
            label: "Spent",
            data: [1/2/*(Domain cost/ average customer lifetime)*/,4*2/*(( average cost of mongo per month + average cost of stripe per month + average cost of google cloud per month + average cost of email api per month)* average lifetime)*/],
            backgroundColor: "rgba(255,100,100, .2)",
            borderColor: "rgba(255,100,100, 1)",
            borderWidth: 1
        }

    ]

}

//Pie Chart Data
export const ConversionRatesData = {
    labels: ["Only Visited", "Only Visited & Made Account","Visited, Made Account & Subscribed (Low Tier)","Visited, Made Account & Subscribed (High Tier)" ],
    datasets: [
        {
            label: "Number of People",
            data: [120/*(number of unique visitors - visitors with an account)*/,60/*(visitors with an account - visitors subscribed)*/,10/*visitors with only low teir subscriptions*/, 2/*visitors with high teir subscriptions*/],
            backgroundColor:[
                "rgba(255,0,0,1)",
                "rgba(220,50,50,1)",
                "rgba(100,200,100,1)",
                "rgba(0,255,0,1)",
            ],
            hoverOffset: 10,
        }

    ]
}