FROM openjdk:19
ENV ENVIRONMENT=prod
LABEL authors="steffenrothenberg"
ADD backend/target/app.jar app.jar
CMD [ "sh", "-c", "java -jar /app.jar" ]