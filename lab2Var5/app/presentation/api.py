from fastapi import APIRouter, Depends, Response

from app.application.services import LinkService
from app.presentation.dependencies import get_service
from app.presentation.schemas import LinkIn, LinkOut

router = APIRouter(prefix="/api/links", tags=["Links"])


@router.get("", response_model=list[LinkOut], summary="Получить все ссылки")
def get_links(service: LinkService = Depends(get_service)):
    return service.list()


@router.get("/{link_id}", response_model=LinkOut, summary="Получить ссылку по id")
def get_link(link_id: int, service: LinkService = Depends(get_service)):
    return service.get(link_id)


@router.post("", response_model=LinkOut, status_code=201, summary="Добавить ссылку")
def create_link(body: LinkIn, service: LinkService = Depends(get_service)):
    return service.create(body.title, body.url)


@router.put("/{link_id}", response_model=LinkOut, summary="Изменить ссылку")
def update_link(link_id: int, body: LinkIn, service: LinkService = Depends(get_service)):
    return service.update(link_id, body.title, body.url)


@router.delete("/{link_id}", status_code=204, summary="Удалить ссылку")
def delete_link(link_id: int, service: LinkService = Depends(get_service)):
    service.delete(link_id)
    return Response(status_code=204)
