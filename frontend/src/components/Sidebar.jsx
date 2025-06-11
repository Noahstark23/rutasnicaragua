function Sidebar(/* onSelectRuta */) {
  return (
    <div className="p-4 bg-white shadow h-full overflow-y-auto w-60">
      <input
        type="text"
        placeholder="Buscar ciudad"
        className="border w-full mb-4 px-2 py-1"
      />
      <button className="w-full bg-green-600 text-white py-2 mb-4 rounded">
        Ver horarios
      </button>
      {/* Aquí podrían listarse rutas */}
      <div className="text-sm text-gray-500">Seleccione una ruta en el mapa</div>
    </div>
  );
}

export default Sidebar;
