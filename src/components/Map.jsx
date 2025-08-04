import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGeolocation } from "../hooks/useGeolocation";
import { useUrlPosition } from "../hooks/useUrlPosition";

import { mapContainer, map } from "./Map.module.css";

// import "leaflet/dist/leaflet.css";

import { MapContainer, useMap, useMapEvent, useMapEvents } from "react-leaflet";
import { TileLayer } from "react-leaflet";
import { Marker } from "react-leaflet";
import { Popup } from "react-leaflet";
import { useCities } from "../Context/CitiesContext";
import { countryCodes } from "./CityItem";
import { emoji as emojiClass } from "./CityItem.module.css";
import Button from "./Button";
import Message from "./Message";

function Map() {
  const [mapPosition, setMapPosition] = useState([10, 8]);
  const { cities } = useCities();
  const {
    isLoading: isLoadingPosition,
    getPosition,
    position: geolocationPosition,
  } = useGeolocation();

  const [mapLat, mapLng] = useUrlPosition();

  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (geolocationPosition)
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
  }, [geolocationPosition]);

  // if (!mapLat || !mapLng)
  //   return <Message message="Click on the map to select a position." />;

  return (
    <div className={mapContainer}>
      {!geolocationPosition && (
        <Button variation="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "use your position"}
        </Button>
      )}

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
          const lat = city?.position?.lat;
          const lng = city?.position?.lng;

          if (lat === undefined || lng === undefined) {
            console.warn("City has invalid coordinates:", city);
            return null;
          }

          return (
            <Marker key={city.id} position={[lat, lng]}>
              <Popup>
                <span>{city.emoji}</span> <br />
                <strong>{city.cityName}</strong>
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
