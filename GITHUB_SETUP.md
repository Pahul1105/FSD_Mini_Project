# Job Portal Full Stack Project - GitHub Setup Guide

**Repository:** https://github.com/Pahul1105/FSD_Mini_Project

## Quick Setup

### Prerequisites
- Node.js and npm
- Java JDK
- MySQL
- Apache Tomcat 9.x
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/Pahul1105/FSD_Mini_Project.git
cd FSD_Mini_Project/frontend
```

### 2. Setup Frontend (React)
```bash
# Install dependencies
npm install

# Set environment variable (optional, if needed)
# Create .env file with:
# REACT_APP_API_BASE_URL=http://localhost:8080/jobportal/api

# Run React app
npm start
```
Frontend will be available at: `http://localhost:3000`

### 3. Setup Database
```bash
# Open MySQL
mysql -u root -p

# Run the SQL file
source database/job_portal.sql;
```

### 4. Setup Backend (Java/Tomcat)
1. Open Eclipse IDE for Enterprise Java
2. Import the `frontend/backend` folder as a Dynamic Web Project
3. Name it `jobportal`
4. Add MySQL JDBC connector jar to build path
5. Update database credentials in `backend/src/com/jobportal/util/DBConnection.java`
6. Configure Tomcat server with context path `jobportal`
7. Deploy and run

Backend API will be available at: `http://localhost:8080/jobportal/api`

## Project Structure

```
frontend/
├── src/                      # React source code
│   ├── components/          # Reusable React components
│   ├── pages/               # Page components
│   ├── services/            # API calls
│   └── App.js
├── backend/                  # Java JSP + Servlet backend
│   ├── src/com/jobportal/
│   │   ├── controller/      # Servlets (GetJobsServlet, etc.)
│   │   ├── dao/             # Database access objects
│   │   ├── model/           # Model classes (Job, Application)
│   │   └── util/            # Utilities (DBConnection)
│   └── WebContent/
├── database/
│   └── job_portal.sql       # Database schema and sample data
└── package.json
```

## API Endpoints

- `GET /jobportal/api/jobs` - Get all jobs with search filter
- `POST /jobportal/api/jobs/add` - Add new job
- `POST /jobportal/api/jobs/delete?id=1` - Delete job
- `POST /jobportal/api/apply` - Apply for a job

## Key Features

**User Features:**
- View job listings from database
- Search jobs by title or location
- Apply for jobs

**Admin Features:**
- Add new job postings
- Delete job postings
- View all jobs

## Technologies Used

| Layer | Technology |
|-------|-----------|
| Frontend | React JS, React Router |
| Backend | Java Servlet, JSP |
| Architecture | MVC (Model-View-Controller) |
| Database | MySQL |
| Server | Apache Tomcat |

## Troubleshooting

### React won't connect to backend
- Ensure Tomcat is running on port 8080
- Check `REACT_APP_API_BASE_URL` in `.env` or `api.js`
- Verify CORS is not blocking requests

### Database connection fails
- Check MySQL is running
- Verify database name is `job_portal`
- Update username/password in `DBConnection.java`
- Ensure MySQL JDBC jar is in Tomcat lib folder

### Tomcat deployment issues
- Clear Tomcat work directory: `apache-tomcat-9.0.117/work/`
- Ensure context path is exactly `jobportal`
- Check Tomcat logs for errors

## Documentation

Detailed documentation is available in the `docs/` folder:
- `01-react-files.md` - Frontend structure explanation
- `02-backend-files.md` - Backend structure explanation  
- `03-misc-files.md` - Configuration and setup details
- `PROJECT_REPORT.md` - Complete project report

## Notes

- This is a beginner-friendly, educational project
- Code is intentionally kept simple for learning purposes
- For production use, add authentication, validation, and error handling
- Follow MVC pattern for better code organization

## License

This project is open source and available for educational purposes.

---

For issues or questions, please open an issue on GitHub: https://github.com/Pahul1105/FSD_Mini_Project/issues
