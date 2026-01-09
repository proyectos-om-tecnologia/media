# Media Workspace

Breve guía para el frontend y backend contenidos en esta carpeta.

Estructura relevante:
- `frontend/` — aplicación React + Vite (código fuente). Ejecuta `npm run build` para generar `dist/`.
- `frontend/dist/` — build estático que sirve el backend.
- `backend/` — servidor Node.js + TypeScript que sirve el `dist` en `http://localhost:3100`.

Instalación y ejecución rápida:

1. Frontend (construir):

```bash
cd media/frontend
npm install
npm run build
```

2. Backend (desarrollo/producción):

```bash
cd media/backend
npm install
# desarrollo (hot-reload)
npm run dev
# producción
npm run build
npm start
```

Variables de entorno (`media/backend/.env.example`):
- `PORT` (por defecto `3100`)
- `ALLOWED_ORIGINS` — orígenes permitidos por CORS (coma-separados). Usa `*` para permitir todos.
- `ALLOWED_IMAGE_SOURCES` — hosts o URLs que quieras permitir específicamente en la CSP (coma-separados).

Notas sobre seguridad y recursos externos:
- El backend aplica Helmet con una CSP que permite recursos `https:` y `data:` para imágenes, fuentes y estilos. Si algún recurso externo (CDN, imágenes) sigue bloqueado, añade su host en `ALLOWED_IMAGE_SOURCES` o ajusta `ALLOWED_ORIGINS` según sea necesario.
- Al desplegar en producción revisa y endurece la CSP en `media/backend/src/server.ts` antes de usar `ALLOWED_ORIGINS='*'`.

Git:
- Hay `.gitignore` en la raíz y en `media/frontend` y `media/backend` para excluir `node_modules`, builds y archivos sensibles.

test!