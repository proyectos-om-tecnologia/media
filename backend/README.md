# Media Backend

Servidor Express en TypeScript que sirve `frontend/dist` en el puerto 3100.

Uso:

1. Instalar dependencias:

```bash
cd media/backend
npm install
```

2. Desarrollo (live-reload):

```bash
npm run dev
```

3. Producción:

```bash
npm run build
npm start
```

Configuración (opcional): crear `.env` basado en `.env.example` con:

- `PORT` (por defecto 3100)
- `ALLOWED_ORIGINS` — orígenes permitidos por CORS (coma-separados). Usa `*` para permitir todos.
- `ALLOWED_IMAGE_SOURCES` — hosts o URLs permitidas para `img-src` en la CSP (coma-separados), por ejemplo `https://images.example.com`.

El servidor sirve `index.html` desde `media/frontend/dist` y añade cabeceras de seguridad mediante Helmet.
