# Microservicio de Gestión Hospitalaria
Este repositorio contiene un microservicio que permite gestionar procesos internos del Hospital Col a través de una API. Los procesos están divididos en varios módulos, y se ha utilizado NestJS para exponer los EndPoints que cumplen con los requerimientos de cada módulo.

Requisitos
Antes de ejecutar el microservicio, asegúrese de tener instalado lo siguiente:

Node.js
npm (administrador de paquetes de Node.js)
Para este microservicio, debe configurar una base de datos relacional de su elección. A continuación, se describen los pasos generales:


## Configure las credenciales de conexión en el archivo .env

este es un ejemplo de las variables que se deben configurar, tener en cuenta que si se va a desplegar con docker se usa una red de docker y el host de la base de datos debe ser el nopmbre del servicio de la base de datos "db" (revisar archivo docker compose )
bash
```
DATABASE_URL="postgresql://{user}:{pass}@{host}:5432/{database}?schema=public"
JWT_SECRET="este es el secreto"
```

# Documentación

Toda la documentación de la api usando swagger está disponible desde el endpoint 

http://localhost:3000/api/docs 

# Instalación
Siga estos pasos para ejecutar el microservicio en local:

## Clone este repositorio:

bash
```
git clone https://github.com/David-Viuche/api_gateway_h_col.git
```

Navegue al directorio del proyecto:

bash
```
cd api_gateway_h_col
```

Instale las dependencias:

bash
```
npm install
```

Subir el servicio de base de datos:
bash
```
docker-compose up -d db
```

Ejecución
Para iniciar el microservicio, ejecute el siguiente comando:

bash
```
npm run start:dev
```
El microservicio estará disponible en http://localhost:3000. Tener en cuenta antes de ejecutar cualquier peticion se debe migrar el esquema de la base de datos ejecutando el comando 

bash
```
npx prisma migrate dev --name init
```

# Desplegar la api usando docker

Subir el servicio de base de datos y de la app:
bash
```
docker-compose up -d
```

El microservicio estará disponible en http://localhost:3000. Tener en cuenta antes de ejecutar cualquier peticion se debe migrar el esquema de la base de datos ejecutando el comando en el contenedor que tiene la api desplegada

bash
```
npx prisma migrate deploy
```

Nota: No se realizaron seeders de información inicial para cargar la base de datos por lo que es necesario registrar información en la colección de postman se encuetran los ejemplos de uso de los diferentes endpoints 
