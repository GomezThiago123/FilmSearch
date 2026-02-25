from flask import jsonify
import requests, os

API_KEY = os.getenv("TMDB_API_KEY")
BASE_URL = "https://api.themoviedb.org/3"

# 🔹 Obtener lista de géneros
def list_genres():
    res = requests.get(f"{BASE_URL}/genre/movie/list", params={"api_key": API_KEY, "language": "es-ES"})
    return jsonify(res.json())