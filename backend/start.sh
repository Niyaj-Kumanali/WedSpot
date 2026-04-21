#!/bin/sh

# Set memory and startup optimizations for Render's free tier
JAVA_OPTS="-Xmx128m -Xms64m -XX:TieredStopAtLevel=1"

echo "Starting API Gateway on port ${PORT:-8080}..."
# Gateway must bind to 0.0.0.0 (default) to be accessible externally
java $JAVA_OPTS -Dserver.port=${PORT:-8080} -jar api-gateway.jar &

# Small gap to prioritize Gateway's port binding
sleep 2

echo "Starting internal Service Registry on 127.0.0.1:8761..."
java $JAVA_OPTS -Dserver.address=127.0.0.1 -jar service-registry.jar &

echo "Starting internal Auth Service on 127.0.0.1:8081..."
java $JAVA_OPTS -Dserver.address=127.0.0.1 -jar auth-service.jar &

wait