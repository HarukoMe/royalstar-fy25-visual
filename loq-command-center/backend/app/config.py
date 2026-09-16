from __future__ import annotations

import os
import platform
from pathlib import Path
from typing import Any

import yaml
from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


def _default_data_dir() -> Path:
    if platform.system() == "Windows":
        base = Path(os.environ.get("LOCALAPPDATA", Path.home() / "AppData" / "Local"))
        return base / "LOQCommandCenter"
    return Path.home() / ".loq-command-center"


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_prefix="LOQ_", extra="ignore")

    host: str = "127.0.0.1"
    port: int = 8742
    data_dir: Path = Field(default_factory=_default_data_dir)
    config_file: Path | None = None
    session_secret: str = ""
    require_auth: bool = True
    bind_tailscale_only: bool = False
    telemetry_interval_sec: float = 1.5
    cors_origins: list[str] = Field(default_factory=lambda: ["http://127.0.0.1:8743", "http://localhost:8743"])

    def resolved_config_path(self) -> Path:
        if self.config_file:
            return self.config_file
        return self.data_dir / "config.yaml"

    def ensure_dirs(self) -> None:
        self.data_dir.mkdir(parents=True, exist_ok=True)
        (self.data_dir / "logs").mkdir(exist_ok=True)
        (self.data_dir / "events").mkdir(exist_ok=True)


def load_merged_config(settings: Settings) -> dict[str, Any]:
    settings.ensure_dirs()
    defaults_path = Path(__file__).resolve().parent.parent.parent / "config" / "default.yaml"
    merged: dict[str, Any] = {}
    if defaults_path.is_file():
        with defaults_path.open(encoding="utf-8") as f:
            merged = yaml.safe_load(f) or {}
    user_path = settings.resolved_config_path()
    if user_path.is_file():
        with user_path.open(encoding="utf-8") as f:
            user = yaml.safe_load(f) or {}
        merged = _deep_merge(merged, user)
    return merged


def _deep_merge(base: dict[str, Any], override: dict[str, Any]) -> dict[str, Any]:
    out = dict(base)
    for k, v in override.items():
        if k in out and isinstance(out[k], dict) and isinstance(v, dict):
            out[k] = _deep_merge(out[k], v)
        else:
            out[k] = v
    return out


def get_settings() -> Settings:
    s = Settings()
    if not s.session_secret:
        secret_path = s.data_dir / ".session_secret"
        s.ensure_dirs()
        if secret_path.is_file():
            s.session_secret = secret_path.read_text(encoding="utf-8").strip()
        else:
            import secrets

            s.session_secret = secrets.token_urlsafe(48)
            secret_path.write_text(s.session_secret, encoding="utf-8")
    return s
