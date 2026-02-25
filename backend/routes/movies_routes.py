from flask import Blueprint
from controllers.movies_controller import (
    list_movies, get_movie_by_id, search_movie, popular_movies, movie_platforms
)

movies_bp = Blueprint("movies", __name__)

movies_bp.route("/", methods=["GET"])(list_movies)
movies_bp.route("/search", methods=["GET"])(search_movie)
movies_bp.route("/popular", methods=["GET"])(popular_movies)
movies_bp.route("/<int:id>", methods=["GET"])(get_movie_by_id)
movies_bp.route("/<int:id>/platforms", methods=["GET"])(movie_platforms)