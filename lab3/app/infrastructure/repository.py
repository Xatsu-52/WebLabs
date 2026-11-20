from typing import Optional

from sqlalchemy import func, select

from app.application.interfaces import LinkRepository
from app.domain.entities import Link
from app.infrastructure.database import SessionLocal
from app.infrastructure.models import LinkModel


def to_link(model: LinkModel) -> Link:
    return Link(id=model.id, title=model.title, url=model.url)


class SqlAlchemyLinkRepository(LinkRepository):
    def add(self, title: str, url: str) -> Link:
        with SessionLocal() as session:
            model = LinkModel(title=title, url=url)
            session.add(model)
            session.commit()
            session.refresh(model)
            return to_link(model)

    def get(self, link_id: int) -> Optional[Link]:
        with SessionLocal() as session:
            model = session.get(LinkModel, link_id)
            return to_link(model) if model is not None else None

    def list(self) -> list[Link]:
        with SessionLocal() as session:
            models = session.scalars(select(LinkModel).order_by(LinkModel.id)).all()
            return [to_link(model) for model in models]

    def update(self, link_id: int, title: str, url: str) -> Optional[Link]:
        with SessionLocal() as session:
            model = session.get(LinkModel, link_id)
            if model is None:
                return None
            model.title = title
            model.url = url
            session.commit()
            session.refresh(model)
            return to_link(model)

    def delete(self, link_id: int) -> bool:
        with SessionLocal() as session:
            model = session.get(LinkModel, link_id)
            if model is None:
                return False
            session.delete(model)
            session.commit()
            return True

    def count(self) -> int:
        with SessionLocal() as session:
            return session.scalar(select(func.count()).select_from(LinkModel)) or 0
