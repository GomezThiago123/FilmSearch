from flask import jsonify, request
import requests, os
from services.tmdb_service import get_watch_providers

API_KEY = os.getenv("TMDB_API_KEY")
BASE_URL = "https://api.themoviedb.org/3"

# 🔹 Listado de películas (paginado + filtro opcional)
def list_movies():
    page = request.args.get("page", 1)
    genre = request.args.get("genre")
    params = {"api_key": API_KEY, "language": "es-ES", "page": page}
    if genre:
        params["with_genres"] = genre

    res = requests.get(f"{BASE_URL}/discover/movie", params=params)
    return jsonify(res.json())

# 🔹 Detalle de una película
def get_movie_by_id(id):
    res = requests.get(f"{BASE_URL}/movie/{id}", params={"api_key": API_KEY, "language": "es-ES"})
    return jsonify(res.json())

# 🔹 Búsqueda por texto
def search_movie():
    q = request.args.get("q")
    res = requests.get(f"{BASE_URL}/search/movie", params={"api_key": API_KEY, "language": "es-ES", "query": q})
    return jsonify(res.json())

# 🔹 Populares / tendencias
def popular_movies():
    res = requests.get(f"{BASE_URL}/movie/popular", params={"api_key": API_KEY, "language": "es-ES"})
    return jsonify(res.json())

# 🔹 Plataformas donde está disponible
def movie_platforms(id):
    providers = get_watch_providers(id)
    return jsonify(providers)