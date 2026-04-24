# Job Portal Full Stack Project

A beginner-friendly full-stack job portal application.

**Repository:** https://github.com/Pahul1105/FSD_Mini_Project

## Tech Stack

- **Frontend:** React JS
- **Backend:** Java JSP + Servlet
- **Architecture:** MVC
- **Database:** MySQL

## 1. Project Goal

We converted a small static job portal idea into a simple dynamic full-stack project.

User side:

- View job listings from database
- Search jobs by title or location
- Apply for a job

Admin side:

- Add job
- Delete job
- View all jobs

## 2. Folder Structure

```text
frontend/
├── backend/
│   ├── src/com/jobportal/controller/
│   ├── src/com/jobportal/dao/
│   ├── src/com/jobportal/model/
│   ├── src/com/jobportal/util/
│   └── WebContent/
├── database/
│   └── job_portal.sql
├── public/
├── src/
│   ├── components/
│   │   ├── JobCard.js
│   │   ├── JobList.js
│   │   └── Navbar.js
│   ├── pages/
│   │   ├── AdminPanel.js
│   │   ├── Home.js
│   │   └── Jobs.js
│   ├── services/
│   │   └── api.js
│   ├── App.js
│   ├── index.css
│   └── index.js
├── package.json
└── README.md
```

### Viva Questions

1. Why did you separate `components` and `pages`?
   Components are reusable UI parts, while pages represent full screens.
2. Why is backend in a separate folder?
   React and Java backend run separately, so keeping them separate makes the project clear.
3. What is inside `services/api.js`?
   It stores frontend code for calling backend APIs.

##
In this project we use:

- Functional components
- `useState` for changing form data
- `useEffect` for loading jobs when page opens
- React Router for navigation

### How React Part Works

- `Navbar` gives links to Home, Jobs, and Admin
- `Home` has hero section and search form
- `Jobs` page loads jobs from backend and allows apply
- `AdminPanel` adds and deletes jobs
- `JobList` and `JobCard` make the UI reusable

### Viva Questions

1. What is a functional component?
   It is a JavaScript function that returns JSX UI.
2. What is `useState`?
   It is a React hook used to store changing data like input values.
3. What is `useEffect`?
   It runs code after the component renders, usually for API calls or loading data.

### Home

Purpose:

- Shows hero section
- Accepts search by title and location
- Redirects user to jobs page with query values

### JobList and JobCard

Purpose:

- `JobList` loops through all jobs
- `JobCard` shows one job

### Jobs Page

Purpose:

- Calls backend API
- Displays jobs from database
- Allows user to apply

### AdminPanel

Purpose:

- Adds new jobs
- Deletes old jobs
- Shows current jobs for admin

### Viva Questions

1. Why use small components?
   Small components make code easier to read, reuse, and maintain.
2. What is JSX?
   JSX is HTML-like syntax used inside React.
3. Why is `JobCard` useful?
   Because the same card design can be repeated for each job.

## 5. Step 3: API Connection Between React and Servlet

React connects to Java backend using HTTP requests.

Frontend file:

- `src/services/api.js`

Base URL:
`

Example response:

```json
{
  "jobs": [
    {
      "id": 1,
      "title": "Java Developer",
      "company": "NextGen Soft",
      "location": "Noida",
      "description": "Create backend features using JSP, Servlet and MySQL."
    }
  ]
}
```

Apply request example:

```json
{
  "jobId": 1,
  "applicantName": "Rahul"
}
```

### Viva Questions

1. How does React connect to backend?
   React sends HTTP requests using `fetch()` and receives JSON response.
2. Why use JSON?
   JSON is simple, lightweight, and easy to read in both JavaScript and Java.
3. What is an API call?
   It is a request from frontend to backend to get or send data.

## 6. Step 4: Backend MVC Structure

MVC means:

- Model: Java classes like `Job`
- View: JSP page like `index.jsp`
- Controller: Servlets like `GetJobsServlet`

### Model
les:

- `backend/src/com/jobportal/dao/JobDAO.java`
- `backend/src/com/jobportal/dao/ApplicationDAO.java`

DAO means Data Access Object.
It handles database queries like select, insert, and delete.

### Utility

Files:

- `backend/src/com/jobportal/util/DBConnection.java`
- `backend/src/com/jobportal/util/JsonUtil.java`

`DBConnection` opens MySQL connection using JDBC.

### Controller

Files:

- `GetJobsServlet`
- `AddJobServlet`
- `DeleteJobServlet`
- `ApplyJobServlet`

Servlet receives request, calls DAO, and sends JSON response.

### View

File:

- `backend/WebContent/index.jsp`

This JSP is a simple backend landing page. Main UI is handled by React.

### Viva Questions

1. What is MVC?
   MVC is a design pattern that separates data, UI, and request handling.
2. What is a Servlet?
   A Servlet is a Java class that handles HTTP requests and responses.
3. What is JDBC?
   JDBC is Java Database Connectivity used to connect Java with a database.

## 7. Step 5: Database Design

SQL file:

- `database/job_portal.sql`

### Jobs Table

- `id` primary key
- `title` job title
- `company` company name
- `location` job location
- `description` job details

### Applications Table

- `id` primary key
- `job_id` connects application with job
- 
CREATE TABLE jobs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    company VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE applications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    job_id INT NOT NULL,
    applicant_name VARCHAR(100) NOT NULL,
    FOREIGN KEY (job_id) REFERENCES jobs(id)
);
```

