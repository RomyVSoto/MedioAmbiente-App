import { Capacitor, CapacitorHttp } from '@capacitor/core';

export interface ApiResponse<T = unknown> {
  exito?: boolean;
  mensaje?: string;
  datos?: T;
}

type Options = {
  authToken?: string;
  method?: 'GET' | 'POST';
  body?: any;
  query?: Record<string, string | number | boolean | undefined | null>;
};

const REMOTE_BASE = 'https://adamix.net/medioambiente';
const ALLORIGINS  = 'https://api.allorigins.win/raw?url=';

const IS_NATIVE = Capacitor.getPlatform() !== 'web';
const IS_DEV    = process.env.NODE_ENV !== 'production';
const AUTH_MODE: 'header' | 'query' = 'header';
const TOKEN_HEADER = 'Authorization';
const TOKEN_SCHEME = 'Bearer ';
const TOKEN_QUERY_KEY = 'token';

const ENDPOINTS = {
  servicios: '/servicios',
  noticias: '/noticias',
  videos: '/videos',
  areas: '/areas',
  areaById: (id: string) => `/areas/${id}`,
  medidas: '/medidas',
  equipo: '/equipo',
  voluntariado: '/voluntariado',
  login: '/login',
  recuperarClave: '/recuperar-clave',
  normativas: '/normativas',
  reportar: '/reportes',
  misReportes: '/mis-reportes',
  cambiarClave: '/cambiar-clave'
};

function asArray<T = any>(raw: any): T[] {
  if (Array.isArray(raw)) return raw as T[];
  if (raw && Array.isArray(raw.datos)) return raw.datos as T[];
  if (raw && Array.isArray(raw.data))  return raw.data as T[];
  return [];
}
function asObject<T = any>(raw: any): T | null {
  if (!raw || Array.isArray(raw)) return null;
  if (raw.datos && typeof raw.datos === 'object') return raw.datos as T;
  return raw as T;
}
function joinUrl(base: string, path: string) {
  const b = base.endsWith('/') ? base.slice(0, -1) : base;
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${b}${p}`;
}
function buildRemoteUrl(path: string, opt: Options) {
  const u = new URL(joinUrl(REMOTE_BASE, path));
  if (opt.query) for (const [k, v] of Object.entries(opt.query)) {
    if (v !== undefined && v !== null) u.searchParams.set(k, String(v));
  }
  if (AUTH_MODE === 'query' && opt.authToken) u.searchParams.set(TOKEN_QUERY_KEY, opt.authToken);
  return u.toString();
}
function proxyUrl(remote: string) {
  return ALLORIGINS + encodeURIComponent(remote);
}

async function request<T = any>(path: string, opt: Options = {}): Promise<T> {
  const method = opt.method ?? 'GET';
  const remoteUrl = buildRemoteUrl(path, opt);
  const headers: Record<string, string> = { 'Accept': 'application/json', 'Content-Type': 'application/json' };
  if (AUTH_MODE === 'header' && opt.authToken) headers[TOKEN_HEADER] = TOKEN_SCHEME + opt.authToken;

  console.log('[API] →', method, remoteUrl, { IS_NATIVE });

  if (IS_NATIVE) {
    try {
      const resp = await CapacitorHttp.request({
        url: remoteUrl,
        method,
        headers,
        data: opt.body ?? undefined,
      });
      console.log('[API:native] ←', resp.status, remoteUrl);
      if (resp.status < 200 || resp.status >= 300) throw new Error(`HTTP ${resp.status}: ${JSON.stringify(resp.data).slice(0,200)}`);
      return resp.data as T;
    } catch (e: any) {
      if (method === 'GET') {
        const alt = proxyUrl(remoteUrl);
        console.warn('[API:native] fallo, retry via AllOrigins →', alt);
        const r = await CapacitorHttp.get({ url: alt, headers: { 'Accept': 'application/json' } });
        if (r.status < 200 || r.status >= 300) throw new Error(`HTTP ${r.status}: ${JSON.stringify(r.data).slice(0,200)}`);
        return typeof r.data === 'string' ? JSON.parse(r.data) : (r.data as T);
      }
      throw e;
    }
  }

  try {
    const res = await fetch(remoteUrl, { method, headers, body: opt.body ? JSON.stringify(opt.body) : undefined });
    const txt = await res.text();
    console.log('[API:web] ←', res.status, txt.slice(0,180));
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${txt.slice(0,200)}`);
    return JSON.parse(txt);
  } catch (e: any) {
    if (method === 'GET') {
      const alt = proxyUrl(remoteUrl);
      console.warn('[API:web] fallo, retry via proxy →', alt);
      const res2 = await fetch(alt);
      const txt2 = await res2.text();
      if (!res2.ok) throw new Error(`HTTP ${res2.status}: ${txt2.slice(0,200)}`);
      return JSON.parse(txt2);
    }
    throw e;
  }
}

export const API = {
  servicios: () => request(ENDPOINTS.servicios).then(asArray),
  noticias:  () => request(ENDPOINTS.noticias).then(asArray),
  videos:    () => request(ENDPOINTS.videos).then(asArray),
  medidas:   () => request(ENDPOINTS.medidas).then(asArray),
  equipo:    () => request(ENDPOINTS.equipo).then(asArray),

  areas:     () => request(ENDPOINTS.areas).then(asArray),
  areaById:  (id: string) => request(ENDPOINTS.areaById(id)).then(asObject),

  voluntariado: (p: { cedula: string; nombre: string; correo: string; clave: string; telefono: string; }) =>
    request<ApiResponse>(ENDPOINTS.voluntariado, { method: 'POST', body: p }),

  login: (correo: string, clave: string) =>
    request(ENDPOINTS.login, { method: 'POST', body: { correo, clave } })
      .then((raw: any) => ({
        exito: !!(raw?.datos?.token ?? raw?.token),
        mensaje: raw?.mensaje,
        datos: { token: raw?.datos?.token ?? raw?.token, nombre: raw?.datos?.nombre }
      }) as ApiResponse<{ token: string; nombre?: string }>),

  recuperarClave: (correo: string) =>
    request<ApiResponse>(ENDPOINTS.recuperarClave, { method: 'POST', body: { correo } }),

  normativas: (token: string) =>
    request(ENDPOINTS.normativas, { authToken: token }).then(asArray),

  reportar: (token: string, payload: { titulo: string; descripcion: string; foto: string; latitud: number; longitud: number; }) =>
    request<ApiResponse>(ENDPOINTS.reportar, { method: 'POST', body: payload, authToken: token }),

  misReportes: (token: string) =>
    request(ENDPOINTS.misReportes, { authToken: token }).then(asArray),

  cambiarClave: (token: string, actual: string, nueva: string) =>
    request<ApiResponse>(ENDPOINTS.cambiarClave, { method: 'POST', body: { actual, nueva }, authToken: token })
};
