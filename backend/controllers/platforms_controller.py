from flask import jsonify
from services.tmdb_service import get_all_providers, get_platform_catalog


def list_platforms():
    providers = get_all_providers()
    return jsonify(providers)


def platform_catalog(id):
    movies = get_platform_catalog(id)
    return jsonify(movies)
