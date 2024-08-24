// Context
import { usePageContext } from "../../context/PageContext" 

// Stylesheets
import "./ImageButton.css";

const ImageButton = (props) => {
  const [{ page, visable }, dispatch] = usePageContext();

  const handleClick = () => {
    if(props.action == "SET_PAGE"){
      dispatch({
        type: props.action,
        page: props.value,
      })
    }else if(props.action =="SET_NAV_VIZ"){
      dispatch({
        type: props.action,
        visable: !visable,
      })
    }
  }

  return (
    <div className="imagebutton">
      <a onClick={handleClick}>
        <img className={props.size} src={props.imgSrc}></img>
      </a>
      {/**Components include image, has button behavoir and layout, some sort of interative hover animation  */}
    </div>
  );
}

export default ImageButton