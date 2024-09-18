# Copies source code and build webapp
FROM node:alpine3.15 as build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . ./
ARG IMAGE_TAG_ARG='latest'
ENV REACTJS_IMAGE_TAG=${IMAGE_TAG_ARG}
RUN npm run build

# Serve webapp
FROM nginx:1.21.6-alpine as webapp
COPY --from=build /app/build /app/www
COPY etc/ /app/etc/
COPY etc/nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
