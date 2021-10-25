# Ejercicio usando Docker Compose

Ejercicio usando docker compose para crear una aplicacion compuesta por varios contenedores, creando varios microservicios.

Debemos colocar cada microservicio en su propio subdirectorio separado. Nuestra convención será que cada subdirectorio lleve el nombre de su microservicio.

## Comandos de docker-compose usados

1. Crear docker-compose en la raiz de nuestro proyecto:

```yml
version: "3.9"

services:
  video-streaming:
    image: video-streaming
    build:
      context: ./video-streaming
      dockerfile: Dockerfile
    container_name: video-streaming
    ports:
      - "4000:3000"
    environment:
      - PORT=3000
    restart: "no"
```

- Utilizamos la version 3.9 del formato de archivo de Docker Compose
- Anidamos nuestros contenedores en el campo "services"
- Configuramos el servicio llamado "video-streaming":
  - Le asignamos un nombre a la imagen
  - Establecemos los parametros nesesarios para contruir la imagen:
    - Establecemos el directorio para el microservicio
    - Establecemos el Dockerfile que construye la imagen
- Nombramos el contenedor que se instancia, en "container_name"
- Especificamos asignaciones de puertos. Es como el argumento "-p":
  - Asigna el puerto 3000 en el microservicio al puerto 4000 en el sistema operativo del host
- Establece variables de entorno para configurar la entrada al contenedor, la variable "PORT=3000"
- Finalmente si el microservicio falla, no lo reinicie automáticamente.

2. Arrancar nuestra aplicacion de microservicios

```docker
  docker-compose up --build
```

El comando `up` hace que Docker Compose inicie nuestra aplicación de microservicios. El argumento `--build` hace que Docker Compose compile cada una de nuestras imágenes antes de crear instancias de contenedores a partir de ellas.

Recomendable siempre usarl el comando `up` junto con `--build`

Después al iniciar su aplicación, Docker Compose continúa imprimiendo la salida al terminal mientras se está ejecutando. Esto bloquea su terminal, por lo que no podemos hacer nada con él ahora, excepto ver la salida.

Aunque nuestra terminal está bloqueada con Docker Compose, siempre podemos simplemente abrir una nueva terminal y usarla para invocar otros comandos, asi que podemos abrir una nueva terminal, cambiar al directorio donde se encuentra el archivo Docker Compose e invocar el siguiente comando:

```docker
  docker-compose ps
```

El comando `ps` muestra una lista de nuestros contenedores en ejecución.

`docker-compose ps` nos muestra solo los contenedores que se enumeran en nuestro archivo Docker Compose, mientras que, `docker ps` nos muestra todos los contenedores en nuestra estación de trabajo de desarrollo.

Podemos detener la aplicación de dos formas. Si abrimos una segunda terminal, puedemos el comando `stop`:

```docker
  docker-compose stop
```

Podemos eliminar nuestros contenedores y devolver nuestra estación de trabajo de desarrollo a un estado limpio. Para eso, podemos usar el comando `down`:

```docker
  docker-compose down
```

Es mejor que usemos siempre el comando `down`, que detiene y elimina los contenedores dejando limpio nuestro trabajo de desarrollo.

Podemos usar los comandos `up` y `down` en combinación para reiniciar fácilmente nuestra aplicación cuando queremos obtener código actualizado o dependencias en ella. Podemos encadenar estos comandos de la siguiente manera:

```docker
  docker-compose down && docker-compose up --build
```
