from flask import Blueprint
from controllers.series_controller import (
    list_series,
    get_series_by_id,
    search_series,
    popular_series
)

series_bp = Blueprint("series", __name__)

series_bp.route("/", methods=["GET"])(list_series)
series_bp.route("/search", methods=["GET"])(search_series)
series_bp.route("/popular", methods=["GET"])(popular_series)
series_bp.route("/<int:id>", methods=["GET"])(get_series_by_id)