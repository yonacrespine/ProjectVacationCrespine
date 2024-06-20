import "./GalleryCard.css";




interface CardGallery{
    image: string
    text: string
    height: string
    width: string
}

function GalleryCard(props: CardGallery): JSX.Element {
    return (
        <div className="GalleryCard">
			<div className=" gallery container-fluid">
                <img className="img-fluid" src={props.image} alt="cardImage" style={{height:`${props.height}`, width:`${props.width}`}} />
                <div className="title-gallery container-fluid">
                    
                    <p className="hidden">{props.text}</p>
                   
                </div>
            </div>
        </div>
    );
}

export default GalleryCard;
