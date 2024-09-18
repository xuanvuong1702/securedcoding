# Serve webapp
FROM nginx:1.21.6-alpine
COPY /build /app/www
COPY etc/ /app/etc/
COPY etc/nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
