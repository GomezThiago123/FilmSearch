import sys, os
sys.path.append(os.path.abspath(os.path.dirname(__file__) + "/.."))
from app import app
import pytest


@pytest.fixture
def client():
    with app.test_client() as client:
        yield client


def test_get_genres(client):
    """Debe devolver los géneros disponibles en TMDb."""
    res = client.get("/api/genres/")
    assert res.status_code == 200

    data = res.get_json()
    assert "genres" in data
    assert isinstance(data["genres"], list)
    assert len(data["genres"]) > 0


def test_genres_structure(client):
    """Cada género debe tener id y name."""
    res = client.get("/api/genres/")
    data = res.get_json()

    genre = data["genres"][0]
    assert "id" in genre
    assert "name" in genre


def test_genres_not_empty(client):
    """La lista de géneros no debe estar vacía."""
    res = client.get("/api/genres/")
    data = res.get_json()

    assert len(data["genres"]) > 0


def test_genre_id_is_integer(client):
    """El id del género debe ser entero."""
    res = client.get("/api/genres/")
    data = res.get_json()

    genre = data["genres"][0]
    assert isinstance(genre["id"], int)