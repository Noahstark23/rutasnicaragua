import { useState } from 'react';
import axios from 'axios';

export default function JsonImporter({ onImported }) {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });

  const handleUpload = async () => {
    const form = new FormData();
    form.append('file', file);
    await api.post('/api/import', form);
    setMessage('Importado correctamente');
    onImported();
  };

  return (
    <div>
      <h3>Importar JSON</h3>
      <input type="file" accept="application/json" onChange={e => setFile(e.target.files[0])} />
      <button className="btn btn-sm btn-primary ms-2" onClick={handleUpload} disabled={!file}>Validar y Cargar</button>
      {message && <div className="mt-2 text-success">{message}</div>}
    </div>
  );
}
