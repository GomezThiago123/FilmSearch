from flask import jsonify, request
import requests
import os

API_KEY = os.getenv("TMDB_API_KEY")
BASE_URL = "https://api.themoviedb.org/3"


# 🔎 Buscar series
def search_series():
    query = request.args.get("query")

    url = f"{BASE_URL}/search/tv"
    params = {
        "api_key": API_KEY,
        "query": query,
        "language": "es-ES"
    }

    response = requests.get(url, params=params)
    return jsonify(response.json())


# 🎬 Obtener serie por ID (DETALLE)
def get_series_by_id(id):

    # Información principal
    series_url = f"{BASE_URL}/tv/{id}"
    series_params = {
        "api_key": API_KEY,
        "language": "es-ES"
    }

    series_response = requests.get(series_url, params=series_params)
    series_data = series_response.json()

    # Plataformas
    providers_url = f"{BASE_URL}/tv/{id}/watch/providers"
    providers_params = {
        "api_key": API_KEY
    }

    providers_response = requests.get(providers_url, params=providers_params)
    providers_data = providers_response.json()

    # Cambiá "ES" por tu país si querés
    country_providers = providers_data.get("results", {}).get("ES", {})

    return jsonify({
        "series": series_data,
        "providers": country_providers
    })


# 📺 Series populares
def popular_series():
    url = f"{BASE_URL}/tv/popular"
    params = {
        "api_key": API_KEY,
        "language": "es-ES"
    }

    response = requests.get(url, params=params)
    return jsonify(response.json())


# 📃 Listar (si lo estás usando)
def list_series():
    url = f"{BASE_URL}/tv/top_rated"
    params = {
        "api_key": API_KEY,
        "language": "es-ES"
    }

    response = requests.get(url, params=params)
    return jsonify(response.json())