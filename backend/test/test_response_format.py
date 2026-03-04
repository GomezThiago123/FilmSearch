import sys, os
sys.path.append(os.path.abspath(os.path.dirname(__file__) + "/.."))
from app import app
import pytest


@pytest.fixture
def client():
    with app.test_client() as client:
        yield client


@pytest.mark.parametrize("endpoint", [
    "/api/movies/",
    "/api/movies/550",
    "/api/movies/popular",
    "/api/genres/",
    "/api/platforms/"
])
def test_response_content_type_json(client, endpoint):
    """Todos los endpoints deben devolver application/json."""
    res = client.get(endpoint)
    assert res.status_code == 200
    assert "application/json" in res.content_type


def test_response_is_valid_json(client):
    """La respuesta debe poder convertirse correctamente a JSON."""
    res = client.get("/api/movies/")
    data = res.get_json()
    assert isinstance(data, dict)