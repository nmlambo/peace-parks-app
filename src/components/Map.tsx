import "../components/Map.css";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useQuery, gql } from "@apollo/client";
import { useState, useEffect } from "react";


const MAP = gql`
    query City($id: uuid!) {
            SouthAfricanCities_by_pk(id: $id) {
            id
            city
            country
            location
            reviews {
                body
            }
        }
    }
`;

export default function Map(props : any) {
    const { loading, error, data } = useQuery(MAP, {
        variables: {
            id: props.cityId
        }
    });
    const [position, setPosition] = useState({ lat: -26.2041, lng: 28.0473 });
    const [zoom, setZoom] = useState(12);
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        if (data) {
            setCity(data.SouthAfricanCities_by_pk.city);
            setCountry(data.SouthAfricanCities_by_pk.country);
            setReviews(data.SouthAfricanCities_by_pk.reviews);
            setPosition(data.SouthAfricanCities_by_pk.location);
            setZoom(12);
        }
    }, [data]);


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div className="map">
            <MapContainer center={position} zoom={zoom}>
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>
                        <div>
                            <h2>{city}</h2>
                            <h3>{country}</h3>
                            <h4>{reviews.length} reviews</h4>
                        </div>
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}