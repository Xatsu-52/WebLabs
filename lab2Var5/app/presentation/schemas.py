from pydantic import BaseModel


class LinkIn(BaseModel):
    title: str
    url: str


class LinkOut(BaseModel):
    id: int
    title: str
    url: str
