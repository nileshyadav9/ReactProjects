import { useNavigate, useSearchParams } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";

import styles from "./Map.module.css";
import { useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import { useEffect } from "react";
import { useGeolocation } from "../hooks/useGeoLocation";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Button from "./Button";
function Map() {
  const [mapMarker, setMapMarker] = useState([45, 13]);
  const { cities } = useCities();
  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition,
  } = useGeolocation();

  const [lat, lng] = useUrlPosition();

  useEffect(
    function () {
      if (lat && lng) setMapMarker([lat, lng]);
    },
    [lat, lng]
  );

  useEffect(
    function () {
      if (geoLocationPosition)
        setMapMarker([geoLocationPosition.lat, geoLocationPosition.lng]);
    },
    [geoLocationPosition]
  );

  return (
    <div className={styles.mapContainer}>
      {!geoLocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use Your Position!"}
        </Button>
      )}
      <MapContainer
        center={mapMarker}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>
                {city.cityName}, {city.country}
              </span>
            </Popup>
          </Marker>
        ))}
        <ChangeMarker position={mapMarker} />
        <OnMapClick />
      </MapContainer>
    </div>
  );
}

function ChangeMarker({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function OnMapClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}

export default Map;
