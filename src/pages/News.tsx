import React, { useEffect, useState } from 'react';
import { IonList, IonItem, IonLabel } from '@ionic/react';
import { API } from '../services/api';

export default function News() {
  const [items, setItems] = useState<any[] | null>(null);

  useEffect(() => {
    let alive = true;
    API.noticias().then(arr => alive && setItems(arr ?? [])).catch(() => alive && setItems([]));
    return () => { alive = false; };
  }, []);

  if (items === null) return <div className="ion-padding">Cargando…</div>;
  if (!items.length)   return <div className="ion-padding">Sin noticias.</div>;

  return (
    <IonList>
      {items.map((n, i) => (
        <IonItem key={i} href={n?.url ?? '#'} target="_blank">
          <IonLabel>
            <h2>{n?.titulo ?? 'Noticia'}</h2>
            <p>{n?.descripcion ?? ''}</p>
          </IonLabel>
        </IonItem>
      ))}
    </IonList>
  );
}
