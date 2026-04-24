# Backend File Documentation

This document explains the Java backend structure file by file.

## Backend Theory First

### What is MVC?

MVC stands for:

- Model
- View
- Controller

Meaning:

- Model stores data structure
- View shows output
- Controller handles requests and controls flow

### What is a Servlet?

A Servlet is a Java class that handles HTTP requests and responses. In this project, servlets act as controllers.

### What is JDBC?

JDBC means Java Database Connectivity. It is used to connect Java programs to databases like MySQL.

### What is DAO?

DAO means Data Access Object. DAO classes contain SQL queries and database-related logic.

## Backend Flow

React request -> Servlet controller -> DAO -> MySQL -> Servlet response -> React UI

## File By File Explanation

### `backend/src/com/jobportal/model/Job.java`

Use:

- Model class for one job

Code idea:

- Contains private fields:
  `id`, `title`, `company`, `location`, `description`
- Has default constructor
- Has parameterized constructor
- Has getters and setters

Theory:

- This is a JavaBean-style model class
- Encapsulation is used by keeping variables private

Viva questions:

1. Why are fields private?
   To follow encapsulation and control access using getters and setters.
2. Why use a model class?
   To represent one table row as an object.

### `backend/src/com/jobportal/util/DBConnection.java`

Use:

- Opens MySQL database connection

Code idea:

- Stores database URL, username, and password
- Loads MySQL driver
- Returns connection using `DriverManager.getConnection`

Theory:

- Centralized DB connection code avoids repetition
- JDBC driver acts as bridge between Java and MySQL

Viva questions:

1. Why keep DB connection in a separate class?
   So multiple DAO classes can reuse it.
2. What does `Class.forName` do?
   It loads the MySQL JDBC driver class.

### `backend/src/com/jobportal/util/JsonUtil.java`

Use:

- Escapes special characters before creating JSON manually

Code idea:

- Replaces backslash, quote, new line, and carriage return

Theory:

- Since JSON is built manually here, escaping is required
- Otherwise the JSON format may break

Viva questions:

1. Why is escaping needed?
   Because quotes or special characters can make JSON invalid.
2. Why not use Gson here?
   This project keeps logic simple for learning.

### `backend/src/com/jobportal/dao/JobDAO.java`

Use:

- Handles SQL operations for jobs table

Code idea:

- `getAllJobs(search, location)` fetches jobs using SQL `LIKE`
- `addJob(job)` inserts job record
- `deleteJob(id)` deletes a job

Theory:

- DAO separates SQL from controller logic
- `PreparedStatement` improves safety and readability

Viva questions:

1. Why use `PreparedStatement`?
   To safely send values into SQL query and avoid SQL injection.
2. Why use `LIKE` in search?
   To allow partial matching of title and location.

### `backend/src/com/jobportal/dao/ApplicationDAO.java`

Use:

- Handles SQL insert for job applications

Code idea:

- `applyForJob(jobId, applicantName)` inserts application row

Theory:

- Each table can have its own DAO class for cleaner architecture

Viva questions:

1. What does this DAO save?
   It saves job application records.
2. Why separate it from `JobDAO`?
   Because applications and jobs are different tables and responsibilities.

### `backend/src/com/jobportal/controller/GetJobsServlet.java`

Use:

- Handles GET request for jobs API

Code idea:

- Reads `search` and `location` from request parameters
- Calls `jobDAO.getAllJobs`
- Builds JSON response manually
- Adds CORS headers
- Handles `OPTIONS` preflight request

Theory:

- Works as Controller in MVC
- Converts database objects into HTTP JSON response

Viva questions:

1. Why does this servlet use `doGet`?
   Because it is reading data.
2. Why are CORS headers needed?
   Because frontend and backend may run on different ports.

### `backend/src/com/jobportal/controller/AddJobServlet.java`

Use:

- Handles adding a new job

Code idea:

- Reads JSON body from React
- Extracts `title`, `company`, `location`, `description`
- Creates `Job` object
- Saves it through `jobDAO.addJob`

Theory:

- `doPost` is used for creating new data
- Request body is read using `BufferedReader`

Viva questions:

1. Why is `doPost` used here?
   Because new data is being inserted.
2. What is request body?
   It is the data sent by frontend inside the HTTP request.

### `backend/src/com/jobportal/controller/DeleteJobServlet.java`

Use:

- Handles deleting a job

Code idea:

- Reads `id` from URL parameter
- Calls DAO delete method
- Sends JSON success or failure response

Theory:

- Delete action is controlled by servlet, actual SQL is handled by DAO

Viva questions:

1. From where does this servlet read job id?
   From request parameter in the URL.
2. Why return JSON message after delete?
   So frontend can show result to user.

### `backend/src/com/jobportal/controller/ApplyJobServlet.java`

Use:

- Handles job application submission

Code idea:

- Reads JSON body
- Extracts `jobId` and `applicantName`
- Calls `ApplicationDAO`
- Sends JSON response

Theory:

- Similar controller pattern as AddJobServlet
- Shows how frontend sends data to backend for storing

Viva questions:

1. What does this servlet save?
   It saves a user job application.
2. Why does this method parse both text and number?
   Because `applicantName` is text and `jobId` is a number.

### `backend/WebContent/index.jsp`

Use:

- Simple backend view page

Code idea:

- Shows that backend is running
- Tells user to use servlet APIs for React

Theory:

- JSP stands for JavaServer Pages
- JSP is the View part of MVC in this project

Viva questions:

1. What is JSP used for here?
   It acts as a minimal view page.
2. Why is React still main UI?
   Because this project uses React for frontend and JSP only minimally.

### `backend/WebContent/WEB-INF/web.xml`

Use:

- Deployment descriptor for the web app

Code idea:

- Sets display name
- Sets `index.jsp` as welcome file

Theory:

- `web.xml` is a traditional Java web configuration file
- Even with annotation-based servlets, it is still useful for global settings

Viva questions:

1. What is a welcome file?
   It is the page opened first when project root is visited.
2. Why is `web.xml` important?
   It helps configure the web application.

### `backend/README.md`

Use:

- Small backend usage note

Code idea:

- Lists backend API paths
- Notes that Tomcat and MySQL setup are required

Theory:

- Documentation is important so another person can run the backend correctly

Viva questions:

1. Why write backend documentation?
   To explain setup and endpoints clearly.
2. What does this file mainly provide?
   API path summary and setup reminder.

## Backend Summary

The backend is designed using beginner MVC:

- Model: `Job.java`
- View: `index.jsp`
- Controller: Servlet files
- Database layer: DAO classes
- Utility layer: `DBConnection`, `JsonUtil`

Even though the current live frontend uses browser storage, this backend structure is still correct for viva explanation and future integration with MySQL.
