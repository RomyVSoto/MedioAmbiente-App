import React, { useState } from 'react';
import { IonButton, IonInput, IonItem } from '@ionic/react';
import { API } from '../services/api';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    try {
      const r = await API.recuperarClave(email);
      alert(r?.mensaje ?? 'Revisa tu correo');
    } catch {
      alert('No se pudo procesar la solicitud');
    } finally { setLoading(false); }
  };

  return (
    <div className="ion-padding">
      <h2>Recuperar Contraseña</h2>
      <IonItem><IonInput label="Correo" value={email} onIonChange={e=>setEmail(e.detail.value!)} /></IonItem>
      <IonButton expand="block" onClick={submit} disabled={loading}>
        {loading?'Enviando...':'Enviar enlace'}
      </IonButton>
    </div>
  );
}
