from abc import ABC, abstractmethod
from typing import Optional

from app.domain.entities import Link


class LinkRepository(ABC):
    @abstractmethod
    def add(self, title: str, url: str) -> Link: ...

    @abstractmethod
    def get(self, link_id: int) -> Optional[Link]: ...

    @abstractmethod
    def list(self) -> list[Link]: ...

    @abstractmethod
    def update(self, link_id: int, title: str, url: str) -> Optional[Link]: ...

    @abstractmethod
    def delete(self, link_id: int) -> bool: ...

    @abstractmethod
    def count(self) -> int: ...
