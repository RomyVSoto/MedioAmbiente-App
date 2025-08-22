import React, { useEffect, useState } from 'react';
import { IonList, IonItem, IonLabel } from '@ionic/react';
import { API } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function MyReports() {
  const { user } = useAuth();
  const [items, setItems] = useState<any[] | null>(null);

  useEffect(() => {
    if (!user?.token) { setItems([]); return; }
    API.misReportes(user.token)
      .then(arr => setItems(arr ?? []))
      .catch(() => setItems([]));
  }, [user?.token]);

  if (items === null) return <div className="ion-padding">Cargando…</div>;
  if (!items.length)  return <div className="ion-padding">Sin reportes.</div>;

  return (
    <IonList>
      {items.map((r, i) => (
        <IonItem key={i}>
          <IonLabel>
            <h2>{r?.titulo ?? 'Reporte'}</h2>
            <p>{r?.estado ? `Estado: ${r.estado}` : ''}</p>
            <p>{r?.fecha ?? ''}</p>
          </IonLabel>
        </IonItem>
      ))}
    </IonList>
  );
}
