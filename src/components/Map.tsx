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

const Map = ({ id }) => {
    const { loading, error, data } = useQuery(MAP, {
        variables: { id }
    });

    const [position, setPosition] = useState({ lat: -30.559483, lng: 22.937506 });

    useEffect(() => {
        if (data) {
            setPosition({
                lat: data.SouthAfricanCities_by_pk.location.latitude,
                lng: data.SouthAfricanCities_by_pk.location.longitude
            });
        }
    }, [data]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <MapContainer center={position} zoom={13}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position}>
                <Popup>
                    <div>
                        <h2>{data.SouthAfricanCities_by_pk.city}</h2>
                        <p>{data.SouthAfricanCities_by_pk.country}</p>
                    </div>
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default Map;