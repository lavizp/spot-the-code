import { MapContainer,  TileLayer } from "react-leaflet"

import "leaflet/dist/leaflet.css"


export default function WorldMap() {
  return (
    <MapContainer
      center={[48, 2]}
      zoom={13}
      minZoom={10}
      maxBounds={[
        [-90, -180],
        [90, 180]
      ]}
      maxBoundsViscosity={1.0}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
     />
   </MapContainer>
  );
}