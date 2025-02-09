import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useContext } from 'react'
import { useNavigate } from "react-router-dom";
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import useSocket from "../hooks/useSocket";
import { ExperienceContext } from "../context/ExperienceContext";
import BackButton from '../Components/BackButton';
import MapResizer from '../Components/MapResizer';
import MoveZoomControl from '../Components/MoveZoomControl';

// Set up the default icon for markers
const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapPage = () => {
    const { experiences } = useContext(ExperienceContext); // Get experience data
    const { peopleCount } = useSocket(); // Get real-time people count

    const navigate = useNavigate();
  
    return (
      <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
        <MapContainer style={{ height: "100%", width: "100%" }} zoom={13} center={[40.7128, -74.006]}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
  
          {experiences.map((exp) => (
            <Marker key={exp.id} position={exp.coordinates}>
              <Popup>
                <h3>{exp.title}</h3>
                <p>People here: {peopleCount[exp.id] || 0}</p> {/* Live data */}
                <button onClick={() => navigate(`/experience/${exp.id}`)}>Go</button>
              </Popup>
            </Marker>
          ))}
          
          <MoveZoomControl />
          <MapResizer />
        </MapContainer>
        
        <BackButton /> {/* Positioned at the top left */}
      </div>
    );
  };

export default MapPage;
