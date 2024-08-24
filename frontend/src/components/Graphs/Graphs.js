import { useEffect, useState} from 'react'
import { getWebsiteTraffic, getLifetimeValue, getSubscriptionCancellations, getSubscriptionActivations, getConversionRates } from '../../services/message.service'
import { useAuth0 } from "@auth0/auth0-react"

import {Line, Bar, Pie} from 'react-chartjs-2'
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js'
import {WebsiteTrafficData,LifetimeValueBrokenUpData, ConversionRatesData, LifetimeValueData, ChurnRateData, NetMembershipData} from "../../DataParser/DataParser.js"
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend)

const date1 = new Date('December 17, 1995 03:24:00');

// Get the full range of months starting from the passed month/year
// All dates will be the first of the month
// String arguments should be of the form
// December 1, 2024
const getMonthRange = (month, year) => {
    const date = new Date("January 1, 2000") // Initial, default date
    date.setMonth(month)
    date.setFullYear(year)

    let range = []
    
    while(date <= Date.now())
    {
        range.push(new Date(date))
        date.setMonth(date.getMonth() + 1)
    }

    return range
}


// Utility function to format the date as mm/dd/yyyy
const formatDateFromTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
};


// Utility function to format the month and year as "Month Year"
const formatMonthYearFromTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${month} ${year}`;
};

export const WebsiteTraffic  = () => {
    const { getAccessTokenSilently } = useAuth0()
    const [dates, setDates] = useState([])
    const [traffic, setTraffic] = useState([])

    // Array of time stamps
    const [pageVisitations, setPageVisitations] = useState([])

    const getWebTraffic = async () => {
        const accessToken = await getAccessTokenSilently()
        const {data, error} = await getWebsiteTraffic(accessToken)
        setPageVisitations(data.traffic)
    };

    const getNumVisits = (start, stop) => {
        let numVisits = 0

        for(let i = 0; i < pageVisitations.length; i ++)
        {
            if(pageVisitations[i] >= start && pageVisitations[i] <= stop)
            {
                numVisits ++
            }
        }

        return numVisits
    }

    // On page mount
	useEffect(() => {
		getWebTraffic()
	}, [])

    // On data load
    useEffect(() => {
        if(!pageVisitations)
            return

        // Set start date to the first page visitation
        let startDate = new Date(pageVisitations[0])
        // Range of months from start date to present
        const dateRange = getMonthRange(startDate.getMonth(), startDate.getFullYear()) 

        let dateLabels = []
        for(let i = 0; i < dateRange.length; i ++)
        {
            dateLabels.push(formatMonthYearFromTimestamp(dateRange[i]))
        }

        // Array which will store the traffic for each month
        let newTraffic = []

        for(let i = 0; i < dateRange.length - 1; i ++)
        {
            const visitations = getNumVisits(dateRange[i], dateRange[i + 1])
            newTraffic.push(visitations)
        }

        const start = dateRange[dateRange.length - 1]
        const stop = new Date(start)
        stop.setDate(31)
        const currentVisitationNumber = getNumVisits(start, stop)
        newTraffic.push(currentVisitationNumber)

        setDates(dateLabels)
        setTraffic(newTraffic)
        
    }, [pageVisitations])

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins:{
            legend:{
                position:"bottom",
            },
            title:{
                text: "Website Traffic",
                display: true,
            } 
        }
    }

    let trafficData = {
        labels: dates,
        datasets: [
            {
                label: "Number of Users",
                data: traffic,
                backgroundColor: "rgba(0,255,0,.5)",
                borderColor: "green",
                borderWidth:".5"
            }
        ]
    }

    const data = WebsiteTrafficData
    return <Line options={options} data={trafficData}/>
}
export const LifetimeValueBrokenUp = () => {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y:{
                ticks: {
                    callback: value => `${value} $`
                }
            }
        },
        plugins:{
            legend:{
                position:"bottom",

            },
            title:{
                text: "Customer Lifetime Value Breakdown",
                display: true
            } 
        }
    }
    const data = LifetimeValueBrokenUpData;
    return <Bar options = {options} data = {data}/>
}
export const LifetimeValue  = () => {
    const [dates, setDates] = useState([])
    const [values, setValues] = useState([])

    const getLifetimeValues = async () => {
        const {data, error} = await getLifetimeValue()
        const valueData = data.values

        let newDates = []
        let newValues = []

        valueData.forEach(item => {
            newDates.push(item.date)
            newValues.push(item.value)
        })

        setDates(newDates)
        setValues(newValues)
    };

	useEffect(() => {
		getLifetimeValues()

	}, [])

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y:{
                ticks: {
                    callback: value => `${value} $`
                }
            }
        },
        plugins:{
            legend:{
                position:"bottom",

            },
            title:{
                text: "Customer Lifetime Value By Month",
                display: true
            } 
        }
    }

    let valueData = {
        labels: dates,
        datasets: [
            {
                label: "Customer Lifetime Value",
                data: values,
                backgroundColor: "rgba(0,255,0,.5)",
                borderColor: "green",
                borderWidth:".5"
            }
        ]
    }

    return <Line options = {options} data= {valueData}/>
}
export const ConversionRates = () => {
    const { getAccessTokenSilently } = useAuth0()
    const [labels, setDates] = useState([])
    const [values, setValues] = useState([])

    const getConversionData = async () => {
        const accessToken = await getAccessTokenSilently()
        const {data, error} = await getConversionRates(accessToken)
        const conversionObject = data.values

        let newLabels = []
        let newValues = []

        for (const key in conversionObject) {
            if (conversionObject.hasOwnProperty(key)) {
                newLabels.push(key);
                newValues.push(conversionObject[key]);
            }
        }

        setDates(newLabels)
        setValues(newValues)
    };

	useEffect(() => {
		getConversionData()
	}, [])

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins:{
            legend:{
                position:"bottom",

            },
            title:{
                text: "Sign Up Conversion Rates",
                display: true
            } 
        }
    }
   
    let conversionData = {
        labels: labels,
        datasets: [
            {
                label: "Number of People",
                data: values,
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

    return <Pie options={options} data={conversionData}/>

}

// The churn rate is the number of customers lost for a given month (churned customers)
// divided by the number of total active customers at the beginning of that month
export const ChurnRate  = () => {
    const { getAccessTokenSilently } = useAuth0()
    const [dates, setDates] = useState([])
    const [churnRates, setChurnRates] = useState([])

    const [activationData, setActivationData] = useState(null)
    const [cancellationData, setCancellationData] = useState(null)

    // First, all the activation and cancellation data is pulled into their respective arrays
    // Each of these arrays are arrays of time stamps that represent an activation or a cancellation event
    const getActivationData = async () => {
        const accessToken = await getAccessTokenSilently()
        const {data, error} = await getSubscriptionActivations(accessToken)
        setActivationData(data.values)
    }

    const getCancellationData = async () => {
        const accessToken = await getAccessTokenSilently()
        let {data, error} = await getSubscriptionCancellations(accessToken)
        setCancellationData(data.values)
    }

    // Given a time stamp, return the number of active users up to that point in time
    const getActiveUsers = (timestamp) => {
        let activationCount = 0
        let cancellationCount = 0
        
        for(let i = 0; i < activationData.length; i ++)
        {
            if(activationData[i] > timestamp)
                break

            activationCount ++
        }

        for(let i = 0; i < cancellationData.length; i ++)
        {
            if(cancellationData[i] > timestamp)
                break
        
            cancellationCount ++
        }

        return activationCount - cancellationCount
    }

    // Get the number of churned customers between two specified timestamps/dates
    const getNumCancelledCustomers = (start, stop) => {
        let cancellationCount = 0

        for(let i = 0; i < cancellationData.length; i ++)
        {
            if(cancellationData[i] >= start && cancellationData[i] <= stop)
            {
                cancellationCount ++
            }
        }

        return cancellationCount
    }

    // On page mount
	useEffect(() => {
		getActivationData()
        getCancellationData()
	}, [])


    // Whenever data is updated
    useEffect(() => {
        // Data is not yet ready
        if(!activationData || !cancellationData)
            return

        let startDate = new Date(activationData[0])
        const dateRange = getMonthRange(startDate.getMonth(), startDate.getFullYear())

        let dateLabels = []
        for(let i = 0; i < dateRange.length; i ++)
        {
            dateLabels.push(formatMonthYearFromTimestamp(dateRange[i]))
        }

        let newChurnRates = []
        newChurnRates.push(0) // Push 0 for the initial value

        // Skip first month since shurn rate is 0 (no previous month's active users)
        for(let i = 1; i < dateRange.length - 1; i ++)
        {
            // Churn rate for current month
            const churnRate = getNumCancelledCustomers(dateRange[i], dateRange[i + 1]) / getActiveUsers(dateRange[i])

            newChurnRates.push(churnRate * 100)
        }

        // Churn rate for the current month
        const start = dateRange[dateRange.length - 1]
        const stop = new Date(start)
        stop.setDate(31)
        const currentChurnRate = getNumCancelledCustomers(start, stop)
        newChurnRates.push(currentChurnRate)

        setDates(dateLabels)
        setChurnRates(newChurnRates)

    }, [activationData, cancellationData])
    
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y:{
                ticks: {
                    callback: value => `${value} %`
                }
            }
        },
        plugins:{
            legend:{
                position:"bottom",

            },
            title:{
                text: "Churn Rate",
                display: true
            } 
        }
    }

    let churnRateData = {
        labels: dates,
        datasets: [
            {
                label: "Churn Rate in Percent",
                data: churnRates,
                backgroundColor: "rgba(255,0,0,.5)",
                borderColor: "red",
                borderWidth:".5"
            }
        ]
    }
    
    return <Line options = {options} data= {churnRateData}/>
}

// This returns a line chart object for the active subscriptions. It pulls data regarding subscription
//  activations and cancellations and renders the line chart. 
export const ActiveSubscriptions  = () => {
    const { getAccessTokenSilently } = useAuth0()
    const [dates, setDates] = useState([])
    const [activeUsers, setActiveUsers] = useState([])

    const [activationData, setActivationData] = useState(null)
    const [cancellationData, setCancellationData] = useState(null)

    // First, all the activation and cancellation data is pulled into their respective arrays
    // Each of these arrays are arrays of time stamps that represent an activation or a cancellation event
    const getActivationData = async () => {
        const accessToken = await getAccessTokenSilently()
        const {data, error} = await getSubscriptionActivations(accessToken)
        setActivationData(data.values)
    }

    const getCancellationData = async () => {
        const accessToken = await getAccessTokenSilently()
        let {data, error} = await getSubscriptionCancellations(accessToken)
        setCancellationData(data.values)
    }

    // Given a time stamp, return the number of active users up to that point in time
    const getActiveUsers = (timestamp) => {
        let activationCount = 0
        let cancellationCount = 0
        
        for(let i = 0; i < activationData.length; i ++)
        {
            if(activationData[i] > timestamp)
                break

            activationCount ++
        }

        for(let i = 0; i < cancellationData.length; i ++)
        {
            if(cancellationData[i] > timestamp)
                break
        
            cancellationCount ++
        }

        return activationCount - cancellationCount
    }
    
    // On page mount
	useEffect(() => {
		getActivationData()
        getCancellationData()
	}, [])

    useEffect(() => {
        // Data is not yet ready
        if(!activationData || !cancellationData)
            return

        let startDate = new Date(activationData[0])
        const dateRange = getMonthRange(startDate.getMonth(), startDate.getFullYear())

        let dateLabels = []

        let activeUsersTemp = []

        for(let i = 0; i < dateRange.length; i ++)
        {
            dateLabels.push(formatMonthYearFromTimestamp(dateRange[i]))
            dateRange[i].setMonth(dateRange[i].getMonth() + 1) // Set to end of the current month/start of the next one
            activeUsersTemp.push(getActiveUsers(dateRange[i]))
        }
        
        setDates(dateLabels)
        setActiveUsers(activeUsersTemp)
        
    }, [activationData, cancellationData])

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins:{
            legend:{
                position:"bottom",

            },
            title:{
                text: "Active Users",
                display: true
            } 
        }
    }

    let chartData = {
        labels: dates,
        datasets: [
            {
                label: "Number of Active Subscriptions",
                data: activeUsers,
                backgroundColor: "rgba(0,0,255,.5)",
                borderColor: "blue",
                borderWidth:".5"
            }
        ]
    }

    return <Line options={options} data={chartData}/>
}

