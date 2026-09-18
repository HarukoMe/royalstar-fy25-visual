from __future__ import annotations

import hashlib
import hmac
import json
import time
from pathlib import Path
from typing import Any

from fastapi import HTTPException, Request, Response
from itsdangerous import BadSignature, URLSafeTimedSerializer

SESSION_COOKIE = "loq_session"
SESSION_MAX_AGE = 86400 * 7


def _password_path(data_dir: Path) -> Path:
    return data_dir / "auth.json"


def load_auth_config(data_dir: Path) -> dict[str, Any]:
    path = _password_path(data_dir)
    if path.is_file():
        return json.loads(path.read_text(encoding="utf-8"))
    return {}


def save_password_hash(data_dir: Path, password: str) -> None:
    from passlib.hash import bcrypt

    data_dir.mkdir(parents=True, exist_ok=True)
    path = _password_path(data_dir)
    payload = {"password_hash": bcrypt.hash(password)}
    path.write_text(json.dumps(payload, indent=2), encoding="utf-8")


def verify_password(data_dir: Path, password: str) -> bool:
    cfg = load_auth_config(data_dir)
    if not cfg.get("password_hash"):
        return False
    from passlib.hash import bcrypt

    return bcrypt.verify(password, cfg["password_hash"])


def has_password(data_dir: Path) -> bool:
    return bool(load_auth_config(data_dir).get("password_hash"))


class SessionManager:
    def __init__(self, secret: str, data_dir: Path, require_auth: bool = True):
        self.serializer = URLSafeTimedSerializer(secret, salt="loq-cc-session")
        self.data_dir = data_dir
        self.require_auth = require_auth

    def auth_required(self) -> bool:
        if not self.require_auth:
            return False
        return has_password(self.data_dir)

    def create_session_token(self) -> str:
        return self.serializer.dumps({"sub": "operator", "v": 1})

    def read_session(self, token: str | None) -> bool:
        if not self.auth_required():
            return True
        if not token:
            return False
        try:
            self.serializer.loads(token, max_age=SESSION_MAX_AGE)
            return True
        except BadSignature:
            return False

    def set_cookie(self, response: Response, token: str) -> None:
        response.set_cookie(
            SESSION_COOKIE,
            token,
            httponly=True,
            samesite="lax",
            max_age=SESSION_MAX_AGE,
            secure=False,
        )

    def clear_cookie(self, response: Response) -> None:
        response.delete_cookie(SESSION_COOKIE)

    def require(self, request: Request) -> None:
        if not self.auth_required():
            return
        token = request.cookies.get(SESSION_COOKIE)
        if not self.read_session(token):
            raise HTTPException(status_code=401, detail="Authentication required")

    def csrf_token(self, session_token: str, secret: str) -> str:
        return hmac.new(secret.encode(), session_token.encode(), hashlib.sha256).hexdigest()[:32]
