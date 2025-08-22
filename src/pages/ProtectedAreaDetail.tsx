import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API } from '../services/api';

export default function ProtectedAreaDetail() {
  const { id } = useParams<{ id: string }>();
  const [area, setArea] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    let alive = true;
    if (id) API.areaById(String(id))
      .then(obj => { if (alive) setArea(obj); })
      .catch(() => { if (alive) setArea(null); });
    return () => { alive = false; };
  }, [id]);

  if (!area) return <div className="ion-padding">Cargando…</div>;

  return (
    <div className="ion-padding">
      <h2>{area?.nombre ?? 'Área Protegida'}</h2>
      {area?.imagen && <img src={area.imagen} alt={area?.nombre ?? ''} style={{ width: '100%', borderRadius: 8 }} />}
      <p>{area?.descripcion ?? ''}</p>
      {area?.latitud && area?.longitud && (
        <p>Ubicación: {area.latitud}, {area.longitud}</p>
      )}
    </div>
  );
}
