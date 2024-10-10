# Proyecto de Backend en Express con MongoDB

Este es el repositorio del backend desarrollado con **Express** y **MongoDB**. A continuación, se detallan los pasos para la instalación, configuración y ejecución del proyecto.

## Requisitos Previos

Asegúrate de tener instalados los siguientes programas antes de comenzar:

- [Node.js](https://nodejs.org/) (versión recomendada: LTS)
- [npm](https://www.npmjs.com/) (incluido con Node.js)
- [MongoDB](https://www.mongodb.com/) (local o servicio en la nube como [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

## Instalación

Sigue los siguientes pasos para configurar el proyecto localmente:

1. Clona este repositorio:

```bash
git clone https://github.com/ValentinoJCarrero/Gravitad_challenge.git
```

2. Navega al directorio del proyecto:
```bash
cd proyecto-backend
```

3. Instala las dependencias necesarias ejecutando:
```bash
npm install
```

## Configuración del Entorno

Crea un archivo .env en la raíz del proyecto y agrega la siguiente configuración, reemplazando el valor de DB_URI con la URI de tu base de datos MongoDB:
```bash
DB_URI=db_uri
```

DB_URI: La conexión a tu base de datos MongoDB (local o en la nube).

## Ejecución

Para iniciar el servidor de desarrollo, utiliza el siguiente comando:
```bash
npm start
```

El servidor debería estar corriendo en:
```bash
http://localhost:8001
```

Se puede ver la documentación en:
```bash
http://localhost:8001/doc
```
