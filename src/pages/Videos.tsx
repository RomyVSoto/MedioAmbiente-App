import React, { useEffect, useState } from 'react';
import { IonList, IonItem, IonLabel } from '@ionic/react';
import { API } from '../services/api';

export default function Videos() {
  const [items, setItems] = useState<any[] | null>(null);

  useEffect(() => {
    let alive = true;
    API.videos().then(arr => alive && setItems(arr ?? [])).catch(() => alive && setItems([]));
    return () => { alive = false; };
  }, []);

  if (items === null) return <div className="ion-padding">Cargando…</div>;
  if (!items.length)   return <div className="ion-padding">Sin videos.</div>;

  return (
    <IonList>
      {items.map((v, i) => (
        <IonItem key={i} href={v?.url ?? '#'} target="_blank">
          <IonLabel>
            <h2>{v?.titulo ?? 'Video'}</h2>
            <p>{v?.descripcion ?? ''}</p>
          </IonLabel>
        </IonItem>
      ))}
    </IonList>
  );
}
