# Rutas Nicaragua

Este proyecto organiza rutas de transporte de Nicaragua usando una API construida con FastAPI y una interfaz en React.

## Estructura
- **backend/**: código del servidor FastAPI.
- **data/**: archivos de ejemplo GTFS y rutas en formato JSON.
- **frontend/**: proyecto React con componentes básicos.
- **exports/**: carpeta vacía para exportar GTFS procesado.

Clona el repositorio e instala las dependencias de Python:

```bash
pip install -r requirements.txt
```

Luego ejecuta el servidor:

```bash
uvicorn backend.app:app --reload
```
