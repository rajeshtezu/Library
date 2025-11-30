# Developing with Docker

Learning how to build a fullstack software with the help of docker. We can run different services on different docker container and all of them will be communicating with each other.

## Docker Network

Docker network is a virtual/isolated network created to keep all the services running inside a private kind of network. It allows the services to interact with each other without the need to specify the port or localhost information.

### List all the docker network

```shell
docker network ls
```

### Create a docker network

```shell
docker network create <network_name>
```

e.g.

```shell
docker network create mongo-network
```

### Delete a docker network

```shell
docker network rm <network_name>
```

### Common Docker Network Types

| Network Type | Description |
| ------------ | ----------- |
| bridge       | The default network driver. If you don't specify a driver, this is the type of network you are creating. Bridge networks are commonly used when your application runs in a container that needs to communicate with other containers on the same host. |
| host         | Remove network isolation between the container and the Docker host, and use the host's networking directly. |
| null         | Completely isolate a container from the host and other containers. |

## Setting up `mongo` and `mongo-express`

Setup mongo in the created network

```shell
docker run -d \
-p27027:27027 \
--name mongo \
--network mongo-network \
-e MONGO_INITDB_ROOT_USERNAME=root \
-e MONGO_INITDB_ROOT_PASSWORD=example \
mongo
```

Setup mongo-express (It's GUI for the mongo)

```shell
docker run -d \
-p8081:8081 \
--name mongo-express \
--network mongo-network \
-e ME_CONFIG_BASICAUTH_USERNAME=root \
-e ME_CONFIG_BASICAUTH_PASSWORD=example \
-e ME_CONFIG_MONGODB_URL="mongodb://root:example@mongo:27017" \
mongo-express
```

This should setup the `mongo` and `mongo-express`. Now you can open the `http://localhost:8081` to access the `mongo-express` GUI and play around the mongo DB.

> **Note**: Check the dockerhub mongo and mongo-express page for more info on this.
