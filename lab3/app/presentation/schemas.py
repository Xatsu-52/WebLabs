from pydantic import BaseModel, Field


class LinkIn(BaseModel):
    title: str = Field(max_length=200)
    url: str = Field(max_length=500)


class LinkOut(BaseModel):
    id: int
    title: str
    url: str
