from flask import jsonify
from services.tmdb_service import get_all_providers, get_platform_catalog

# 🔹 Listar todas las plataformas
def list_platforms():
    providers = get_all_providers()
    return jsonify(providers)

# 🔹 Listar catálogo por plataforma (ejemplo: Netflix)
def platform_catalog(id):
    movies = get_platform_catalog(id)
    return jsonify(movies)