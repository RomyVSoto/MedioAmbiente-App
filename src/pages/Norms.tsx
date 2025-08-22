import React, { useEffect, useState } from 'react';
import { IonList, IonItem, IonLabel } from '@ionic/react';
import { API } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Norms() {
  const { user } = useAuth();
  const [items, setItems] = useState<any[] | null>(null);

  useEffect(() => {
    let alive = true;
    if (!user?.token) { setItems([]); return; }
    API.normativas(user.token)
      .then(arr => alive && setItems(arr ?? []))
      .catch(() => alive && setItems([]));
    return () => { alive = false; };
  }, [user?.token]);

  if (items === null) return <div className="ion-padding">Cargando…</div>;
  if (!items.length)   return <div className="ion-padding">Sin normativas.</div>;

  return (
    <IonList>
      {items.map((n, i) => (
        <IonItem key={i} href={n?.url ?? '#'} target="_blank">
          <IonLabel>
            <h2>{n?.titulo ?? 'Normativa'}</h2>
            <p>{n?.descripcion ?? ''}</p>
          </IonLabel>
        </IonItem>
      ))}
    </IonList>
  );
}
