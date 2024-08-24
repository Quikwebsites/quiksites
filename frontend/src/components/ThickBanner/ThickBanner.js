import './ThickBanner.css'

const ThickBanner = (props) => {
    return(
        <div className="thick-banner">
            <h1>{props.slogan}</h1>
            <h3>{props.subslogan}</h3>
        </div>
    );
}
export default ThickBanner