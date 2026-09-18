import importlib
import os

import pytest
from fastapi.testclient import TestClient


@pytest.fixture
def client(tmp_path, monkeypatch):
    monkeypatch.setenv("LOQ_DATA_DIR", str(tmp_path))
    monkeypatch.setenv("LOQ_REQUIRE_AUTH", "true")
    monkeypatch.setenv("LOQ_SESSION_SECRET", "test-secret-key-32chars-minimum!!")
    import app.config
    import app.main

    importlib.reload(app.config)
    importlib.reload(app.main)
    with TestClient(app.main.app) as c:
        c.post("/api/auth/setup", json={"password": "testpassword123"})
        yield c


def test_protected_without_auth(tmp_path, monkeypatch):
    monkeypatch.setenv("LOQ_DATA_DIR", str(tmp_path / "other"))
    monkeypatch.setenv("LOQ_REQUIRE_AUTH", "true")
    monkeypatch.setenv("LOQ_SESSION_SECRET", "test-secret-key-32chars-minimum!!")
    import app.config
    import app.main
    from app.auth.session import SessionManager, save_password_hash

    importlib.reload(app.config)
    importlib.reload(app.main)
    data = tmp_path / "other"
    data.mkdir(parents=True, exist_ok=True)
    save_password_hash(data, "testpassword123")
    app.main.settings = app.config.Settings(
        data_dir=data, require_auth=True, session_secret="test-secret-key-32chars-minimum!!"
    )
    app.main.sessions = SessionManager("test-secret-key-32chars-minimum!!", data, True)
    with TestClient(app.main.app) as c:
        r = c.get("/api/overview")
        assert r.status_code == 401


def test_login_and_overview(client):
    r = client.post("/api/auth/login", json={"password": "testpassword123"})
    assert r.status_code == 200
    r2 = client.get("/api/overview")
    assert r2.status_code == 200
    assert "machine" in r2.json()


def test_action_requires_confirmation(client):
    client.post("/api/auth/login", json={"password": "testpassword123"})
    r = client.post("/api/actions/execute", json={"action_id": "docker:container:stop", "confirmed": False})
    assert r.status_code == 400


def test_outputs_path_traversal(client):
    client.post("/api/auth/login", json={"password": "testpassword123"})
    r = client.get("/api/outputs", params={"path": "../../etc"})
    assert r.status_code == 400


def test_docker_logs_invalid_id(client):
    client.post("/api/auth/login", json={"password": "testpassword123"})
    r = client.get("/api/docker/bad..id/logs")
    assert r.status_code == 400
