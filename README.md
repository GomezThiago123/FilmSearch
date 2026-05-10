# FilmSearch

Buscador de películas y series que te muestra en qué plataformas de streaming están disponibles. Sin registro, sin cuentas — solo escribís el título y ves dónde verlo.

---

## Stack

| Capa | Tecnología |
|---|---|
| Frontend | React 19 + Vite + React Router |
| Backend | Python · Flask · Blueprints |
| API de datos | [TMDB (The Movie Database)](https://www.themoviedb.org/) |
| HTTP client | Axios (frontend) · Requests (backend) |

---

## Funcionalidades

- Búsqueda de películas y series en simultáneo
- Página de inicio con contenido popular por defecto
- Detalle de cada título: póster, sinopsis, año, calificación
- Plataformas de streaming disponibles en Argentina (Netflix, Disney+, Prime Video, HBO Max, etc.)
- Navbar con navegación y botón de volver

---

## Estructura del proyecto

```
FilmSearch/
├── backend/
│   ├── app.py                  # Entry point Flask
│   ├── .env                    # Variables de entorno (API key, puerto)
│   ├── controllers/            # Lógica de cada recurso
│   │   ├── movies_controller.py
│   │   ├── series_controller.py
│   │   ├── genres_controller.py
│   │   └── platforms_controller.py
│   ├── routes/                 # Blueprints con las rutas
│   ├── services/
│   │   └── tmdb_service.py     # Cliente TMDB
│   └── test/                   # Tests con pytest
└── frontend/
    ├── src/
    │   ├── pages/              # Home, MovieDetail, SeriesDetail, Series
    │   ├── components/         # MovieCard, Navbar
    │   └── services/           # moviesService.js, seriesService.jsx
    └── .env                    # VITE_API_URL
```

---

## Instalación y ejecución

### Requisitos
- Python 3.10+
- Node.js 18+
- API key de TMDB ([obtener gratis aquí](https://www.themoviedb.org/settings/api))

### Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install flask flask-cors requests python-dotenv
python3 app.py
```

Crea un archivo `backend/.env`:
```
TMDB_API_KEY=tu_api_key_aqui
PORT=4000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Crea un archivo `frontend/.env`:
```
VITE_API_URL=http://localhost:4000/api
```

La app queda disponible en **http://localhost:5173**

---

## Tests

```bash
cd backend
source venv/bin/activate
pip install pytest
pytest -v
```

---

## API endpoints

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/movies/popular` | Películas populares |
| GET | `/api/movies/search?q=...` | Buscar películas |
| GET | `/api/movies/:id` | Detalle de película |
| GET | `/api/movies/:id/platforms` | Plataformas de la película |
| GET | `/api/series/popular` | Series populares |
| GET | `/api/series/search?query=...` | Buscar series |
| GET | `/api/series/:id` | Detalle de serie + plataformas |
| GET | `/api/genres` | Lista de géneros |
| GET | `/api/platforms` | Lista de plataformas |
