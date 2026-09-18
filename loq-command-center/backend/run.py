import uvicorn

from app.config import get_settings

if __name__ == "__main__":
    s = get_settings()
    s.ensure_dirs()
    uvicorn.run(
        "app.main:app",
        host=s.host,
        port=s.port,
        reload=False,
        log_level="info",
    )
