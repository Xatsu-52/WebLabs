from app.application.services import LinkService
from app.infrastructure.repository import SqlAlchemyLinkRepository

service = LinkService(SqlAlchemyLinkRepository(), limit=50)


def get_service() -> LinkService:
    return service
