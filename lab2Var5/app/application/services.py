from app.application.interfaces import LinkRepository
from app.domain.entities import Link
from app.domain.exceptions import LinkNotFoundError, StorageLimitError


class LinkService:
    def __init__(self, repository: LinkRepository, limit: int = 50):
        self.repository = repository
        self.limit = limit

    def create(self, title: str, url: str) -> Link:
        if self.repository.count() >= self.limit:
            raise StorageLimitError("Достигнут лимит в 50 записей")
        return self.repository.add(title, url)

    def get(self, link_id: int) -> Link:
        link = self.repository.get(link_id)
        if link is None:
            raise LinkNotFoundError("Ссылка не найдена")
        return link

    def list(self) -> list[Link]:
        return self.repository.list()

    def update(self, link_id: int, title: str, url: str) -> Link:
        link = self.repository.update(link_id, title, url)
        if link is None:
            raise LinkNotFoundError("Ссылка не найдена")
        return link

    def delete(self, link_id: int) -> None:
        if not self.repository.delete(link_id):
            raise LinkNotFoundError("Ссылка не найдена")
