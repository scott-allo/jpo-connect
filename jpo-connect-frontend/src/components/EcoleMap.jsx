import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const EcoleMap = ({ nom, lat, lng }) => (
  <div className="w-full h-64 rounded overflow-hidden shadow mb-4">
    <MapContainer center={[lat, lng]} zoom={16} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[lat, lng]}>
        <Popup>{nom}</Popup>
      </Marker>
    </MapContainer>
  </div>
);

export default EcoleMap;