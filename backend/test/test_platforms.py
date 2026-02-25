import sys, os
sys.path.append(os.path.abspath(os.path.dirname(__file__) + "/.."))
from app import app
import pytest

@pytest.fixture
def client():
    with app.test_client() as client:
        yield client

def test_get_platforms(client):#obtiene la lista de plataformas
    """Debe devolver una lista de plataformas."""
    res = client.get("/api/platforms/")
    assert res.status_code == 200
    data = res.get_json()
    assert isinstance(data, list)
    assert len(data) > 0
    assert "name" in data[0]

def test_get_platform_catalog(client):#obtiene el catálogo de películas disponibles en una plataforma específica
    """Debe devolver películas para una plataforma específica."""
    res = client.get("/api/platforms/8/catalog")  # Netflix
    assert res.status_code == 200
    data = res.get_json()
    assert "platform_id" in data
    assert "movies" in data

#Prueba las rutas relacionadas con plataformas de streaming.