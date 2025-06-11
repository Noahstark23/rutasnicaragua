import React from 'react';

export default function Login({ onSuccess }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Por favor ingrese usuario y contraseña');
      return;
    }
    setError(null);
    // fake authentication success
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} style={styles.container}>
      <h2>Iniciar Sesión</h2>
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />
      {error && <div style={styles.error}>{error}</div>}
      <button type="submit" style={styles.button}>Entrar</button>
    </form>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '300px',
    margin: '0 auto',
  },
  input: {
    marginBottom: '0.5rem',
    padding: '0.5rem',
    fontSize: '1rem',
  },
  button: {
    padding: '0.5rem',
    fontSize: '1rem',
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginBottom: '0.5rem',
  },
};
