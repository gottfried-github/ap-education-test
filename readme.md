# Run

`docker compose up`

Then, you can query the api through `localhost:3000`.

## Run tests

`npm run test`

# Project structure

The code is organized into _controllers_, _services_ and _middleware_.

_services_ are responsible for business logic and, e.g., querying the database; _middleware_ is responsible, e.g., for validating the requests; _controllers_ map endpoints to services.

# Integration

For caching, I implemented the `cache` function which accepts a key and a data source function. It uses `redis` for storing the cached data.

When called, it first checks the cache: if the data exists, it returns it; else, it fetches the data via the provided function and writes that data to the cache store.

# Framework choice

I chose Express because it allows for greater flexibility and, also, I'm most familiar with this framework.

# Rebuilding the containers

For instance, the `api` service's image installs the dependencies to it's internal storage at build stage. So, whenever we install some new packages, we will have to rebuild that container:

`docker compose build --no-cache api`

# Working with Prisma

## The Prisma client

The `api` service's image generates the client at build stage. So anytime we modify `./prisma/schema.prisma`, we should rebuild that container:

`docker compose build --no-cache api`

## Make migrations

run: `docker compose run api npx prisma migrate dev`

# Testing endpoints

## Groups

### `POST /groups`

`curl --verbose -X "POST" -H "Content-Type: application/json" --data '{"name": "group #01", "start_date": "2026-03-01T00:00:00Z"}' localhost:3000/groups`

### `GET /groups`

`curl --verbose localhost:3000/groups`

### `GET /groups/:id`

`curl --verbose localhost:3000/groups/2`

when `id` doesn't exist, should respond with `404`

## Students

### `POST /students`

`curl --verbose -X "POST" -H "Content-Type: application/json" --data '{"name": "student #01", "email": "student01@email.com"}' localhost:3000/students`

### `GET /students`

`curl --verbose localhost:3000/students`

## External

### `GET /external/courses`

`curl localhost:3000/external/courses`
