import React, { useState } from 'react';
import { IonButton, IonInput } from '@ionic/react';
import { useAuth } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState(''); const [pass, setPass] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const history = useHistory();

  const doLogin = async () => {
    const r = await login(email, pass);
    if (r.ok) history.replace('/'); else setErr(r.msg ?? 'Error');
  };

  return (
    <div className="ion-padding">
      <IonInput placeholder="Correo" value={email} onIonChange={e => setEmail(e.detail.value!)} />
      <IonInput placeholder="Clave" type="password" value={pass} onIonChange={e => setPass(e.detail.value!)} />
      <IonButton onClick={doLogin}>Entrar</IonButton>
      {err && <p style={{color:'crimson'}}>{err}</p>}
    </div>
  );
}
