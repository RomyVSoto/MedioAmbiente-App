import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import type L from 'leaflet';

export default function MapReady({ onReady }: { onReady: (m: L.Map) => void }) {
  const map = useMap();
  useEffect(() => {
    onReady(map);
    const t = setTimeout(() => map.invalidateSize(), 150);
    return () => clearTimeout(t);
  }, [map, onReady]);
  return null;
}
