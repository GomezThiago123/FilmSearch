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
    "/api/genres/",
    "/api/platforms/"
])
def test_post_not_allowed(client, endpoint):
    """No debe permitir método POST en endpoints GET."""
    res = client.post(endpoint)
    assert res.status_code in [404, 405]


@pytest.mark.parametrize("endpoint", [
    "/api/movies/",
    "/api/genres/",
    "/api/platforms/"
])
def test_put_not_allowed(client, endpoint):
    """No debe permitir método PUT."""
    res = client.put(endpoint)
    assert res.status_code in [404, 405]


def test_delete_not_allowed(client):
    """No debe permitir método DELETE."""
    res = client.delete("/api/movies/550")
    assert res.status_code in [404, 405]