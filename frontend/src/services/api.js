export async function getRutas(region) {
  const res = await fetch(`/api/rutas?region=${region}`);
  return res.json();
}

export async function getParadas(ruta) {
  const res = await fetch(`/api/paradas?ruta=${ruta}`);
  return res.json();
}
