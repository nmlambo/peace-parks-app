import "../components/Map.css";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

function Map() {
    return (

        <div className='leaflet-container'>
            <MapContainer center={[24.67271, -28.47926]} zoom={12} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[24.67271, -28.47926]}>
                    <Popup>Hello, South Africa</Popup>
                </Marker>
            </MapContainer>
        </div>
    )

}

export default Map
