import React from 'react';
import {
  IonContent, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonMenuToggle
} from '@ionic/react';
import { useAuth } from '../context/AuthContext';
import {
  home, informationCircle, newspaper, playCircle, leaf, map, people, personAdd,
  person, lockClosed, documentText, alertCircle, mapOutline, keyOutline, logOut
} from 'ionicons/icons';
import { Link, useLocation } from 'react-router-dom';

type Entry = { title: string; url: string; icon: string; onlyAuth?: boolean; onlyAnon?: boolean };

export default function AppMenu() {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();

  const entries: Entry[] = [
    { title: 'Inicio', url: '/', icon: home },
    { title: 'Sobre Nosotros', url: '/about', icon: informationCircle },
    { title: 'Servicios', url: '/services', icon: leaf },
    { title: 'Noticias', url: '/news', icon: newspaper },
    { title: 'Videos', url: '/videos', icon: playCircle },
    { title: 'Áreas Protegidas', url: '/areas', icon: map },
    { title: 'Mapa Áreas', url: '/areas-map', icon: map },
    { title: 'Medidas Ambientales', url: '/measures', icon: documentText },
    { title: 'Equipo del Ministerio', url: '/team', icon: people },
    { title: 'Voluntariado', url: '/volunteer', icon: personAdd },
    { title: 'Acerca de', url: '/about-dev', icon: informationCircle },

    { title: 'Normativas', url: '/norms', icon: documentText, onlyAuth: true },
    { title: 'Reportar Daño', url: '/report', icon: alertCircle, onlyAuth: true },
    { title: 'Mis Reportes', url: '/my-reports', icon: person, onlyAuth: true },
    { title: 'Mapa de Reportes', url: '/reports-map', icon: mapOutline, onlyAuth: true },
    { title: 'Cambiar Contraseña', url: '/change-password', icon: keyOutline, onlyAuth: true },

    { title: 'Iniciar Sesión', url: '/login', icon: lockClosed, onlyAnon: true },
    { title: 'Recuperar Clave', url: '/forgot', icon: keyOutline, onlyAnon: true }
  ];

  const visible = entries.filter(e =>
    (!e.onlyAuth && !e.onlyAnon) ||
    (e.onlyAuth && user) ||
    (e.onlyAnon && !user)
  );

  return (
    <IonMenu contentId="main">
      <IonContent>
        <IonList>
          {visible.map(e => (
            <IonMenuToggle key={e.url} autoHide={false}>
              <IonItem routerLink={e.url} routerDirection="root" detail={false} color={pathname===e.url?'light':undefined}>
                <IonIcon slot="start" icon={e.icon} />
                <IonLabel>{e.title}</IonLabel>
              </IonItem>
            </IonMenuToggle>
          ))}
          {user && (
            <IonItem button onClick={logout} color="danger">
              <IonIcon slot="start" icon={logOut} />
              <IonLabel>Cerrar sesión</IonLabel>
            </IonItem>
          )}
        </IonList>
      </IonContent>
    </IonMenu>
  );
}
