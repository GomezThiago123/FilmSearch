import sys, os
sys.path.append(os.path.abspath(os.path.dirname(__file__) + "/.."))
from app import app
import pytest

@pytest.fixture
def client():
    with app.test_client() as client:
        yield client

def test_get_genres(client):#obtiene la lista completa de géneros desde TMDb.
    """Debe devolver los géneros disponibles en TMDb."""
    res = client.get("/api/genres/")
    assert res.status_code == 200
    data = res.get_json()
    assert "genres" in data
    assert isinstance(data["genres"], list)
    assert len(data["genres"]) > 0

#Prueba el endpoint de géneros de películas.