# mywebsite-frontend

Vue.js SPA frontend for the portfolio/blog website.

## Prerequisites

- Node.js >= 20.19.0 or >= 22.12.0
- Backend running at `http://localhost:8081` (for dev proxy)

## Development

```bash
npm install
npm run dev
```

Dev server runs at `http://localhost:5173` with API requests proxied to the backend.

## Build

```bash
npm run build
```

Outputs to `../mywebsite/dist/`, served by the backend.

## Docker

```bash
docker compose up -d --build
```

Builds the frontend and outputs to `./dist/` volume.
