import { useState } from 'react';

function Landing({ onSearch }) {
  const [region, setRegion] = useState('Managua');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(region);
  };

  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold mb-4">Rutas Nicaragua</h1>
      <p className="mb-8">Explorá todas las rutas de buses del país en un solo mapa</p>
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="border px-3 py-2"
        >
          <option value="Managua">Managua</option>
          <option value="Leon">León</option>
          <option value="Masaya">Masaya</option>
          {/* otros departamentos */}
        </select>
        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
          Buscar rutas
        </button>
      </form>
    </div>
  );
}

export default Landing;
