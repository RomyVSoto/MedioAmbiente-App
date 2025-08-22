import React, {createContext, useContext, useEffect, useMemo, useState} from 'react';
import { API } from '../services/api';

type User = { token: string; nombre?: string } | null;

type AuthCtx = {
  user: User;
  loading: boolean;
  login: (correo: string, clave: string) => Promise<boolean>;
  logout: () => void;
  setUser: (u: User) => void;
};

const Ctx = createContext<AuthCtx>({
  user: null, loading: true, login: async () => false, logout: () => {}, setUser: () => {}
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  // Carga inicial desde storage
  useEffect(() => {
    try {
      const raw = localStorage.getItem('auth');
      if (raw) setUser(JSON.parse(raw));
    } catch {}
    setLoading(false);
  }, []);

  // Persiste cambios
  useEffect(() => {
    if (user) localStorage.setItem('auth', JSON.stringify(user));
    else localStorage.removeItem('auth');
  }, [user]);

  const login = async (correo: string, clave: string) => {
    try {
      const res = await API.login(correo, clave);
      if (res.exito && res.datos?.token) {
        setUser({ token: res.datos.token, nombre: res.datos.nombre });
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const logout = () => setUser(null);

  const value = useMemo(() => ({ user, loading, login, logout, setUser }), [user, loading]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useAuth = () => useContext(Ctx);
