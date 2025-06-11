import { useEffect, useState } from 'react';
import axios from 'axios';

export default function StopEditor({ routeId }) {
  const [stops, setStops] = useState([]);
  const [form, setForm] = useState({ name: '', lat: '', lon: '' });

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });

  const loadStops = async () => {
    const res = await api.get(`/api/routes/${routeId}/stops`);
    setStops(res.data);
  };

  useEffect(() => { if (routeId) loadStops(); }, [routeId]);

  const saveStop = async () => {
    await api.post(`/api/routes/${routeId}/stops`, form);
    setForm({ name: '', lat: '', lon: '' });
    loadStops();
  };

  return (
    <div>
      <h4>Paradas</h4>
      <div className="mb-2">
        <input placeholder="Nombre" className="form-control mb-1" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
        <input placeholder="Latitud" className="form-control mb-1" value={form.lat} onChange={e=>setForm({...form,lat:e.target.value})}/>
        <input placeholder="Longitud" className="form-control mb-1" value={form.lon} onChange={e=>setForm({...form,lon:e.target.value})}/>
        <button className="btn btn-sm btn-primary" onClick={saveStop}>Agregar</button>
      </div>
      <ul className="list-group">
        {stops.map(s => (
          <li key={s.id} className="list-group-item">{s.name} ({s.lat},{s.lon})</li>
        ))}
      </ul>
    </div>
  );
}
