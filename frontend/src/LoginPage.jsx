import { useState } from 'react';
import axios from 'axios';

export default function LoginPage({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/login`, { password });
      localStorage.setItem('token', res.data.token);
      onLogin();
    } catch (err) {
      setError('Credenciales inválidas');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <h2>Administrador</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Clave de acceso</label>
          <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        {error && <div className="text-danger mb-2">{error}</div>}
        <button type="submit" className="btn btn-primary">Ingresar</button>
      </form>
    </div>
  );
}
