import sys, os
sys.path.append(os.path.abspath(os.path.dirname(__file__) + "/.."))
from app import app
import pytest


@pytest.fixture
def client():
    with app.test_client() as client:
        yield client


def test_get_platforms(client):
    """Debe devolver lista de plataformas."""
    res = client.get("/api/platforms/")
    assert res.status_code == 200

    data = res.get_json()
    assert isinstance(data, list)
    assert len(data) > 0
    assert "name" in data[0]


def test_get_platform_catalog(client):
    """Debe devolver catálogo de una plataforma específica."""
    res = client.get("/api/platforms/8/catalog")
    assert res.status_code == 200

    data = res.get_json()
    assert "platform_id" in data
    assert "movies" in data
    assert isinstance(data["movies"], list)


def test_platform_not_found(client):
    """Debe manejar plataforma inexistente."""
    res = client.get("/api/platforms/99999/catalog")
    assert res.status_code in [200, 404]


def test_platform_catalog_structure(client):
    """El catálogo debe devolver una lista de nombres de películas."""
    res = client.get("/api/platforms/8/catalog")
    assert res.status_code == 200

    data = res.get_json()

    assert "movies" in data
    assert isinstance(data["movies"], list)

    if len(data["movies"]) > 0:
        assert isinstance(data["movies"][0], str)