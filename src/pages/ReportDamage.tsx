import React, { useState } from 'react';
import { IonButton, IonInput, IonTextarea } from '@ionic/react';
import { API } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function ReportDamage() {
  const { user } = useAuth();
  const [form, setForm] = useState({ titulo: '', descripcion: '', foto: '', latitud: 0, longitud: 0 });
  const [msg, setMsg] = useState<string | null>(null);

  const pickPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setForm(p => ({ ...p, foto: String(reader.result) }));
    reader.readAsDataURL(f);
  };

  const useLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setForm(p => ({ ...p, latitud: pos.coords.latitude, longitud: pos.coords.longitude })),
      () => setMsg('No se pudo obtener la ubicación')
    );
  };

  const submit = async () => {
    if (!user?.token) { setMsg('Inicia sesión'); return; }
    const r = await API.reportar(user.token, form);
    setMsg(r?.mensaje ?? 'Enviado');
  };

  return (
    <div className="ion-padding">
      <IonInput value={form.titulo} placeholder="Título"
        onIonChange={e => setForm(p => ({ ...p, titulo: e.detail.value! }))} />
      <IonTextarea value={form.descripcion} placeholder="Descripción"
        onIonChange={e => setForm(p => ({ ...p, descripcion: e.detail.value! }))} />
      <input type="file" accept="image/*" onChange={pickPhoto} />
      <IonButton onClick={useLocation}>Usar ubicación</IonButton>
      <IonButton onClick={submit}>Enviar</IonButton>
      {msg && <p>{msg}</p>}
    </div>
  );
}
