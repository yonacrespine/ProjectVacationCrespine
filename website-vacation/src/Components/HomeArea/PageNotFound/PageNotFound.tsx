import "./PageNotFound.css";

import pageNotFound from "../../../Assets/images/vecteezy_illustration-vector-graphic-cartoon-character-of-not-connected_6417043.jpg"

function PageNotFound(): JSX.Element {
    return (
        <div className="PageNotFound">
			<img src={pageNotFound}  alt="pageNotFound" style={{width:"64%", height:"60%"}}/>
        </div>
    );
}

export default PageNotFound;
