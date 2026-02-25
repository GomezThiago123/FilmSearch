from flask import Blueprint
from controllers.genres_controller import list_genres

genres_bp = Blueprint("genres", __name__)
genres_bp.route("/", methods=["GET"])(list_genres)