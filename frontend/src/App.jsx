import React from 'react';
import Login from './components/Login.jsx';
import ChatBot from './components/ChatBot.jsx';

export default function App() {
  const [authenticated, setAuthenticated] = React.useState(false);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', margin: '2rem' }}>
      {authenticated ? (
        <ChatBot />
      ) : (
        <Login onSuccess={() => setAuthenticated(true)} />
      )}
    </div>
  );
}
