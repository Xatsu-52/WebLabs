from typing import Optional

from app.application.interfaces import LinkRepository
from app.domain.entities import Link


class InMemoryLinkRepository(LinkRepository):
    def __init__(self):
        self.items: dict[int, Link] = {}
        self.next_id = 1

    def add(self, title: str, url: str) -> Link:
        link = Link(id=self.next_id, title=title, url=url)
        self.items[link.id] = link
        self.next_id += 1
        return link

    def get(self, link_id: int) -> Optional[Link]:
        return self.items.get(link_id)

    def list(self) -> list[Link]:
        return list(self.items.values())

    def update(self, link_id: int, title: str, url: str) -> Optional[Link]:
        link = self.items.get(link_id)
        if link is None:
            return None
        link.title = title
        link.url = url
        return link

    def delete(self, link_id: int) -> bool:
        return self.items.pop(link_id, None) is not None

    def count(self) -> int:
        return len(self.items)
