# Ejercicio usando Docker

Ejercicio creando un servidor node como microservicio usando una imagen de Node js de docker hub

## Comandos de docker usados

1. Empaquetar y verificar nuestra imagen Dockerfile, correr este comando:

```docker
docker build -t video-streaming --file Dockerfile .
```

El **-t** argumento nos permite etiquetar o nombrar nuestra imagen. Querrás hacer esto; de lo contrario, tendrá que hacer referencia a su imagen por su ID único. Es una serie de números muy feos, por lo que no es la mejor opción.

El **--file** argumento especifica el nombre del Dockerfile que se utilizará. Técnicamente, esto es innecesario porque de todos modos toma el archivo llamado Dockerfile.

¡No olvidar el punto al final! Es fácil perderse. Le dice al comando build que opere contra el directorio actual. Esto significa que cualquier instrucción en el Dockerfile es relativa al directorio de trabajo actual. Cambiar este directorio hace posible almacenar nuestro Dockerfile en un directorio diferente de los activos de nuestro proyecto.

2. Arrancar nuestro microservicio en un contenedor

```docker
docker run -d -p 3000:3000 video-streaming
```

El comando **-d** hace que nuestro contenedor se ejecute en modo separado. Esto significa que se ejecuta en segundo plano y no podemos ver directamente sus registros. Si omitimos esto, nuestro contenedor se ejecutaría en primer plano y veríamos su salida directamente; aunque también estaría atando nuestra terminal.

El **-p** argumento une el puerto entre el sistema operativo host y nuestro contenedor. Esto es como el reenvío de puertos, el tráfico de red enviado al puerto 3000 en nuestra estación de trabajo de desarrollo se reenvía al puerto 3000 dentro de nuestro contenedor. Lo configuramos de esa manera porque originalmente codificamos nuestro microservicio para escuchar en el puerto 3000.

El último argumento, **video-streaming**, es el nombre que le dimos a nuestra imagen. Así es como especificamos qué imagen (podríamos tener muchas) se instanciará. Esto se relaciona con el nombre que le dimos a la imagen usando **docker build** y el argumento **-t**.

3. Registrando logs del microservicio del contenedor corriendo

```docker
 docker logs <container-id>
```

4. Publicando el microservicio en docker hub

Hacer login si no lo hemos hecho:

```docker
docker login <registro-url> --username <my-username> --password <my-password>
```

Tagear nuestra imagen, antes de publicar nuestra imagen en el registro, debemos decirle a Docker dónde se está insertando la imagen. Hacemos esto etiquetando la imagen con la URL del registro con el comando docker tag como sigue:

```docker
docker tag video-streaming estebanmaster/video-streaming:latest
```

El comando anterior se ve asi:

```docker
docker tag <imagen-existente> <registry-url>/<image-name>:<version>
```

Estamos etiquetando en este caso, solo porque queremos enviarlo a nuestro registro. Por este motivo, incluimos la URL del registro en la etiqueta que estamos aplicando.

Empujar nuestra imagen al registro:

```docker
  docker push estebanmaster/video-streaming:latest
```

El comando anterior se ve asi:

```docker
  docker push <registry-url>/<image-name>:<version>
```

5. Limpiar versiones locales de nuestra imagen

Tenemos que hacer esto; de lo contrario, cuando invocamos docker run, arrancará el contenedor desde la versión local de la imagen que ya tenemos.

En su lugar, queremos probar que podemos extraer la imagen del registro remoto. Si ya tenemos una versión de la imagen almacenada en caché localmente, no es necesario extraer la versión remota.

Listar contenedores corriendo y detenidos:

```docker
  docker container ls -a
```

Ahora detener y eliminar contendedor

```docker
  docker kill <container-id>
  docker rm <container-id>
```

Invocar **docker image list**. Podemos ver al menos tres imágenes en la lista. Existe la imagen base de Node.js y las dos versiones etiquetadas de nuestro microservicio de transmisión de video. Solo necesitamos eliminar la imagen para nuestro microservicio. No es necesario eliminar la imagen base de Node.js porque eso realmente no importa para esta ejecución de prueba.

Tenga en cuenta que ambas versiones etiquetadas de nuestra imagen tienen el mismo ID de imagen, y en realidad son la misma imagen a la que se hace referencia varias veces. Podemos eliminar ambos invocando el comando:

```docker
  docker rmi <image-id> --force
```

Usamos **--force** aquí porque, de lo contrario, nos detendríamos con un mensaje de error como Image is referenced in multiple repositories. Eso es porque tenemos varias versiones etiquetadas de nuestra imagen. Podemos usar **--force** para asegurarnos de que se eliminen todos.

Después de eliminar la imagen, invocar **docker image list -a** nuevamente para comprobar que esto funcionó correctamente y que nuestra imagen ya no está en la lista. Está bien ver la imagen base de Node.js en la lista porque no es necesario eliminarla para esta prueba correr.

6. Ejecutando un contenedor directamente desde el registo donde se subio la imagen

```docker
  docker run -d -p <host-port>:<container-port> <registry-url>/<image-name>:<version>
```

En este caso asi:

```docker
  docker run -d -p 3000:3000 estebanmaster/video-streaming:latest
```

Cuando se invoca docker run en la terminal se va a descargar la imagen en remoto. Primero tiene que tirar de tu imagen. Probablemente ya tenga la imagen base de Node.js almacenada en caché localmente (a menos que se eliminara) y, en ese caso, no debería llevar mucho tiempo.

Cuando este proceso se haya completado, debería tener un contenedor en ejecución. Pero esta vez, la imagen se ha extraído a pedido de su registro de contenedores privados en la nube. Cuando el docker runcomando se haya completado, debería ver impreso el ID del contenedor. También podemos comprobar que el contenedor se está ejecutando
