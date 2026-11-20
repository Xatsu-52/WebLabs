from app.application.services import LinkService
from app.infrastructure.memory_repository import InMemoryLinkRepository

service = LinkService(InMemoryLinkRepository(), limit=50)


def get_service() -> LinkService:
    return service
