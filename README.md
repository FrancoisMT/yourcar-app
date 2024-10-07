# yourcar-app
POC of a chat system between to user : customer & admin 

## Setting up the Database
Verify the presence of a MariaDB database instance installed and set up correctly on your system

### Environment Variables for Database
To run this project, you must configure the following environment variables:
- `DATASOURCE_URL`: The database connection URL.   (ex : jdbc:mariadb://localhost:3306/your-database)
- `DATASOURCE_USERNAME`: The username for the database.  (ex: root)
- `DATASOURCE_PASSWORD`: The password for the database.  (ex : my-db-pwd)

### Database script 
- Script for database creation : back/yourcar/src/main/resources/scripts/database/schema.sql
- (Hibernate is used for automatic table creation)

## Installing the Application
1. Make sure you've installed all needed dependencies: Java, Node.js, Maven.
2. Clone this repo to your local environment.
3. Move to the back-end project folder and execute `mvn clean install` to fetch dependencies and build the project.
4. Go to the front-end project folder and use `npm install` to fetch front-end dependencies.

## Launching the Application
1. In the back-end project folder, run `mvn spring-boot:run` to initiate the back-end server.
2. In the front-end project folder, use `ng serve` to start the front-end interface.

## Main technologies used in the development of the mdd App :
- Angular CLI v17
- Java 21
- SpringBoot 3.3.4
- JUnit
- Mockito
- Jest
