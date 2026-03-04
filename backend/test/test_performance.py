import sys, os
import time
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
def test_response_time(client, endpoint):
    """Verifica que la respuesta sea rápida (< 2 segundos)."""
    start = time.time()
    res = client.get(endpoint)
    end = time.time()
    assert res.status_code == 200
    assert end - start < 2
#Verifica que los endpoints respondan rápido