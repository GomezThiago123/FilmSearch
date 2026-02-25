import sys, os
sys.path.append(os.path.abspath(os.path.dirname(__file__) + "/.."))
from app import app
import pytest

@pytest.fixture
def client():
    with app.test_client() as client:
        yield client

def test_get_movies(client):#verifica que la API devuelva correctamente el listado de películas con paginación y filtros.
    res = client.get("/api/movies/")
    assert res.status_code == 200
    data = res.get_json()
    assert "results" in data

def test_get_movie_detail(client):#consulta el detalle de una película específica (Fight Club / El club de la lucha).
    res = client.get("/api/movies/550")
    assert res.status_code == 200
    data = res.get_json()
    assert "title" in data

def test_search_movie(client):#prueba la búsqueda por texto.
    res = client.get("/api/movies/search?q=batman")
    assert res.status_code == 200

#Prueba todo lo relacionado con las películas.