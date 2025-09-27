import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression, Icon } from "leaflet";

import "leaflet/dist/images/marker-shadow.png";

const shopPosition: LatLngExpression = [6.5244, 3.3792];

const customIcon: Icon = L.icon({
  iconUrl: "/marker-icon.png",
  shadowUrl: "/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const ShopMap: React.FC = () => {
  return (
    <div className="h-[500px] w-full rounded-xl overflow-hidden shadow-md">
      <MapContainer center={shopPosition} zoom={15} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={shopPosition} icon={customIcon}>
          <Popup>
            Gadget Store <br /> Shop location here.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default ShopMap;
