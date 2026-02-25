from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os

# Importar rutas
from routes.movies_routes import movies_bp
from routes.platforms_routes import platforms_bp
from routes.genres_routes import genres_bp

load_dotenv()
app = Flask(__name__)
CORS(app)

# Registrar blueprints
app.register_blueprint(movies_bp, url_prefix="/api/movies")
app.register_blueprint(platforms_bp, url_prefix="/api/platforms")
app.register_blueprint(genres_bp, url_prefix="/api/genres")

if __name__ == "__main__":
    port = int(os.getenv("PORT", 4000))
    app.run(host="0.0.0.0", port=port, debug=True)