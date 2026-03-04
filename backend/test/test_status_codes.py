import sys, os
sys.path.append(os.path.abspath(os.path.dirname(__file__) + "/.."))
from app import app
import pytest


@pytest.fixture
def client():
    with app.test_client() as client:
        yield client


def test_movies_status_code(client):
    res = client.get("/api/movies/")
    assert res.status_code == 200

    res_detail = client.get("/api/movies/550")
    assert res_detail.status_code == 200

    res_not_found = client.get("/api/movies/999999")
    assert res_not_found.status_code in [200, 404]


def test_genres_status_code(client):
    res = client.get("/api/genres/")
    assert res.status_code == 200


def test_platforms_status_code(client):
    res = client.get("/api/platforms/")
    assert res.status_code == 200

    res_not_found = client.get("/api/platforms/9999/catalog")
    assert res_not_found.status_code in [200, 404]
#Verifica que la API devuelva los códigos HTTP correctos