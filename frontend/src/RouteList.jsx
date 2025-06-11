import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function RouteList({ onEdit }) {
  const [routes, setRoutes] = useState([]);
  const navigate = useNavigate();

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });

  const loadRoutes = async () => {
    const res = await api.get('/api/routes');
    setRoutes(res.data);
  };

  useEffect(() => { loadRoutes(); }, []);

  const remove = async (id) => {
    await api.delete(`/api/routes/${id}`);
    loadRoutes();
  };

  const openStops = (route) => {
    onEdit(route);
    navigate('/stops');
  };

  return (
    <div>
      <h3>Rutas</h3>
      <button className="btn btn-sm btn-success mb-2" onClick={() => onEdit({})}>Agregar nueva</button>
      <Link className="btn btn-sm btn-secondary ms-2" to="/import">Importar JSON</Link>
      <table className="table table-striped mt-2">
        <thead>
          <tr><th>ID</th><th>Corto</th><th>Largo</th><th>Tipo</th><th>Región</th><th></th></tr>
        </thead>
        <tbody>
          {routes.map(r => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.shortName}</td>
              <td>{r.longName}</td>
              <td>{r.type}</td>
              <td>{r.region}</td>
              <td>
                <button className="btn btn-sm btn-primary me-1" onClick={() => openStops(r)}>Editar</button>
                <button className="btn btn-sm btn-danger" onClick={() => remove(r.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
