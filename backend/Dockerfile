# Dockerfile Backend OpenJDK 17
FROM openjdk:17-alpine
ENV TZ="Europe/Vienna"
EXPOSE 8080

WORKDIR /app

COPY .mvn/ .mvn
COPY mvnw pom.xml ./
#RUN ./mvnw dependency:go-offline

COPY src ./src

CMD ["./mvnw", "spring-boot:run"]