import React from 'react';
import { IonApp, IonSplitPane, IonPage, IonContent } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import AppHeader from './components/AppHeader';
import AppMenu from './components/AppMenu';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <AppMenu />
          <IonPage id="main">
            <AppHeader />
            <IonContent fullscreen>
              <AppRoutes />
            </IonContent>
          </IonPage>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
}
