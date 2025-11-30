# Docker Fundamentals

It helps to build a container.

**Container**: A single unit which packages an app with all of it's the dependencies. It's an instance of the docker image.

**Image**: Blueprint of the `Container`. ( Class and Object analogy )

- `Dockerfile` can be used to create a docker image.

---

## Running ubuntu through docker

```shell
docker run -it ubuntu
```

This command will run the ubuntu container in `interactive` (-it) mode. If the container is not available locally, it will be pulled from `dockerhub`.

## Getting help

Run `docker` in the terminal to get all the available commands.

## Docker commands

### Pull an image from the dockerhub

```shell
docker pull <image_name>
```

e.g. `docker pull hello_world`

It will pull the image locally.

**Note**: If we try to run a docker image directly without pulling it explicitly, docker will try to pull it from the dockerhub first before running it if it's not available locally.

### Pull specific version of Image

```shell
docker pull <image_name>:<version>
```

### List all the images available locally

```shell
docker images
```

### Run a docker image (Building the container and running it)

- Without interactive mode

```shell
docker run <image_name or image_id>
```

- With interactive mode -- Allows to access the container terminal

```shell
docker run -it <image_name or image_id>
```

As soon as we exit the container while running in interactive mode, it will stop. To exit the container we can type `exit` or use `ctrl+D`.

- In detached mode (in the background).

```shell
docker run -d <image_name>
```

> By default it runs in interactive mode.

- Provide a custom name to the container.

```shell
docker run --name <custom_container_name> -d <image_name>
```

> By default docker gives a uniquie random name to the container.

### Start a container

```shell
docker start <container_name or container_id>
```

### Stop a container

```shell
docker stop <container_name or container_id>
```

### List all the Containers

```shell
docker ps -a   # "-a" is for all
```

### List running Containers

```shell
docker ps
```

### Delete a docker Image

```shell
docker rmi <image_name or image_id>
```

**Note**: The associated container needs to be stopped and deleted first in order to delete the docker image.

### Delete a docker Container

```shell
docker rm <container_name or container_id>
```

**Note**: The container needs to be stopped before deleting, else it will throw error.

### Set environment variables in a container

```shell
docker run -e <variable_name>=<variable_value> <container_name or container_id>
```

## Docker Image Layers

```
Base Layer --> Layer-1 --> Layer-2 --> Container
```

When we create a new container, a new writable layer (called container layer) is added on top of underlying layers.

Generally in any Image, all the layers except the `container` layer are read-only. Here we are not talking about the `Dockerfile` -- we are talking about the final Image that gets pushed or shared with others to build container from it or on top of it.

While running different versions of same Image, the comman layers will be re-used while building the container.

## Port Binding

By default all docker container has a `port` which is binded to them and they also have a virtual file system (e.g. Like linux if you use ubuntu etc).

Both port and file systems are different than the host machine.

In order to expose the docker port (port of the service running inside the docker container) we need to bind that port with one of the port on the host machine (Like a NAT mapping on router).

Generally we only run one service inside a docker and one-to-one port binding is done with the host machine.

docker:port <-> host:port

```shell
docker run -p<host_port>:<docker_port> IMAGE_NAME
```

e.g.

```shell
docker run -p8080:3000 IMAGE_NAME
```

> **Note**: `IMAGE_NAME` should be at the end of the command.

## Troubleshooting

### Access logs of a particular container

```shell
docker logs <container_id or container_name>
```

> **Note**: These logs can be accessed in the docker desktop too. Just click on the running container.

### Execute additional command inside the running container

```shell
docker exec -it <container_id or container_name> /bin/bash
```

Or

```shell
docker exec -it <container_id or container_name> /bin/sh
```

This way we enter the `bash` or `shell` of the running container.

> **Note**: when we `exit` from here, it won't stop the container because we were simply accessing the terminal/bash of a running container.

> **Note**: `bash` is modern than `sh`. `bash` can handle all the features of `sh`.
>
> `sh`: Bourne shell (Oldest UNIX shell (from 1977).)
>
> `bash`: Bourne Again SHell (Modern replacement for sh.)

> **🚀 Which one should you use?**
>
> ✔ Use /bin/bash when:
>
> - Your container image is Debian/Ubuntu/CentOS based.
> - You need advanced shell features or a more comfortable shell.
>
> ✔ Use /bin/sh when:
>
> - The container is Alpine-based.
> - The container is lightweight and likely missing bash.
> - You just need basic commands / quick debugging.

## Docker vs Virtual machine

Layers of a typical system

```
Hardware ---> Host OS Kernel ---> Application Layer
```

### **1. Virtual Machine**

Virtualizes `Host OS Kernel ---> Application Layer` both.

- Runs a **full guest OS** (Linux/Windows).
- Heavy: **GBs of size**, slower startup.
- Uses a **hypervisor** (VMware, VirtualBox, KVM).
- Strong isolation but **resource-intensive**.

### **2. Docker (Containers)**

Virtualizes only `Application Layer`.

- Shares the **host OS kernel**, doesn’t run a full OS.
- Lightweight: **MBs of size**, starts in milliseconds.
- Uses **container runtime** (Docker Engine).
- Good isolation but less than VMs.

> Docker engine runs a lightweight hypervisor to provide the linux environment at the kernel level as docker was initially developed for linux based system. It allows to run docker on any OS such as Windows, Mac etc.