### Viva Questions

1. Why is `id` auto increment?
   So each record gets a unique number automatically.
2. Why use foreign key in applications table?
   It connects each application to a valid job.
3. What is the use of MySQL here?
   MySQL stores jobs and job applications permanently.

## 8. Step 6: How to Run Frontend

Install dependencies:

```bash
npm install
```

Run React app:

```bash
npm start
```

Frontend opens at:

```text
http://localhost:3000
```

If needed, create `.env`:

```env
REACT_APP_API_BASE_URL=http://localhost:8080/jobportal/api
```

### Viva Questions

1. Open Eclipse IDE for Enterprise Java.
2. Create or import a Dynamic Web Project named `jobportal`.
3. Copy backend source files from this repo into the project.
4. Add MySQL JDBC jar to project build path.
5. Configure Apache Tomcat server in Eclipse.
6. Make sure context path is `jobportal`.
7. Run project on server.

Backend URL:

```text
http://localhost:8080/jobportal
```

API example:

```text
http://localhost:8080/jobportal/api/jobs
```

### Viva Questions

1. Why do we use Tomcat?
   Tomcat runs Servlet and JSP applications.
2. What is the context path?
   Start backend server.
5. Start React frontend.

Current DB connection file:

- `backend/src/com/jobportal/util/DBConnection.java`

Important line:

```java
private static final String URL = "jdbc:mysql://localhost:3306/job_portal";
```

### Viva Questions

1. Where do we store database connection code?
   In `DBConnection.java`.
2. What does `3306` mean?
   It is the default MySQL port number.
3. What happens if DB username or password is wrong?
   The backend will fail to connect with the database.

## 11. Step 9: Section-by-Section Code Explanation

### React

- `App.js` handles routing
- `useState` stores form values and messages
- `useEffect` loads jobs from backend
- `JobList` maps array of jobs and displays cards


- `JobDAO` performs job SQL operations
- `ApplicationDAO` stores job applications

### Database

- `jobs` table stores job details
- `applications` table stores who applied

## 12. Step 10: 1-Minute Project Explanation

This is a simple full-stack job portal project made using React JS, Java Servlet, JSP, and MySQL. The frontend is built in React with components like Navbar, Home, JobList, JobCard, and AdminPanel. The backend follows MVC architecture, where Servlet works as controller, Java classes work as model, and JSP is used as a simple view. MySQL stores job details and applications. Users can view jobs, search by title or location, and apply for a job. Admin can add and delete jobs. React connects to the backend using HTTP requests and receives JSON data.

## 13. Step 11: 3-Minute Project Explanation

My project is a beginner-level full-stack job portal. I first designed the frontend in React JS because React makes UI easy using reusable components. I created Navbar for navigation, Home for hero section and search, JobList and JobCard for showing jobs, and AdminPanel for admin actions. I used `useState` to manage form inputs and messages. I used `useEffect` to load job data from the backend when the jobs page opens.

On the backend side, I used Java JSP and Servlet with MVC pattern. In MVC, Model stores data, View shows data, and Controller handles request flow. Here, `Job.java` is the model, JSP is a very small view, and Servlets are controllers. I created `GetJobsServlet`, `AddJobServlet`, `DeleteJobServlet`, and `ApplyJobServlet`. These servlets call DAO classes. DAO means Data Access Object, and it contains SQL logic. `JobDAO` handles job insert, delete, and fetch operations. `ApplicationDAO` stores job applications.

For database, I used MySQL with two tables: `jobs` and `applications`. `jobs` stores all job information and `applications` stores which user applied to which job. React frontend sends HTTP requests using `fetch()`, and backend returns JSON. This project is simple, clean, and suitable for viva because every part follows clear flow: React form -> Servlet -> DAO -> MySQL -> JSON response -> React UI update.

## 14. Important Notes

- This project is intentionally simple and student-friendly.
- JSON parsing in servlets is kept basic for learning purpose.
- For production, we would add validation, login, better error handling, and stronger JSON libraries.
