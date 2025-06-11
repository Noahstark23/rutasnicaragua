import React from 'react';
import MapView from './components/MapView.jsx';
import ChatBot from './components/ChatBot.jsx';
import RouteSearch from './components/RouteSearch.jsx';
import AdminPanel from './components/AdminPanel.jsx';

export default function App() {
  return (
    <div>
      <h1>Rutas Nicaragua</h1>
      <RouteSearch />
      <MapView />
      <ChatBot />
      <AdminPanel />
    </div>
  );
}
