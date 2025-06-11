# rutasnicaragua

API REST para gestionar rutas de buses en Nicaragua.

## Instalación

```bash
npm install
```

## Uso

Crear un archivo `.env` con las variables:

```
MONGODB_URI=<conexion a MongoDB>
JWT_SECRET=<secreto para JWT>
PORT=3000
```

Arrancar el servidor:

```bash
npm start
```

La API expone rutas de autenticación en `/api/auth` y rutas de buses en `/api/routes`.
