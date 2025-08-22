import React, { useEffect, useState } from 'react';
import { IonList, IonItem, IonLabel } from '@ionic/react';
import { API } from '../services/api';
import { Link } from 'react-router-dom';

export default function ProtectedAreas() {
  const [areas, setAreas] = useState<any[] | null>(null);

  useEffect(() => {
    let alive = true;
    API.areas().then(a => { if (alive) setAreas(a ?? []); })
               .catch(() => { if (alive) setAreas([]); });
    return () => { alive = false; };
  }, []);

  if (areas === null) return <div className="ion-padding">Cargando…</div>;
  if (!areas.length)  return <div className="ion-padding">Sin áreas</div>;

  return (
    <IonList>
      {areas.map((a, i) => (
        <IonItem key={i} routerLink={`/areas/${a?.id}`}>
          <IonLabel>
            <h2>{a?.nombre ?? 'Área protegida'}</h2>
            <p>{a?.descripcion ?? ''}</p>
          </IonLabel>
        </IonItem>
      ))}
      <IonItem routerLink="/areas-map"><IonLabel>Ver mapa</IonLabel></IonItem>
    </IonList>
  );
}
