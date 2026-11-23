import os

from fastapi import HTTPException, Security
from fastapi.security import APIKeyHeader

API_KEY = os.getenv("API_KEY", "student-key")

api_key_header = APIKeyHeader(name="X-API-Key", auto_error=False)


def check_api_key(key: str | None = Security(api_key_header)):
    if key != API_KEY:
        raise HTTPException(status_code=401, detail="Неверный API-ключ")
    return key
