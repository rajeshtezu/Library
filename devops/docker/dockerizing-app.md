# Dockerizing an App

Converting an App to a docker `Image` and running it in a container is called dockerizing an App.

This `Image` can be shared with others to run the app in a docker container.

We need to create a `Dockerfile` to dockerize an App.

> **Note**: The file name would simply be `Dockerfile` with the same casing and without any file extension.

```
MyApp ---> Docker Image ---> Container
```

## Dockerfile

Instructions in the `Dockerfile` :

| Command | Description                                                                                                                           |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| FROM    | Here we provide the Base Image, on top of which we build our own image.                                                               |
| WORKDIR | this instruction specifies the "working directory" or the path in the image where files will be copied and commands will be executed. |
| COPY    | his instruction tells the builder to copy files from the host and put them into the container image.                                  |
| RUN     | this instruction tells the builder to run the specified command.                                                                      |
| ENV     | this instruction sets an environment variable that a running container will use.                                                      |
| EXPOSE  | this instruction sets configuration on the image that indicates a port the image would like to expose.                                |
| USER    | this instruction sets the default user for all subsequent instructions.                                                               |
| CMD     | this instruction sets the default command a container using this image will run.                                                      |

**Sample Dockerfile**:

```Dockerfile
FROM <base_image>

WORKDIR <path>

COPY <host-path> <image-path>

RUN <command>

ENV <name> <value>

EXPOSE <port-number>

USER <user-or-uid>

CMD ["<command>", "<arg1>"]
```

> **Note**:
>
> - We can have multiple `RUN` commands but only one `CMD` command.
> - Basically `CMD` is the final command that we want to be executed once the container is fully setup. For a `node.js` based applicaiton, it can be `node server.js`.

e.g.

Creating a `Dockerfile`

```Dockerfile
FROM node

ENV MONGO_DB_USERNAME=root \
    MONGO_DB_PWD=example

RUN mkdir -p myapp

COPY . /myapp

RUN npm install

CMD ["node", "/myapp/server.js"]
```

Building an Image from the `Dockerfile`

```shell
docker build -t myapp:1.0 .
```

This should build a new `Image` named `myapp:1.0`.

> **Command Explained**
>
> ```shell
> docker build -t <tag> <Dockerfile_diretory_path>
> ```

Now we can run that newly created `Image`

```shell
docker run myapp:1.0
```

or

```shell
docker run -it myapp:1.0 bash
```

## Publising Docker Image

Just the way we do on GitHub, we can do in a similar way.

**Steps**:

- Create a repo on the `dockerhub`
- Build the image with the same name as the repo created on the `dockerhub`
- Login into the terminal
  - `docker login`
- Run `docker push <image_name>`

Now we can also pull the newly created and pushed Image

```shell
docker pull myaccount/myapp:latest
```
