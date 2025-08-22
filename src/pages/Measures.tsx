import React, { useEffect, useState } from 'react';
import { IonList, IonItem, IonLabel } from '@ionic/react';
import { API } from '../services/api';

export default function Measures() {
  const [items, setItems] = useState<any[] | null>(null);

  useEffect(() => {
    let alive = true;
    API.medidas().then(arr => alive && setItems(arr ?? [])).catch(() => alive && setItems([]));
    return () => { alive = false; };
  }, []);

  if (items === null) return <div className="ion-padding">Cargando…</div>;
  if (!items.length)   return <div className="ion-padding">Sin medidas.</div>;

  return (
    <IonList>
      {items.map((m, i) => (
        <IonItem key={i}>
          <IonLabel>
            <h2>{m?.nombre ?? 'Medida'}</h2>
            <p>{m?.descripcion ?? ''}</p>
          </IonLabel>
        </IonItem>
      ))}
    </IonList>
  );
}
