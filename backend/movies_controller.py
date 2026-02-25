from flask import Blueprint, jsonify, request
import requests
import os
from tmdb_service import get_watch_providers

movies_blueprint = Blueprint("movies", __name__)
API_KEY = os.getenv("TMDB_API_KEY")
BASE_URL = "https://api.themoviedb.org/3"

# Buscar películas
@movies_blueprint.route("/search")
def search_movie():
    q = request.args.get("q")
    if not q:
        return jsonify({"error": "Falta el parámetro 'q'"}), 400

    try:
        url = f"{BASE_URL}/search/movie"
        res = requests.get(url, params={"api_key": API_KEY, "query": q, "language": "es-ES"})
        return jsonify(res.json())
    except Exception as e:
        print("Error al buscar:", e)
        return jsonify({"error": "Error al buscar película"}), 500


# Obtener película por ID
@movies_blueprint.route("/<int:id>")
def get_movie_by_id(id):
    try:
        url = f"{BASE_URL}/movie/{id}"
        res = requests.get(url, params={"api_key": API_KEY, "language": "es-ES"})
        return jsonify(res.json())
    except Exception as e:
        print("Error al obtener película:", e)
        return jsonify({"error": "Error al obtener película"}), 500


# Obtener plataformas (Netflix, Disney+, etc.)
@movies_blueprint.route("/<int:id>/providers")
def get_movie_providers(id):
    try:
        providers = get_watch_providers(id)
        return jsonify(providers)
    except Exception as e:
        print("Error al obtener plataformas:", e)
        return jsonify({"error": "Error al obtener plataformas"}), 500