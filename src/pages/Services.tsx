import React, { useEffect, useState } from 'react';
import { IonList, IonItem, IonLabel } from '@ionic/react';
import { API } from '../services/api';

export default function Services() {
  const [items, setItems] = useState<any[] | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    API.servicios()
      .then(arr => { if (alive) { setItems(arr ?? []); setErr(null); } })
      .catch((e: any) => { if (alive) { setItems([]); setErr(String(e?.message ?? e)); } });
    return () => { alive = false; };
  }, []);

  if (items === null) return <div className="ion-padding">Cargando…</div>;
  if (err) return <div className="ion-padding" style={{color:'crimson'}}>Error: {err}</div>;
  if (!items.length)   return <div className="ion-padding">Sin servicios disponibles</div>;

  return (
    <IonList>
      {items.map((s, i) => (
        <IonItem key={i}>
          <IonLabel>
            <h2>{s?.nombre ?? 'Servicio'}</h2>
            <p>{s?.descripcion ?? ''}</p>
          </IonLabel>
        </IonItem>
      ))}
    </IonList>
  );
}
