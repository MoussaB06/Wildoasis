import { useNavigate, useSearchParams } from "react-router-dom";
import { mapContainer } from "./Map.module.css";

function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  /// Le "lat" dans la methode get doit etre le meme que dans l'URL dans notre cas on
  // l'a mis dans le <Link> du cityItem a verifier!
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <div
      className={mapContainer}
      onClick={() => {
        navigate("form");
      }}
    >
      <h1>
        Position:{lat}, {lng}
      </h1>
      <button
        onClick={() => {
          setSearchParams({ lat: 23, lng: 10 });
        }}
      >
        Change position
      </button>
    </div>
  );
}

export default Map;
