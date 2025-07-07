FROM eclipse-temurin:17-jdk

WORKDIR /app

# Copy only backend folder contents into container
COPY backend/ .

# Make mvnw executable
RUN chmod +x mvnw

# Build the Spring Boot app
RUN ./mvnw clean package -DskipTests

# Run the built JAR
CMD ["java", "-jar", "target/demo-0.0.1-SNAPSHOT.jar"]
