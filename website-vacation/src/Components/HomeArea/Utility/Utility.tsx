import "./Utility.css";



interface UtilityProps{
    image:string;
    title:string;
    content:string;



}
function Utility(props:UtilityProps): JSX.Element {
    return (
        <div className="Utility">
				<div className="cardUtility container-fluid">
                <img  className="imageCard img-fluid" src={props.image} alt="" style={{height:"100px", width:"100px"}}/>
                <h1>{props.title}</h1>
                <p>{props.content}</p>

            </div>
        </div>
    );
}

export default Utility;
