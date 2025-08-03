import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { mapContainer, map } from "./Map.module.css";

// import "leaflet/dist/leaflet.css";

import { MapContainer, useMap, useMapEvent, useMapEvents } from "react-leaflet";
import { TileLayer } from "react-leaflet";
import { Marker } from "react-leaflet";
import { Popup } from "react-leaflet";
import { useCities } from "../Context/CitiesContext";
import { countryCodes } from "./CityItem";
import { emoji as emojiClass } from "./CityItem.module.css";

function Map() {
  const [searchParams] = useSearchParams();

  /// Le "lat" dans la methode get doit etre le meme que dans l'URL dans notre cas on
  // l'a mis dans le <Link> du cityItem a verifier!
  const mapLat = +searchParams.get("lat");
  const mapLng = +searchParams.get("lng");

  const [mapPosition, setMapPosition] = useState([10, 8]);

  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  const { cities } = useCities();

  return (
    <div className={mapContainer}>
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => {
          const countryCode = countryCodes[city.country];

          return (
            <Marker
              position={[city.position.lat, city.position.lng]}
              key={city.id}
            >
              <Popup>
                <img
                  src={`https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`}
                  alt={`Flag of ${city.country}`}
                  width="20"
                  className={emojiClass}
                />
                <span>{city.cityName}</span>
              </Popup>
            </Marker>
          );
        })}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);

  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      navigate(`form?lat=${lat}&lng=${lng}`);
    },
  });
}

export default Map;
