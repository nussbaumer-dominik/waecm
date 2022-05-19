# Dockerfile Build JAR Backend OpenJDK 17
FROM openjdk:17-alpine AS build-stage
ENV TZ="Europe/Vienna"

WORKDIR /app

COPY .mvn/ .mvn
COPY mvnw pom.xml ./
COPY src ./src

RUN ./mvnw clean install



# Dockerfile Backend OpenJDK 17
FROM openjdk:17-alpine
ENV TZ="Europe/Vienna"

WORKDIR /app

COPY --from=build-stage /app/target/backend-0.0.2.jar .
EXPOSE 8080
ENTRYPOINT ["java","-jar","/backend-0.0.2.jar"]