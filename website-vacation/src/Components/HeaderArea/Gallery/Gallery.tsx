import GalleryCard from "../GalleryCard/GalleryCard";
import "./Gallery.css";






import  asia from "../../../Assets/images/asia.jpg"
import budapest from "../../../Assets/images/budapest.jpg"
import  australia from "../../../Assets/images/australia.jpg"
import  canada from "../../../Assets/images/canada.jpg"
import  EinGedi from "../../../Assets/images/einGedi-israel.jpg"
import  grece from "../../../Assets/images/grece.jpg"
import hotel from "../../../Assets/images/hotel.jpg"
import dubai from "../../../Assets/images/dubai.jpg"
import islande from "../../../Assets/images/islande.jpg"
import mexico from "../../../Assets/images/mexico.jpg"
import newYork from "../../../Assets/images/newYork.jpg"
import paysBas from "../../../Assets/images/paysBas.jpg"
import singapour from "../../../Assets/images/singapour.jpg"
import telAviv from "../../../Assets/images/telAviv.jpg"
import prague from "../../../Assets/images/prague.jpg"
import madagascar from "../../../Assets/images/managascar.jpg"
import useVerifyLoggedIn from "../../../03-Service/useVerifyLoggedIn";


function Gallery(): JSX.Element {

    useVerifyLoggedIn()
    return (

        <div className="Gallery ">
               <h1>Gallery</h1>
               <h6>Photos of Our Destinations</h6>
			
                <div className="gallery-images">
           
            <div>
                <div className="mosaic opacity1"><GalleryCard image={asia} text={"Asia"} height={"400px"} width={"400px"}/></div>
                <div className="mosaic opacity1"><GalleryCard image={budapest} text={"Budapest"} height={"350px"} width={"400px"}/></div>
                <div className="mosaic opacity1"><GalleryCard image={australia} text={"Australia"} height={"650px"} width={"400px"}/></div>
            </div>
            
            <div>
                <div className="mosaic opacity1"><GalleryCard image={canada} text={"Canada, Torento"} height={"600px"} width={"600px"}/></div>
                <div className="mosaic opacity1"><GalleryCard image={EinGedi} text={"Ein guedi, Israel"} height={"500px"} width={"600px"}/></div>
                <div className="mosaic opacity1"><GalleryCard image={grece} text={"Grece"} height={"300px"} width={"600px"}/></div>
            </div>
            
            <div>
                <div className="mosaic opacity1"><GalleryCard image={hotel} text={"Ile Maurice"} height={"450px"} width={"450px"}/></div>
                <div className="mosaic opacity1"><GalleryCard image={islande} text={"Islande"} height={"350px"} width={"450px"}/></div>
                <div className="mosaic opacity1"><GalleryCard image={mexico} text={"Mexico"} height={"600px"} width={"450px"}/></div>
            </div>
            
            <div>
                <div className="mosaic opacity1"><GalleryCard image={dubai} text={"Dubai"} height={"550px"} width={"400px"}/></div>
                <div className="mosaic opacity1"><GalleryCard image={newYork} text={"New York"} height={"600px"} width={"400px"}/></div>
             
            </div>
            <div>
                <div className="mosaic opacity1"><GalleryCard image={paysBas} text={"The Netherlands"} height={"450px"} width={"600px"}/></div>
                <div className="mosaic opacity1"><GalleryCard image={singapour} text={"Singapour"} height={"700px"} width={"600px"}/></div>
             
            </div>
            <div>
                <div className="mosaic opacity1"><GalleryCard image={telAviv} text={"Tel Aviv"} height={"350px"} width={"450px"}/></div>
                <div className="mosaic opacity1"><GalleryCard image={prague} text={"Prague"} height={"350px"} width={"450px"}/></div>
                <div className="mosaic opacity1"><GalleryCard image={madagascar} text={"Madagascar"} height={"450px"} width={"450px"}/></div>
             
            </div>


            </div>









        </div>
    );
}

export default Gallery;
