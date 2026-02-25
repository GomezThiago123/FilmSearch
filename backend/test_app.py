import pytest
from app import app

@pytest.fixture
def client():
    with app.test_client() as client:
        yield client

def test_search_movies(client):
    res = client.get("/api/movies/search?q=batman")
    assert res.status_code == 200
    data = res.get_json()
    assert "results" in data
    assert len(data["results"]) > 0

def test_get_movie_by_id(client):
    res = client.get("/api/movies/550")
    assert res.status_code == 200
    data = res.get_json()
    assert data["title"].lower() == "el club de la lucha"

def test_get_movie_providers(client):
    res = client.get("/api/movies/550/providers")
    assert res.status_code == 200
    data = res.get_json()
    assert isinstance(data, list)