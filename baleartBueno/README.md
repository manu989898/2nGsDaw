# Baleart

Baleart es un proyecto basado en **React + Tailwind** y **Laravel**. Este documento proporciona instrucciones detalladas para la configuración y ejecución del proyecto en un entorno de desarrollo local utilizando **Laragon**.

## Requisitos previos

Asegúrate de contar con los siguientes requisitos antes de comenzar:

- **Laragon** instalado en tu sistema.
- **PHP 8.3.13** y **Composer** instalados.
- **Node.js** y **npm** instalados.
- **Visual Studio Code (VSCode)** como editor de código.
- **MySQL** habilitado en Laragon.

## Pasos de instalación y configuración

### 1. Insertar archivos JSON

Copia el contenido de la carpeta `jsons` en la siguiente ruta:

```
C:\temp\baleart
```

### 2. Copiar la carpeta del proyecto

Copia la carpeta del proyecto en la siguiente ruta:

```
C:\laragon\www\baleart
```
En el último apartado está el archivo .env para que lo sustituyas por el tuyo.


### 3. Iniciar servicios en Laragon

Abre **Laragon** y en la pestaña de servicios, inicia **Apache** y **MySQL**.

### 4. Configuración y ejecución del backend (Laravel)

1. Abre **Laragon**, accede a la consola de Laragon y navega hasta la carpeta del proyecto copiado con el siguiente comando:
   ```sh
   cd C:\laragon\www\baleart
   ```
2. Ejecuta las siguientes instrucciones para configurar la base de datos:
   ```sh
   php artisan migrate:fresh
   php artisan db:seed
   ```
3. Una vez finalizado, inicia el servidor de Laravel:
   ```sh
   php artisan serve
   ```

### 5. Configuración y ejecución del frontend (React)

1. Descarga y abre el proyecto **React** en **Visual Studio Code**.
2. Accede a la carpeta del proyecto React desde la terminal de VSCode.
3. Instala las dependencias necesarias ejecutando:
   ```sh
   npm install
   ```
4. Levanta el servidor local con:
   ```sh
   npm run dev
   ```

### 6. Acceder a la aplicación

Una vez ambos servidores estén en ejecución:

- **Backend (Laravel)** se ejecutará en `http://127.0.0.1:8000`
- **Frontend (React)** se ejecutará en `http://localhost:5173`

Ahora puedes acceder a la aplicación y comenzar a trabajar con **Baleart**.

#### Notas adicionales

- Las imagenes mostradas en los spaces detallados (clicando en ellos desde el home) son imagenes random que no corresponden al space exacto ya que la dependencia que usamos en backend apra generar imagenes "fake" está inoperativa.
- No muestro un slider de imagenes en el "/" debido a que romperia el estilo de la web. Pongo una galeria especifica en cada space detallado.
- La página de contacto con la administración está en el footer.
- Logo creado con dall-e.
- Para poder restaurar la contraseña los campos del formulario deberán de coincidir con los datos del usuario.
- Si hay problemas con migraciones, asegúrate de que la base de datos esté creada y configurada en `.env`.
- Verifica que las versiones de **Node.js**, **PHP** y **Composer** sean compatibles con el proyecto.
- Puedes cambiar el puerto del servidor Laravel agregando `--port=8080` al comando `php artisan serve` si es necesario.


##### .env laragon

APP_NAME=Laravel
APP_ENV=local
APP_KEY=base64:ajaENOf4UDrI3/3e/BwhKKv8C5+efTUAke+yqtn/blI=
APP_DEBUG=true
APP_TIMEZONE=UTC
APP_URL=http://localhost

APP_LOCALE=en
APP_FALLBACK_LOCALE=en
APP_FAKER_LOCALE=en_US

APP_MAINTENANCE_DRIVER=file
# APP_MAINTENANCE_STORE=database

PHP_CLI_SERVER_WORKERS=4

BCRYPT_ROUNDS=12

LOG_CHANNEL=stack
LOG_STACK=single
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=project2
DB_USERNAME=root
DB_PASSWORD=

SESSION_DRIVER=database
SESSION_LIFETIME=120
SESSION_ENCRYPT=false
SESSION_PATH=/
SESSION_DOMAIN=null

BROADCAST_CONNECTION=log
FILESYSTEM_DISK=local
QUEUE_CONNECTION=database

CACHE_STORE=database
CACHE_PREFIX=

MEMCACHED_HOST=127.0.0.1

REDIS_CLIENT=phpredis
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=log
MAIL_HOST=127.0.0.1
MAIL_PORT=2525
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=
AWS_USE_PATH_STYLE_ENDPOINT=false

VITE_APP_NAME="${APP_NAME}"
