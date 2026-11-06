from pathlib import Path

from fastapi import FastAPI
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles

from app.domain.exceptions import LinkNotFoundError, StorageLimitError
from app.presentation.api import router

STATIC_DIR = Path(__file__).parent / "static"

app = FastAPI(title="Links API")
app.include_router(router)


@app.exception_handler(LinkNotFoundError)
def not_found_handler(request, exc):
    return JSONResponse(status_code=404, content={"detail": str(exc)})


@app.exception_handler(StorageLimitError)
def limit_handler(request, exc):
    return JSONResponse(status_code=409, content={"detail": str(exc)})


@app.get("/", include_in_schema=False)
def page_view():
    return FileResponse(STATIC_DIR / "index.html")


@app.get("/manage", include_in_schema=False)
def page_manage():
    return FileResponse(STATIC_DIR / "manage.html")


@app.get("/contacts", include_in_schema=False)
def page_contacts():
    return FileResponse(STATIC_DIR / "contacts.html")


app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")
