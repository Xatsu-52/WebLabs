import os

from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker

# В docker-compose адрес базы передаётся через переменную окружения.
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql+psycopg2://links:links@localhost:5432/links",
)

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine, autoflush=False, expire_on_commit=False)


class Base(DeclarativeBase):
    pass


def create_tables():
    # Импорт нужен, чтобы SQLAlchemy увидел модель LinkModel.
    from app.infrastructure import models  # noqa: F401

    Base.metadata.create_all(bind=engine)
