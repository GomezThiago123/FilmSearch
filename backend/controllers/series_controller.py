from flask import jsonify, request
import requests
import os

API_KEY = os.getenv("TMDB_API_KEY")
BASE_URL = "https://api.themoviedb.org/3"


def search_series():
    query = request.args.get("query", "").strip()
    if not query:
        return jsonify({"results": []}), 200
    res = requests.get(
        f"{BASE_URL}/search/tv",
        params={"api_key": API_KEY, "query": query, "language": "es-ES"},
    )
    return jsonify(res.json())


def get_series_by_id(id):
    series_res = requests.get(
        f"{BASE_URL}/tv/{id}",
        params={"api_key": API_KEY, "language": "es-ES"},
    )
    providers_res = requests.get(
        f"{BASE_URL}/tv/{id}/watch/providers",
        params={"api_key": API_KEY},
    )
    country_providers = providers_res.json().get("results", {}).get("AR", {})
    return jsonify({"series": series_res.json(), "providers": country_providers})


def popular_series():
    res = requests.get(
        f"{BASE_URL}/tv/popular",
        params={"api_key": API_KEY, "language": "es-ES"},
    )
    return jsonify(res.json())


def list_series():
    res = requests.get(
        f"{BASE_URL}/tv/top_rated",
        params={"api_key": API_KEY, "language": "es-ES"},
    )
    return jsonify(res.json())
