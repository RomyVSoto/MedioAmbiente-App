import React, { useMemo, useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonInput, IonButton, IonNote, IonToast
} from '@ionic/react';
import { API } from '../services/api';

function onlyDigits(s: string) { return (s || '').replace(/\D+/g, ''); }
function formatCedula(s: string) {
  const d = onlyDigits(s).slice(0, 11);                 
  const a = d.slice(0, 3), b = d.slice(3, 10), c = d.slice(10);
  return [a, b, c].filter(Boolean).join('-');           
}
function formatPhone(s: string) {
  const d = onlyDigits(s).slice(0, 10);                 
  const a = d.slice(0, 3), b = d.slice(3, 6), c = d.slice(6);
  if (d.length <= 7) return [a, b].filter(Boolean).join('-'); 
  return [a, b, c].filter(Boolean).join('-');           
}

export default function Volunteer() {
  const [cedula, setCedula]     = useState('');
  const [nombre, setNombre]     = useState('');
  const [correo, setCorreo]     = useState('');
  const [clave, setClave]       = useState('');
  const [telefono, setTelefono] = useState('');
  const [loading, setLoading]   = useState(false);
  const [toast, setToast]       = useState<{open:boolean; msg:string; color?:'success'|'danger'}>({open:false, msg:''});

  const valid = useMemo(() => {
    const okCed = onlyDigits(cedula).length === 11;
    const okNom = nombre.trim().length >= 3;
    const okMail = /\S+@\S+\.\S+/.test(correo);
    const okPass = clave.length >= 4;
    const okTel = onlyDigits(telefono).length >= 10;
    return okCed && okNom && okMail && okPass && okTel;
  }, [cedula, nombre, correo, clave, telefono]);

  async function onSubmit() {
    if (!valid || loading) return;
    setLoading(true);
    try {
      const res = await API.voluntariado({
        cedula: onlyDigits(cedula),
        nombre: nombre.trim(),
        correo: correo.trim(),
        clave,
        telefono: onlyDigits(telefono),
      });
      const ok = (res as any)?.exito !== false;
      const msg = (res as any)?.mensaje ?? 'Solicitud enviada correctamente';
      setToast({ open: true, msg, color: ok ? 'success' : 'danger' });
      if (ok) {
        setCedula(''); setNombre(''); setCorreo(''); setClave(''); setTelefono('');
      }
    } catch (e: any) {
      setToast({ open: true, msg: String(e?.message ?? e), color: 'danger' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar><IonTitle>Voluntariado / Registro</IonTitle></IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonNote color="medium">
          Completa tus datos para solicitar el registro como voluntario.
        </IonNote>

        <IonList lines="full">
          <IonItem>
            <IonLabel position="stacked">Cédula</IonLabel>
            <IonInput
              value={cedula}
              inputmode="numeric"
              placeholder="000-0000000-0"
              onIonInput={(e) => setCedula(formatCedula(e.detail.value ?? ''))}
            />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Nombre</IonLabel>
            <IonInput
              value={nombre}
              placeholder="Nombre y Apellido"
              onIonInput={(e) => setNombre(e.detail.value ?? '')}
            />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Correo</IonLabel>
            <IonInput
              value={correo}
              type="email"
              placeholder="tucorreo@ejemplo.com"
              onIonInput={(e) => setCorreo(e.detail.value ?? '')}
            />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Contraseña</IonLabel>
            <IonInput
              value={clave}
              type="password"
              onIonInput={(e) => setClave(e.detail.value ?? '')}
            />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Teléfono</IonLabel>
            <IonInput
              value={telefono}
              inputmode="tel"
              placeholder="809-555-1234"
              onIonInput={(e) => setTelefono(formatPhone(e.detail.value ?? ''))}
            />
          </IonItem>
        </IonList>

        <IonButton
          expand="block"
          disabled={!valid || loading}
          onClick={onSubmit}
        >
          {loading ? 'Enviando…' : 'Enviar solicitud'}
        </IonButton>

        <div style={{marginTop:12, textAlign:'center'}}>
          <IonNote color="medium">
            ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
          </IonNote>
        </div>

        <IonToast
          isOpen={toast.open}
          message={toast.msg}
          color={toast.color}
          duration={2200}
          onDidDismiss={() => setToast({ ...toast, open:false })}
        />
      </IonContent>
    </IonPage>
  );
}
