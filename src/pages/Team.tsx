import React, { useEffect, useState } from 'react';
import { IonList, IonItem, IonLabel } from '@ionic/react';
import { API } from '../services/api';

export default function Team() {
  const [items, setItems] = useState<any[] | null>(null);

  useEffect(() => {
    let alive = true;
    API.equipo().then(arr => alive && setItems(arr ?? [])).catch(() => alive && setItems([]));
    return () => { alive = false; };
  }, []);

  if (items === null) return <div className="ion-padding">Cargando…</div>;
  if (!items.length)   return <div className="ion-padding">Sin miembros del equipo.</div>;

  return (
    <IonList>
      {items.map((p, i) => (
        <IonItem key={i}>
          <IonLabel>
            <h2>{p?.nombre ?? 'Miembro'}</h2>
            <p>{p?.cargo ?? p?.rol ?? ''}</p>
          </IonLabel>
        </IonItem>
      ))}
    </IonList>
  );
}
