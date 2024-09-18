# Copies source code and build jar file
FROM gradle:7-jdk as build
WORKDIR /app

COPY . ./
ARG IMAGE_TAG_ARG='latest'
ENV SPRINGBOOT_IMAGE_TAG=${IMAGE_TAG_ARG}
RUN gradle build

# Serve apps
FROM openjdk:17-alpine
COPY --from=build /app/build/libs/poc-0.0.1-SNAPSHOT.jar /app/app.jar
ENV JAVA_OPTS=""
ENTRYPOINT [ "sh", "-c", "java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar /app/app.jar" ]