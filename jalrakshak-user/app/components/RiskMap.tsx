"use client";

import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

/* ================= CLIENT ONLY MAP ================= */

const Map = dynamic(
  async () => {
    const { MapContainer, TileLayer, Circle, Popup } =
      await import("react-leaflet");

    return function RiskMapComponent() {
      const position: [number, number] = [21.1458, 79.0882]; // Nagpur demo

      return (
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: "400px", width: "100%" }}
          className="rounded-2xl"
        >
          <TileLayer
            attribution="&copy; OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Circle
            center={position}
            radius={500}
            pathOptions={{ color: "red" }}
          >
            <Popup>⚠️ Medium Risk Water Zone</Popup>
          </Circle>
        </MapContainer>
      );
    };
  },
  { ssr: false } // ⭐ VERY IMPORTANT
);

export default function RiskMap() {
  return (
    <div className="gov-glass rounded-2xl p-6">
      <h2 className="text-cyan-400 font-semibold mb-4">
        🗺️ Locality Risk Heatmap
      </h2>

      <Map />
    </div>
  );
}