from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os

from routes.movies_routes import movies_bp
from routes.platforms_routes import platforms_bp
from routes.genres_routes import genres_bp
from routes.series_routes import series_bp

load_dotenv()
app = Flask(__name__)
CORS(app)

app.register_blueprint(movies_bp, url_prefix="/api/movies")
app.register_blueprint(platforms_bp, url_prefix="/api/platforms")
app.register_blueprint(genres_bp, url_prefix="/api/genres")
app.register_blueprint(series_bp, url_prefix="/api/series")

if __name__ == "__main__":
    port = int(os.getenv("PORT", 4000))
    app.run(host="0.0.0.0", port=port, debug=True)
