# Ejercicio usando Docker

## Comandos de docker usados

1. Empaquetar y verificar nuestra imagen Dockerfile, correr este comando:

```docker
docker build -t video-streaming --file Dockerfile .
```

- El **-t** argumento nos permite etiquetar o nombrar nuestra imagen. Querrás hacer esto; de lo contrario, tendrá que hacer referencia a su imagen por su ID único. Es una serie de números muy feos, por lo que no es la mejor opción.
- El **--file** argumento especifica el nombre del Dockerfile que se utilizará. Técnicamente, esto es innecesario porque de todos modos toma el archivo llamado Dockerfile.
- ¡No olvidar el punto al final! Es fácil perderse. Le dice al comando build que opere contra el directorio actual. Esto significa que cualquier instrucción en el Dockerfile es relativa al directorio de trabajo actual. Cambiar este directorio hace posible almacenar nuestro Dockerfile en un directorio diferente de los activos de nuestro proyecto.

2. Arrancar nuestro microservicio en un contenedor

```docker
docker run -d -p 3000:3000 video-streaming
```

- El comando **-d** hace que nuestro contenedor se ejecute en modo separado. Esto significa que se ejecuta en segundo plano y no podemos ver directamente sus registros. Si omitimos esto, nuestro contenedor se ejecutaría en primer plano y veríamos su salida directamente; aunque también estaría atando nuestra terminal.
- El **-p** argumento une el puerto entre el sistema operativo host y nuestro contenedor. Esto es como el reenvío de puertos, el tráfico de red enviado al puerto 3000 en nuestra estación de trabajo de desarrollo se reenvía al puerto 3000 dentro de nuestro contenedor. Lo configuramos de esa manera porque originalmente codificamos nuestro microservicio para escuchar en el puerto 3000.
- El último argumento, **video-streaming**, es el nombre que le dimos a nuestra imagen. Así es como especificamos qué imagen (podríamos tener muchas) se instanciará. Esto se relaciona con el nombre que le dimos a la imagen usando **docker build** y el argumento **-t**.

3. Registrando logs del microservicio del contenedor corriendo

```docker
 docker logs <container-id>
```

4. Publicando el microservicio en docker hub

- Hacer login si no lo hemos hecho:

```docker
docker login <registro-url> --username <my-username> --password <my-password>
```

- Tagear nuestra imagen, antes de publicar nuestra imagen en el registro, debemos decirle a Docker dónde se está insertando la imagen. Hacemos esto etiquetando la imagen con la URL del registro con el comando docker tag como sigue:

```docker
docker tag video-streaming estebanmaster/video-streaming:latest
```

- El comando anterior se ve asi:

```docker
docker tag <imagen-existente> <registry-url>/<image-name>:<version>
```

- Estamos etiquetando en este caso, solo porque queremos enviarlo a nuestro registro. Por este motivo, incluimos la URL del registro en la etiqueta que estamos aplicando.
- Empujar nuestra imagen al registro:

```docker
  docker push estebanmaster/video-streaming:latest
```

- El comando anterior se ve asi:

```docker
  docker push <registry-url>/<image-name>:<version>
```
