import "../components/Map.css";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useQuery, gql } from "@apollo/client";
import { useState, useEffect } from "react";


const MAP = gql`
    query City($id: uuid!) {
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

export default function Map() {
    const { loading, error, data } = useQuery(MAP, {
        variables: {
            string: "",
        },
    });

    const [mapData, setMapData] = useState([]);

    useEffect(() => {
        if (data) {
            setMapData(data.map.names);
        }
    }, [data]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <MapContainer center={[51.505, -0.09]} zoom={13}>
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {mapData.map(({ name, lat, lng, city }) => (
                <Marker key={name} position={[lat, lng]}>
                    <Popup>
                        <span>{name}</span>
                        <br />
                        <span>{city}</span>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}