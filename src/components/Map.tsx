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

export default function Map(props: string[]) {
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [lat, setLat] = useState(0);
    const [long, setLong] = useState(0);
    const [reviews, setReviews] = useState([]);
    const { loading, error, data } = useQuery(MAP, {
        variables: {
            id: props[0]
        }
    });

    useEffect(() => {
        if (data) {
            setCity(data.SouthAfricanCities_by_pk.city);
            setCountry(data.SouthAfricanCities_by_pk.country);
            setLat(data.SouthAfricanCities_by_pk.location.lat);
            setLong(data.SouthAfricanCities_by_pk.location.long);
            setReviews(data.SouthAfricanCities_by_pk.reviews);
        }
    }, [data]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div className="map">
            <MapContainer center={[lat, long]} zoom={13}>
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[lat, long]}>
                    <Popup>
                        <span>{city}, {country}</span>
                    </Popup>
                </Marker>
            </MapContainer>
            <div className="reviews">
                {reviews.map((review: any) => {
                    return (
                        <div className="review" key={review.id}>
                            <p>{review.body}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}