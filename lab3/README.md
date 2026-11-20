# Links Service (лабораторная работа 3)

REST CRUD-сервис и сайт со ссылками. Python (FastAPI), HTML, CSS, JS.
Данные хранятся в PostgreSQL через ORM SQLAlchemy. API защищено ключом.
Приложение и база запускаются в Docker через docker-compose.

## Запуск

```
docker compose up --build
```

- Сайт: http://127.0.0.1:8080/
- Swagger: http://127.0.0.1:8080/docs
- Проверка работы: http://127.0.0.1:8080/health

В логах uvicorn пишет `Uvicorn running on http://0.0.0.0:8000` — это адрес
внутри контейнера, так и должно быть. Наружу порт 8000 проброшен как 8080,
поэтому с компьютера сайт открывается по `http://127.0.0.1:8080`.

Остановить:

```
docker compose down
```

Остановить и удалить данные базы:

```
docker compose down -v
```

## Аутентификация

Все запросы к `/api/links` требуют заголовок `X-API-Key`.

Ключ по умолчанию: `student-key` (задаётся в `docker-compose.yml` в `API_KEY`).

- В Swagger нужно нажать кнопку **Authorize** и ввести ключ.
- На сайте ключ спрашивается один раз и сохраняется в браузере.
- Без ключа API возвращает `401`.

Пример:

```
curl -H "X-API-Key: student-key" http://127.0.0.1:8080/api/links
```

## База данных

СУБД: PostgreSQL 16. База: `links`, пользователь: `links`, пароль: `links`.

Таблица `links`:

| Поле | Тип | Ограничения |
|---|---|---|
| id | integer | PRIMARY KEY, SERIAL (автоинкремент) |
| title | varchar(200) | NOT NULL |
| url | varchar(500) | NOT NULL |

SQL-схема:

```sql
CREATE TABLE links (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    url VARCHAR(500) NOT NULL
);
```

Таблица создаётся автоматически при запуске приложения
(`Base.metadata.create_all`). Данные хранятся в docker-volume `pgdata`,
поэтому не пропадают после перезапуска контейнеров.

## Структура

```
lab3/
├── main.py                      запуск приложения, страницы, обработка ошибок
├── app/
│   ├── domain/                  Link, исключения
│   ├── application/             LinkRepository (интерфейс), LinkService (лимит 50)
│   ├── infrastructure/
│   │   ├── database.py          подключение к PostgreSQL, сессии
│   │   ├── models.py            ORM-модель LinkModel (таблица links)
│   │   └── repository.py        SqlAlchemyLinkRepository
│   └── presentation/            api.py, schemas.py, security.py
├── static/                      index.html, manage.html, contacts.html, css, js
├── Dockerfile                   образ приложения
└── docker-compose.yml           приложение + PostgreSQL
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

Максимум 50 записей.

Дополнительно есть `GET /health` — простая проверка, что приложение живо.
Она не требует ключа и возвращает `{"status": "ok"}`.

## Запуск без Docker (по желанию)

Нужен установленный PostgreSQL с базой `links` (пользователь и пароль `links`).

```
pip install -r requirements.txt
set DATABASE_URL=postgresql+psycopg2://links:links@localhost:5432/links
python -m uvicorn main:app --reload
```

При локальном запуске uvicorn слушает порт 8000, поэтому сайт будет
доступен по `http://127.0.0.1:8000`.
