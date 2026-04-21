# -------- Build Stage --------
FROM eclipse-temurin:25-jdk-alpine AS build
WORKDIR /app

# Install dependencies needed for mvnw
RUN apk add --no-cache bash

# Copy wrapper files
COPY mvnw .
COPY .mvn .mvn/

# Copy root pom and module poms to cache dependencies
COPY pom.xml .
COPY auth-service/pom.xml auth-service/
COPY api-gateway/pom.xml api-gateway/
COPY service-registry/pom.xml service-registry/

# Download dependencies (this layer will be cached)
RUN chmod +x mvnw && ./mvnw dependency:go-offline -B

# Copy source code and build
COPY . .
RUN chmod +x mvnw && ./mvnw package -DskipTests

# -------- Run Stage --------
FROM eclipse-temurin:25-jdk-alpine
WORKDIR /app

# Copy the built JARs
COPY --from=build /app/service-registry/target/*.jar service-registry.jar
COPY --from=build /app/auth-service/target/*.jar auth-service.jar
COPY --from=build /app/api-gateway/target/*.jar api-gateway.jar

# Copy and prepare the startup script
COPY start.sh start.sh
RUN chmod +x start.sh

# Render injects PORT env var; start.sh will handle mapping it to Gateway
EXPOSE 8080

ENTRYPOINT ["./start.sh"]