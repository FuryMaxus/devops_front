# Frontend - (Proyecto EP2)

## 1. Descripción del Módulo
Este repositorio contiene la interfaz de usuario desarrollada en React. Se despliega mediante un servidor Nginx configurado como **Proxy Inverso** para centralizar las peticiones hacia los microservicios de Ventas y Despacho.

## 2. Contenedorización Profesional
* **Dockerfile Multi-stage:** Optimizado para reducir el tamaño de la imagen final usando `node:20-alpine` para el build y `nginx:stable-alpine` para la ejecución.
* **Seguridad (Mínimo Privilegio):** El contenedor corre bajo el usuario `nginx` (no root) y tiene permisos restringidos en el sistema de archivos.
* **Orquestación:** Incluye un archivo `docker-compose.yaml` que permite el levantamiento local automático.

## 3. Pipeline CI/CD (GitHub Actions)
Flujo automatizado en la rama `deploy`:
1. **Build & Push:** Construye la imagen inyectando las IPs privadas de los microservicios mediante `--build-arg` y la sube a **Amazon ECR**.
2. **Deploy con Docker Compose:** Utiliza **AWS SSM** para enviar el archivo `docker-compose.yaml` a la instancia EC2 y desplegar usando `docker compose up -d`, garantizando un despliegue limpio y sin tiempo de inactividad.

## 4. Instrucciones de Ejecución Local
Para levantar el frontend localmente y que apunte a tus servicios:
```bash
docker compose up --build
