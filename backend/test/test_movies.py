import sys, os
sys.path.append(os.path.abspath(os.path.dirname(__file__) + "/.."))
from app import app
import pytest


@pytest.fixture
def client():
    with app.test_client() as client:
        yield client


def test_get_movies(client):
    """Debe devolver listado de películas con paginación."""
    res = client.get("/api/movies/")
    assert res.status_code == 200

    data = res.get_json()
    assert "results" in data
    assert isinstance(data["results"], list)


def test_get_movie_detail(client):
    """Debe devolver detalle de una película específica (Fight Club)."""
    res = client.get("/api/movies/550")
    assert res.status_code == 200

    data = res.get_json()
    assert "title" in data
    assert isinstance(data["title"], str)


def test_search_movie(client):
    """Debe permitir búsqueda por texto."""
    res = client.get("/api/movies/search?q=batman")
    assert res.status_code == 200

    data = res.get_json()
    assert "results" in data
    assert isinstance(data["results"], list)


def test_get_popular_movies(client):
    """Debe devolver películas populares."""
    res = client.get("/api/movies/popular")
    assert res.status_code == 200

    data = res.get_json()
    assert "results" in data


def test_get_movie_platforms(client):
    """Debe devolver plataformas donde está disponible una película."""
    res = client.get("/api/movies/550/platforms")
    assert res.status_code == 200

    data = res.get_json()
    assert isinstance(data, list)
    assert len(data) > 0
    assert "provider_id" in data[0]
    assert "provider_name" in data[0]


def test_movie_not_found(client):
    """Debe manejar ID inexistente."""
    res = client.get("/api/movies/99999999")
    assert res.status_code in [200, 404]


def test_movies_pagination(client):
    """Debe permitir paginación."""
    res = client.get("/api/movies/?page=2")
    assert res.status_code == 200

    data = res.get_json()
    assert "results" in data


def test_search_without_query(client):
    """Debe manejar búsqueda sin parámetro q."""
    res = client.get("/api/movies/search")
    assert res.status_code in [200, 400]


def test_movies_results_structure(client):
    """Cada película debe tener id y title."""
    res = client.get("/api/movies/")
    data = res.get_json()

    movie = data["results"][0]
    assert "id" in movie
    assert "title" in movie

def test_movie_id_is_integer(client):
    """El id de cada película debe ser entero."""
    res = client.get("/api/movies/")
    assert res.status_code == 200

    data = res.get_json()
    movie = data["results"][0]

    assert isinstance(movie["id"], int)

def test_popular_movies_not_empty(client):
    """La lista de populares no debe estar vacía."""
    res = client.get("/api/movies/popular")
    assert res.status_code == 200

    data = res.get_json()
    assert len(data["results"]) > 0

def test_movie_platforms_structure_complete(client):
    """Cada plataforma debe tener id y nombre válido."""
    res = client.get("/api/movies/550/platforms")
    assert res.status_code == 200

    data = res.get_json()

    if len(data) > 0:
        platform = data[0]
        assert isinstance(platform["provider_id"], int)
        assert isinstance(platform["provider_name"], str)