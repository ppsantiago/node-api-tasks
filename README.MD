# API TASKS

## _API realizada con NodeJS, MongoDB, Docker_

## Instalacion

Clonar este repositorio con `git clone [Repo] tu_proycto` e ingresar a la carpeta con `cd tu_proycto` luego instala las dependencia con `npm install`.
Modifica el `.env.example` con tus variables de entorno y renombralo por `.env`.
Levantar contenedor de base de datos con `docker-comse up -d`

### Comandos

    "test": "node app.js",
    "dev": "nodemon src/app.js"

## Descripción de Rutas

### GET /tasks

- Obtiene una lista de todas las tareas.
- Retorna un arreglo de objetos de tareas en formato JSON.
- Si no se encuentran tareas, retorna un estado 204 No Content.

### POST /tasks

- Crea una nueva tarea.
- Espera un cuerpo JSON con los siguientes campos:
  - title (requerido): El título de la tarea.
  - description (requerido): La descripción de la tarea.
  - date_end (opcional): La fecha de finalización de la tarea en formato ISO 8601 (YYYY-MM-DD).
  - subtasks (opcional): Un arreglo de objetos de subtareas.
  - done (opcional): Indica si la tarea está completada (true o false).
- Retorna el objeto de la tarea recién creada, incluyendo su ID, en formato JSON.

### GET /tasks/:id

- Obtiene una tarea específica por su ID.
- Retorna el objeto de la tarea en formato JSON.
- Si la tarea no existe, retorna un estado 404 Not Found.

### PUT /tasks/:id

- Actualiza una tarea existente.
- Espera un cuerpo JSON con los campos a actualizar (opcionales):
  - title: El nuevo título de la tarea.
  - description: La nueva descripción de la tarea.
  - date_end: La nueva fecha de finalización de la tarea.
  - subtasks: El nuevo arreglo de objetos de subtareas.
  - done: El nuevo estado de completitud de la tarea.
- Retorna el objeto de la tarea actualizada en formato JSON.

### PATCH /tasks/:id

- Actualiza parcialmente una tarea existente.
- Espera un cuerpo JSON con uno o más de los siguientes campos a actualizar:
  - title: El nuevo título de la tarea.
  - description: La nueva descripción de la tarea.
  - date_end: La nueva fecha de finalización de la tarea.
  - subtasks: El nuevo arreglo de objetos de subtareas.
  - done: El nuevo estado de completitud de la tarea.
- Retorna el objeto de la tarea actualizada en formato JSON.

### DELETE /tasks/:id

- Elimina una tarea específica por su ID.
- Retorna un mensaje de éxito en formato JSON indicando que la tarea ha sido eliminada.
