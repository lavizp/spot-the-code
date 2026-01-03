import { MapContainer,  TileLayer } from "react-leaflet"


export default function WorldMap() {
  return (
   <MapContainer center={[48,2]} zoom={13}>
     <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        bounds={[[48,2],[48,2]]}
     />
   </MapContainer>
  );
}