

// Page Components
import {useEffect} from "react"
import Navbar from "../components/Navbar/Navbar"
import Dashboard from "../sections/Dashboard/Dashboard"
import FloatBlock from "../components/FloatBlock/FloatBlock"
import { usePageContext } from "../context/PageContext" 

const UserPage = () => {
	const [{prompt_visable }, dispatch] = usePageContext()

	useEffect(() => {	
		dispatch({
			type: "SET_PROMPT_VIZ",
			prompt_visable: false,
		});

	}, [])
  	return (
    	<div>
			<Navbar />
			<Dashboard />
			{prompt_visable ? (
				<FloatBlock />
			) : null}
    	</div>
  )
}

export default UserPage