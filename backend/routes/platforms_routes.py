from flask import Blueprint
from controllers.platforms_controller import list_platforms, platform_catalog

platforms_bp = Blueprint("platforms", __name__)
platforms_bp.route("/", methods=["GET"])(list_platforms)
platforms_bp.route("/<int:id>/catalog", methods=["GET"])(platform_catalog)