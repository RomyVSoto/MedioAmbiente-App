import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import type L from 'leaflet';
import { Link } from 'react-router-dom';
import { API } from '../services/api';
import MapReady from '../components/MapReady';

export default function ProtectedAreasMap() {
  const [areas, setAreas] = useState<any[] | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    API.areas().then(arr => setAreas(arr ?? [])).catch(() => setAreas([]));
  }, []);

  if (areas === null) return <div className="ion-padding">Cargando mapa…</div>;

  return (
    <div className="map-wrapper">
      <MapContainer center={[18.5, -69.9]} zoom={7} style={{ height: '100%', width: '100%' }}>
        <MapReady onReady={(m: L.Map) => { mapRef.current = m; }} />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {areas.filter(a => a?.latitud && a?.longitud).map((a, i) => (
          <Marker key={i} position={[parseFloat(a.latitud), parseFloat(a.longitud)]}>
            <Popup>
              <strong>{a?.nombre}</strong><br />
              <Link to={`/areas/${a?.id}`}>Ver detalle</Link>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
