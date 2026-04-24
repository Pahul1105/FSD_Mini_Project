package com.jobportal.controller;

import com.jobportal.dao.JobDAO;
import com.jobportal.model.Job;
import com.jobportal.util.JsonUtil;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

// What is a Servlet?
// A Servlet is a Java class that handles HTTP requests (like GET and POST)
// sent by the browser or frontend (React in our case).
// It works as a CONTROLLER in the MVC pattern.

// This servlet handles GET requests to /api/jobs
// React calls this API to show the job list on the Jobs page.
@WebServlet("/api/jobs")
public class GetJobsServlet extends HttpServlet {

    // We create a JobDAO object to talk to the database.
    // DAO stands for Data Access Object — it contains all SQL logic.
    private final JobDAO jobDAO = new JobDAO();

    // doGet runs when the browser sends a GET request.
    // For example: GET /api/jobs?search=java&location=noida
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        // Set response type to JSON so React can understand it.
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        // CORS headers let the React app (running on port 3000)
        // talk to this backend (running on port 8080).
        response.setHeader("Access-Control-Allow-Origin", "*");

        // Read search and location values from the URL query string.
        String search = request.getParameter("search");
        String location = request.getParameter("location");

        // Ask the DAO to fetch matching jobs from MySQL.
        List<Job> jobs = jobDAO.getAllJobs(search, location);
        PrintWriter out = response.getWriter();

        // Build a JSON string manually.
        // In a real project we would use a library like Gson,
        // but here we keep it simple for learning.
        StringBuilder json = new StringBuilder();
        json.append("{\"jobs\":[");

        for (int i = 0; i < jobs.size(); i++) {
            Job job = jobs.get(i);
            json.append("{");
            json.append("\"id\":").append(job.getId()).append(",");
            json.append("\"title\":\"").append(JsonUtil.escape(job.getTitle())).append("\",");
            json.append("\"company\":\"").append(JsonUtil.escape(job.getCompany())).append("\",");
            json.append("\"location\":\"").append(JsonUtil.escape(job.getLocation())).append("\",");
            json.append("\"description\":\"").append(JsonUtil.escape(job.getDescription())).append("\"");
            json.append("}");

            if (i < jobs.size() - 1) {
                json.append(",");
            }
        }

        json.append("]}");
        out.print(json.toString());
    }

    // doOptions handles the "preflight" request.
    // When React sends a POST or GET with special headers,
    // the browser first sends an OPTIONS request to check if the server allows it.
    // Without this method, CORS will block the request.
    @Override
    protected void doOptions(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setStatus(HttpServletResponse.SC_OK);
    }
}
