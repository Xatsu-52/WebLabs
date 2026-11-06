# Links Service

REST CRUD-сервис и сайт. Python (FastAPI), HTML, CSS, JS. Хранилище в памяти, максимум 50 записей.

## Запуск

```
pip install -r requirements.txt
python -m uvicorn main:app --reload
```

- Сайт: http://127.0.0.1:8000/
- Swagger: http://127.0.0.1:8000/docs

## Структура (луковая архитектура)

```
links-app/
├── main.py                      запуск приложения, страницы, обработка ошибок
├── app/
│   ├── domain/                  Link, исключения
│   ├── application/             LinkRepository (интерфейс), LinkService (лимит 50)
│   ├── infrastructure/          InMemoryLinkRepository (хранилище в памяти)
│   └── presentation/            api.py (GET, POST, PUT, DELETE), schemas.py
└── static/                      index.html, manage.html, contacts.html, css, js
```

Зависимости направлены внутрь: presentation → application → domain.
Infrastructure реализует интерфейс из application.

## API

| Метод | URL | Описание |
|---|---|---|
| GET | /api/links | все ссылки |
| GET | /api/links/{id} | одна ссылка |
| POST | /api/links | добавить |
| PUT | /api/links/{id} | изменить |
| DELETE | /api/links/{id} | удалить |
