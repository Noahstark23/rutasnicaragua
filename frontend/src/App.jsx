import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing.jsx';
import MapView from './components/MapView.jsx';
import Sidebar from './components/Sidebar.jsx';
import Login from './components/Login.jsx';

function App() {
  const [region, setRegion] = useState(null);
  const [rutaId, setRutaId] = useState(null);
  const [logged, setLogged] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login onLogin={() => setLogged(true)} />} />
        <Route
          path="/"
          element={
            logged ? (
              region ? (
                <div className="flex h-screen">
                  <Sidebar onSelectRuta={setRutaId} />
                  <div className="flex-1">
                    <MapView region={region} rutaId={rutaId} />
                  </div>
                </div>
              ) : (
                <Landing onSearch={(reg) => setRegion(reg)} />
              )
            ) : (
              <Login onLogin={() => setLogged(true)} />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
