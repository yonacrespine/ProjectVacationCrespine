import "./CustomersMessage.css";

interface CustomersMessageProps{
    image:string;
    name:string;
    message:string;



}

function CustomersMessage(props:CustomersMessageProps): JSX.Element {
    return (
        <div className="CustomersMessage">
			
            <div className="cardCustomersMessage container-fluid">
                <img  className="imageCard img-fluid" src={props.image} alt="" style={{height:"100px", width:"100px"}}/>
                <h1>{props.name}</h1>
                <p>{props.message}</p>

            </div>
        </div>
    );
}

export default CustomersMessage;
