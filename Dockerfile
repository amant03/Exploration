FROM eclipse-temurin:17-jdk

WORKDIR /app

# Copy only backend files into /app
COPY backend/ /app/

# Ensure mvnw is executable
RUN chmod +x mvnw

# Build the project
RUN ./mvnw clean package -DskipTests

# Run the application
CMD ["java", "-jar", "target/demo-0.0.1-SNAPSHOT.jar"]
