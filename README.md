# rutasnicaragua

Aplicaci\u00f3n Flask que expone informaci\u00f3n de rutas de transporte p\u00fablico usando datos GTFS.

## Instalaci\u00f3n

1. Instale las dependencias:

```bash
pip install -r requirements.txt
```

2. Copie `.env.example` a `.env` y modifique la configuraci\u00f3n de la base de datos.

3. Cargue los archivos GTFS ubicados en `data/gtfs/` ejecutando:

```bash
python load_gtfs.py
```

4. Inicie la API:

```bash
python app.py
```

## Endpoints

- `GET /api/regiones`
- `GET /api/rutas?region=Managua`
- `GET /api/paradas?ruta=0501`
