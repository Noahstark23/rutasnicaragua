# Rutas Nicaragua Backend

Este proyecto provee un backend en Flask para importar y consultar rutas de buses de Nicaragua.

## Instalación

```bash
pip install -r requirements.txt
cp .env.example .env
```

## Uso

- `python run.py` inicia la aplicación.
- `python scripts/import_gtfs.py` importa archivos GTFS desde `data/gtfs/<REGION>`.
- `python scripts/import_json.py archivo.json REGION` carga rutas desde un JSON estructurado.

La API expone los siguientes endpoints:

- `/api/regiones`
- `/api/rutas?region=Estelí`
- `/api/paradas?ruta=0501`

El sistema incluye autenticación mejorada con contraseñas hasheadas usando `werkzeug.security`.
