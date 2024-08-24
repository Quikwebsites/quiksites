import React from "react"
import "./AddNewButton.css"
import { usePageContext } from "../../context/PageContext" 

const AddNewButton = () => {
    const [{ prompt_visable }, dispatch] = usePageContext()

    const handleAddClick = () => {
        dispatch({
          type: "SET_PROMPT_VIZ",
          prompt_visable: !prompt_visable,
        });
      }
      
    return(
        <li className = "add-new" >
            <a onClick={handleAddClick}>Add New +</a>
        </li>
    );
}
export default AddNewButton