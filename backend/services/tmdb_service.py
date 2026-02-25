import requests, os
from dotenv import load_dotenv
load_dotenv()

API_KEY = os.getenv("TMDB_API_KEY")
BASE_URL = "https://api.themoviedb.org/3"

def get_watch_providers(movie_id):
    res = requests.get(f"{BASE_URL}/movie/{movie_id}/watch/providers", params={"api_key": API_KEY})
    return res.json().get("results", {}).get("AR", {}).get("flatrate", [])

def get_all_providers():
    # No hay endpoint directo en TMDB para todos los proveedores, 
    # pero podés devolver los más comunes manualmente o mockearlos
    return [
        {"id": 8, "name": "Netflix"},
        {"id": 337, "name": "Disney Plus"},
        {"id": 119, "name": "Amazon Prime Video"},
        {"id": 384, "name": "HBO Max"}
    ]

def get_platform_catalog(platform_id):
    # Simulación (para cuando conectes con la API real)
    return {"platform_id": platform_id, "movies": ["Película A", "Película B"]}