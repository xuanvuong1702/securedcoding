# Serve apps
FROM openjdk:17-alpine
COPY /build/libs/poc-0.0.1-SNAPSHOT.jar /app/app.jar
ENV JAVA_OPTS=""
ENTRYPOINT [ "sh", "-c", "java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar /app/app.jar" ]
EXPOSE 8080