def test_get_series(client):
    response = client.get("/api/series/")
    assert response.status_code == 200


def test_get_popular_series(client):
    response = client.get("/api/series/popular")
    assert response.status_code == 200


def test_search_series_without_query(client):
    """La búsqueda sin query no debe romper la API."""
    response = client.get("/api/series/search")
    assert response.status_code in [200, 400]


def test_series_results_structure(client):
    response = client.get("/api/series/")
    data = response.get_json()

    assert "results" in data
    assert isinstance(data["results"], list)