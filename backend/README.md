# Backend for rutasnicaragua admin panel

Simple Express server with JWT authentication.

- `/api/login` – POST with password to obtain token.
- `/api/routes` – CRUD for routes.
- `/api/routes/:id/stops` – CRUD for stops.
- `/api/import` – import data from JSON file.

Set `ADMIN_PASSWORD_HASH` and `JWT_SECRET` in `.env`.
