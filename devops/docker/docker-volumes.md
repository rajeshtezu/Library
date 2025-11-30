# Docker Volumes

Volumes are `persistent` data stores for containers.

This allows mapping container memory with the host memory to persist the data.

Mutlple containers can be attached with a single Volume.

> **Note**: We can use `--volume` or `--mount` flag to set up the volumes.
>
> `--mount` is preferred over `--volume` because `--mount` is more explicit and supports all the available options.
>
> **Docs link**: https://docs.docker.com/engine/storage/volumes/

e.g.

```shell
docker run -it -v /Volumes/data/ubuntu-data:/test/data ubuntu
```

This will map the host machines `/Volumes/data/ubuntu-data` directory with the `ubuntu` container's `/test/data` directory. Any change in either way will update the other directory.

## Docker Volumes with Docker Compose

We can define `volumes` key as shown below.

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
    volumes:
      - /Volumes/data/mongodb-data:/data/db # Notice this line

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

Up the compose file

```shell
docker compose -f mongo-db.yml up -d
```

Down the compose file

```shell
docker compose -f mongo-db.yml down
```

## List, Create, Delete a Volume

### List all the volumes

```shell
docker volume ls
```

### Create a custom Volume

```shell
docker volume create <volume_name>
```

These are called named volume. It won't be attached to any container after getting created, we will need to attach these volumes with the container explicitly.

> **Note**:
>
> If we don't specify the volume location it will be created at a default location
>
> - **Mac/Linux**: `/var/lib/docker/volumes`
> - **Windows**: `C:\ProgramData\docker\volumes`

### Delete a Volume

```shell
docker volume rm <volume_name>
```

## Attach a Volume to running Container

### Named Volumes

```shell
docker run -v <volume_name>:<container_directory_path>
```

> **Note**:
>
> 1. If the volume with `volume_name` does not exists, docker will create it automatically.
> 2. This is most popular and preferred way to use `Volumes`.
> 3. Volume is managed by the docker.

### Anonymous Volumes

```shell
docker run -v <mount_path>
```

> **Note**:
>
> 1. The `mount_path` is the container directory path.
> 2. Used for temporary storage.
> 3. Volume is managed by the docker.

### Bind Mount

```shell
docker run -v <host_directory>:<container_directory>
```

> **Note**: Here the volume is managed by the **Host machine**.

## Pruning Volumes

```shell
docker volume prune
```

It will delete all the unused anonymous Volumes.
