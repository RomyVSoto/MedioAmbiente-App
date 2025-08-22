import React, { useState } from 'react';
import { IonButton, IonInput, IonItem } from '@ionic/react';
import { useAuth } from '../context/AuthContext';
import { API } from '../services/api';

export default function ChangePassword() {
  const { user } = useAuth();
  const [actual, setActual] = useState('');
  const [nueva, setNueva] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!user?.token) return alert('Inicia sesión');
    setLoading(true);
    try {
      const r = await API.cambiarClave(user.token, actual, nueva);
      alert(r?.mensaje ?? 'Clave cambiada');
      setActual(''); setNueva('');
    } catch {
      alert('No se pudo cambiar la clave');
    } finally { setLoading(false); }
  };

  return (
    <div className="ion-padding">
      <h2>Cambiar Contraseña</h2>
      <IonItem><IonInput label="Clave actual" type="password" value={actual} onIonChange={e=>setActual(e.detail.value!)} /></IonItem>
      <IonItem><IonInput label="Clave nueva" type="password" value={nueva} onIonChange={e=>setNueva(e.detail.value!)} /></IonItem>
      <IonButton expand="block" onClick={submit} disabled={loading}>
        {loading?'Guardando...':'Guardar'}
      </IonButton>
    </div>
  );
}
