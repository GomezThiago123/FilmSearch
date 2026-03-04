import sys, os
sys.path.append(os.path.abspath(os.path.dirname(__file__) + "/.."))
from app import app
import pytest


@pytest.fixture
def client():
    with app.test_client() as client:
        yield client


def test_invalid_movie_id_format(client):
    """Debe manejar ID de película con formato inválido (string)."""
    res = client.get("/api/movies/abc")
    assert res.status_code in [400, 404]


def test_invalid_platform_id_format(client):
    """Debe manejar ID de plataforma inválido."""
    res = client.get("/api/platforms/xyz/catalog")
    assert res.status_code in [400, 404]


def test_search_empty_query(client):
    """Debe manejar búsqueda con parámetro vacío."""
    res = client.get("/api/movies/search?q=")
    assert res.status_code in [200, 400]


def test_nonexistent_route(client):
    """Debe devolver 404 para rutas inexistentes."""
    res = client.get("/api/esto_no_existe")
    assert res.status_code == 404


def test_wrong_http_method(client):
    """Debe manejar método HTTP incorrecto."""
    res = client.post("/api/movies/")
    assert res.status_code in [405, 404]