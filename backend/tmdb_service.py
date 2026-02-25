import os
import requests
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("TMDB_API_KEY")
BASE_URL = "https://api.themoviedb.org/3"

# Obtener plataformas de streaming
def get_watch_providers(movie_id, type="movie"):
    try:
        url = f"{BASE_URL}/{type}/{movie_id}/watch/providers"
        res = requests.get(url, params={"api_key": API_KEY})
        data = res.json()
        return data.get("results", {}).get("AR", {}).get("flatrate", [])
    except Exception as e:
        print("Error al obtener providers:", e)
        return []