import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { getRutas, getParadas } from '../services/api.js';

function MapView({ region = 'Managua', rutaId }) {
  const [rutas, setRutas] = useState([]);
  const [paradas, setParadas] = useState([]);
  useEffect(() => {
    getRutas(region).then(setRutas).catch(() => setRutas([]));
  }, [region]);

  useEffect(() => {
    if (!rutaId) return;
    getParadas(rutaId).then(setParadas).catch(() => setParadas([]));
  }, [rutaId]);

  return (
    <MapContainer center={[12.8654, -85.2072]} zoom={8} className="h-full w-full">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {rutas.map((ruta, idx) => (
        <Polyline key={idx} positions={ruta.coordenadas} color="blue" />
      ))}
      {paradas.map((p) => (
        <Marker key={p.id} position={[p.lat, p.lon]}>
          <Popup>{p.nombre}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapView;
