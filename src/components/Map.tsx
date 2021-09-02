import "../components/Map.css";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useQuery, gql } from "@apollo/client";
import { useState, useEffect } from "react";


const MAP = gql`
    query Map ($id: uuid!) {
            SouthAfricanCities_by_pk(id: $id) {
            city
            country
            id
            location
            reviews {
                id
                body
            }
        }
    }
`;

export default function Map(id: string[]) {
    const { loading, error, data } = useQuery(MAP, { variables: { id } });
    const [position, setPosition] = useState({ lat: -26.2041, lng: 28.0473 });
    const [zoom, setZoom] = useState(5);

    useEffect(() => {
        if (data) {
            setPosition({ lat: data.SouthAfricanCities_by_pk.location.latitude, lng: data.SouthAfricanCities_by_pk.location.longitude });
            setZoom(12);
        }
    }, [data]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error</div>;

    return (
        <MapContainer center={position} zoom={zoom}>
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
                <Popup>
                    <span>{data.SouthAfricanCities_by_pk.city}
                        <br />
                        {data.SouthAfricanCities_by_pk.country}
                    </span>
                </Popup>
            </Marker>
        </MapContainer>
    );
}