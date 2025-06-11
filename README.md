# rutasnicaragua

Backend base para un sistema de rutas de buses en Nicaragua. Incluye autenticación con JWT.

## Configuración
1. Copia `.env.example` a `.env` y ajusta las variables.
2. Instala dependencias:
   ```bash
   npm install
   ```
3. Inicia el servidor:
   ```bash
   node server.js
   ```

## Endpoints
- `POST /api/auth/register` – Registro de usuario.
- `POST /api/auth/login` – Obtiene un token JWT válido por 1 hora.
