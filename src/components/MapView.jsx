import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function MapView({ lat=20.5937, lon=78.9629, city='Location' }){
  return (
    <div className="map-wrap" style={{height:300, borderRadius:12, overflow:'hidden'}}>
      <MapContainer center={[lat, lon]} zoom={5} style={{height:'100%', width:'100%'}} >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lon]}>
          <Popup>{city}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
