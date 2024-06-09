## Используемые технологии

- Kafka

- Confluent Control Center

- Swagger

- Docker

- Node.js

- Express

- Sequelize

- PostgreSQL

## Описание

Реализованы два микросервиса:

- user_service предоставляет API для создания, изменения и получения пользователей

- history_service отслеживает историю действий с пользователями

Каждый сервис использует PostgreSQL в качестве базы данных, а их взаимодействие организовано
с помощью брокера сообщений Kafka.


## Сборка и запуск

`git clone https://github.com/code4-fun/history_services.git`

`cd history_services`

`docker-compose up -d`

`cd user_service`

`cp .\.env.example .\.env` для Windows  
`cp ./.env.example ./.env` для Linux

`npm install`

`npm run build`

`npm run migrate`

`npm run seed`

`npm run dev:win` или `npm run dev:linux`

После чего документация Swagger сервиса user_service будет доступна на: http://localhost:3001/api-docs

(также endpoint-ы в файле **api.http**)

`cd ../history_service`

`cp .\.env.example .\.env` для Windows  
`cp ./.env.example ./.env` для Linux

`npm install`

`npm run build`

`npm run migrate`

`npm run dev:win` или `npm run dev:linux`

После чего документация Swagger сервиса history_service будет доступна на: http://localhost:3003/api-docs

(также endpoint-ы в файле **api.http**)

Для мониторинга Kafka использован Confluent Control Center. Доступен на: http://localhost:9021
