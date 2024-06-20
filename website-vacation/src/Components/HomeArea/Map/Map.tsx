import { useEffect, useRef, useState } from "react";
import "./Map.css";
import myVacationService from "../../../03-Service/VacationsService";
import axios from "axios";
import notify from "../../../03-Service/Notify";


interface MapProps {
    destination: string;
  }

function Map({ destination }: MapProps): JSX.Element {

    const [coordinates, setCoordinates] = useState<{ lat: number, lng: number }>({ lat: 0, lng: 0 });

    useEffect(() => {
      const fetchCoordinates = async () => {
        try {
      
          const coords = await myVacationService.getCoordinatesFromAddress(destination)
          setCoordinates(coords);
        } catch (error) {
         notify.errorMsg(error)
        }
      };
  
      fetchCoordinates();
    }, [destination]);

  

    return (
        <div className="Map">
			   <div style={{ height: '400px', width: '100%' }}>
    
      {coordinates.lat !== 0 && coordinates.lng !== 0 && (
        <iframe
          title="Google Maps"
          width="100%"
          height="100%"
          frameBorder="0"
          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDsVEhY83kjST14cJRpKyjR-Gwg5AZxUFA&q=${coordinates.lat},${coordinates.lng}`}
          allowFullScreen
        />
      )}
    </div>
        </div>
    );
}

export default Map;
