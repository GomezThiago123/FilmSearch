from flask import Flask
from movies_controller import movies_blueprint
from dotenv import load_dotenv
from flask_cors import CORS
import os

load_dotenv()
app = Flask(__name__)
CORS(app)

# todas las rutas de películas
app.register_blueprint(movies_blueprint, url_prefix="/api/movies")

if __name__ == "__main__":
    port = int(os.getenv("PORT", 4000))
    app.run(host="0.0.0.0", port=port, debug=True)