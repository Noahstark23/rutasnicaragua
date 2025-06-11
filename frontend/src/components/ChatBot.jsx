import React from 'react';

export default function ChatBot() {
  const [messages, setMessages] = React.useState([
    { from: 'bot', text: 'Hola, ¿en qué puedo ayudarte hoy?' },
  ]);
  const [input, setInput] = React.useState('');

  async function sendMessage(e) {
    e.preventDefault();
    if (!input.trim()) return;
    const text = input.trim();
    addMessage({ from: 'user', text });
    setInput('');
    const reply = await interpretMessage(text);
    addMessage({ from: 'bot', text: reply });
  }

  function addMessage(msg) {
    setMessages((prev) => [...prev, msg]);
  }

  async function interpretMessage(msg) {
    // Extremely naive intent detection
    const lower = msg.toLowerCase();
    if (lower.includes('cuánto') && lower.includes('cuesta')) {
      return 'Costo estimado no disponible aún';
    }

    const routeMatch = msg.match(/de\s+(\w+)\s+a\s+(\w+)/i);
    if (routeMatch) {
      const origen = routeMatch[1];
      const destino = routeMatch[2];
      try {
        const res = await fetch(`/api/rutas?region=${origen}`);
        if (!res.ok) throw new Error('network');
        const data = await res.json();
        // Fake use of data for demo
        return `Hay salidas desde ${origen} hacia ${destino} a las 5:00, 6:30, 8:00 AM`;
      } catch (err) {
        return 'Lo siento, aún no tengo información suficiente para esa ruta.';
      }
    }

    return 'Lo siento, aún no tengo información suficiente para esa ruta.';
  }

  return (
    <div style={styles.container}>
      <div style={styles.messages}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              ...styles.msg,
              ...(msg.from === 'user' ? styles.user : styles.bot),
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} style={styles.inputArea}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu mensaje"
          style={styles.input}
        />
        <button type="submit" style={styles.send}>Enviar</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '400px',
    margin: '0 auto',
    border: '1px solid #ccc',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  messages: {
    flex: 1,
    padding: '1rem',
    height: '300px',
    overflowY: 'auto',
    background: '#f5f5f5',
  },
  msg: {
    margin: '0.25rem 0',
    padding: '0.5rem 0.75rem',
    borderRadius: '10px',
    maxWidth: '80%',
  },
  user: {
    background: '#dcf8c6',
    alignSelf: 'flex-end',
  },
  bot: {
    background: 'white',
    alignSelf: 'flex-start',
  },
  inputArea: {
    display: 'flex',
    borderTop: '1px solid #ccc',
  },
  input: {
    flex: 1,
    padding: '0.5rem',
    border: 'none',
    fontSize: '1rem',
  },
  send: {
    padding: '0 1rem',
    border: 'none',
    background: '#4caf50',
    color: 'white',
    cursor: 'pointer',
  },
};
