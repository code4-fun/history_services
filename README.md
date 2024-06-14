## Используемые технологии

- Kafka

- Confluent Control Center

- Swagger

- Docker

- TypeScript

- Node.js

- Express

- Sequelize

- PostgreSQL

## Описание

Реализованы два микросервиса:

- **User service** предоставляет API для создания, изменения и получения пользователей

- **History service** отслеживает историю действий с пользователями

Взаимодействие сервисов организовано с помощью брокера сообщений **Kafka**. При каждом изменении пользовательских данных, таких как создание нового пользователя или обновление существующего, **User service** инициирует отправку сообщения. **History service** слушает эти сообщения и сохраняет историю действий с пользователями. **History service** также предоставляет API для запросов истории действий с пользователями, поддерживающее фильтрацию по идентификатору пользователя и постраничную навигацию. Каждый сервис использует **PostgreSQL** в качестве базы данных.



## Сборка и запуск

`git clone https://github.com/code4-fun/history_services.git`

`cd history_services`

`docker-compose up -d`

### User service

`cd user_service`

`cp .\.env.example .\.env` для **Windows**  
`cp ./.env.example ./.env` для **Linux**

`npm install`

`npm run build`

`npm run migrate`

`npm run seed`

`npm run dev:win` или `npm run dev:linux`

После чего документация **Swagger** для сервиса **User service** будет доступна по адресу: http://localhost:3001/api-docs

Также в файле **api.http** находится список доступных endpoint-ов.

### History service

`cd ../history_service`

`cp .\.env.example .\.env` для Windows  
`cp ./.env.example ./.env` для Linux

`npm install`

`npm run build`

`npm run migrate`

`npm run dev:win` или `npm run dev:linux`

После чего документация **Swagger** для сервиса **History service** будет доступна по адресу: http://localhost:3003/api-docs

Также в файле **api.http** находится список доступных endpoint-ов.

### Confluent Control Center

Для мониторинга **Kafka** использован **Confluent Control Center**. Доступен по адресу: http://localhost:9021
