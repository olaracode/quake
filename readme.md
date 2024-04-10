# React on Rails ⚛️🔺🐳

Basic setup for a React app with Rails backend using docker-compose.

## Quake

### Setup

1. Clone the repository

```bash
git clone
```

2. Start containers

```bash
docker compose up --build
```

3. Load fixtures

```bash
rake sismologia:obtener_datos
```

4. Open the app

```bash
open http://localhost:3000 # Backend
open http://localhost:5137 # Frontend
```
