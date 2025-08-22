import React from 'react';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton } from '@ionic/react';

export default function AppHeader() {
  return (
    <IonHeader>
      <IonToolbar color="primary">
        <IonButtons slot="start"><IonMenuButton /></IonButtons>
        <IonTitle>Medio Ambiente RD</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
}
