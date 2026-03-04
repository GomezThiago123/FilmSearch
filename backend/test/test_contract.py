import sys, os
sys.path.append(os.path.abspath(os.path.dirname(__file__) + "/.."))
from app import app
import pytest

@pytest.fixture
def client():
    with app.test_client() as client:
        yield client


def test_movies_contract(client):
    """Valida el contrato de cada película."""
    res = client.get("/api/movies/")
    assert res.status_code == 200
    data = res.get_json()
    assert "results" in data
    for movie in data["results"]:
        assert "id" in movie and isinstance(movie["id"], int)
        assert "title" in movie and isinstance(movie["title"], str)


def test_genres_contract(client):
    """Valida el contrato de cada género."""
    res = client.get("/api/genres/")
    data = res.get_json()
    for genre in data["genres"]:
        assert "id" in genre and isinstance(genre["id"], int)
        assert "name" in genre and isinstance(genre["name"], str)


def test_platforms_contract(client):
    """Valida el contrato de cada plataforma."""
    res = client.get("/api/platforms/")
    assert res.status_code == 200

    data = res.get_json()

    for platform in data:
        assert "id" in platform and isinstance(platform["id"], int)
        assert "name" in platform and isinstance(platform["name"], str)
#Verifica que el JSON tenga la estructura correcta