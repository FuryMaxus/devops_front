FROM node:20-alpine AS builder
WORKDIR /app   
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:stable-alpine


RUN rm /etc/nginx/conf.d/default.conf
RUN echo "server { \
    listen 8080; \
    \
    # 1. Servir el Frontend React \
    location / { \
        root /usr/share/nginx/html; \
        index index.html; \
        try_files \$uri \$uri/ /index.html; \
    } \
    \
    # 2. Proxy Inverso para Microservicio 1 (Despachos) \
    location /api/v1/despachos { \
        proxy_pass http://backend-despacho-service.default.svc.cluster.local:8080; \
        proxy_set_header Host \$host; \
        proxy_set_header X-Real-IP \$remote_addr; \
    } \
    \
    # 3. Proxy Inverso para Microservicio 2 (Ventas) \
    location /api/v1/ventas { \
        proxy_pass http://backend-ventas-service.default.svc.cluster.local:8080; \
        proxy_set_header Host \$host; \
        proxy_set_header X-Real-IP \$remote_addr; \
    } \
}" > /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html

RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid

USER nginx
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
