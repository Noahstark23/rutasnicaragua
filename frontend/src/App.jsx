import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import LoginPage from './LoginPage.jsx';
import RouteList from './RouteList.jsx';
import StopEditor from './StopEditor.jsx';
import JsonImporter from './JsonImporter.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

function PrivateRoute({ children }) {
  return localStorage.getItem('token') ? children : <Navigate to="/login" />;
}

export default function App() {
  const [selectedRoute, setSelectedRoute] = useState(null);
  const reload = () => setSelectedRoute(null);

  return (
    <BrowserRouter>
      <nav className="navbar navbar-light bg-light mb-3">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Panel</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={reload} />} />
        <Route path="/" element={<PrivateRoute><RouteList onEdit={setSelectedRoute} /></PrivateRoute>} />
        <Route path="/stops" element={<PrivateRoute>{selectedRoute ? <StopEditor routeId={selectedRoute.id} /> : <Navigate to="/" />}</PrivateRoute>} />
        <Route path="/import" element={<PrivateRoute><JsonImporter onImported={reload} /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
