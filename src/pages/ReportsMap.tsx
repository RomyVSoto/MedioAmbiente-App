import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import type L from 'leaflet';
import { API } from '../services/api';
import { useAuth } from '../context/AuthContext';
import MapReady from '../components/MapReady';

export default function ReportsMap() {
  const { user } = useAuth();
  const [items, setItems] = useState<any[] | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!user?.token) { setItems([]); return; }
    API.misReportes(user.token).then(arr => setItems(arr ?? [])).catch(() => setItems([]));
  }, [user?.token]);

  if (items === null) return <div className="ion-padding">Cargando mapa…</div>;
  if (!user?.token)   return <div className="ion-padding">Inicia sesión para ver tus reportes en el mapa.</div>;

  return (
    <div className="map-wrapper">
      <MapContainer center={[18.5, -69.9]} zoom={7} style={{ height: '100%', width: '100%' }}>
        <MapReady onReady={(m: L.Map) => { mapRef.current = m; }} />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {items.filter(r => r?.latitud && r?.longitud).map((r, i) => (
          <Marker key={i} position={[parseFloat(r.latitud), parseFloat(r.longitud)]}>
            <Popup>
              <strong>{r?.titulo ?? 'Reporte'}</strong><br />
              {r?.estado && <span>Estado: {r.estado}</span>}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
