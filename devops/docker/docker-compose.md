# Docker Compose

A tool for defining and running multi-container applications.

We can create a `.yml` file and define all the docker commands in a structured way.

e.g. `mongo-db.yaml` for `mongo` :

```yml
services:
  mongo:
    image: mongo
    restart: always
    ports:
      - 27017:27017 # host_port:container_port
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: example

  mongo-express:
    image: mongo-express
    restart: always
    ports:
      - 8081:8081
    environment:
      ME_CONFIG_MONGODB_URL: mongodb://root:example@mongo:27017/
      ME_CONFIG_BASICAUTH_ENABLED: true
      ME_CONFIG_BASICAUTH_USERNAME: mongoexpressuser
      ME_CONFIG_BASICAUTH_PASSWORD: mongoexpresspass
```

Usage:

```shell
docker compose [OPTIONS] COMMAND
```

> **Note**: Notice that we haven't mentioned docker network information inside the docker compose file. When we use docker compose, it automatically creates a default network and run all the contianers mentioend inside the file in that network.

## Running the `mongo-db.yml` with "up"

```shell
docker compose -f mongo-db.yml up -d
```

It will start all the contianers in the `mongo-db.yml` file in the `detach` mode (`-d` flag).

## Stopping `mongo-db.yml` with "down"

```shell
docker compose -f mongo-db.yml down
```

It will **delete** all the contianers in the `mongo-db.yml` file.
