package com.jobportal.controller;

import com.jobportal.dao.JobDAO;
import com.jobportal.model.Job;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;

// This servlet handles adding a new job to the database.
// React sends a POST request with JSON data like:
// { "title": "...", "company": "...", "location": "...", "description": "..." }
// The servlet reads the JSON, creates a Job object, and saves it using DAO.
@WebServlet("/api/jobs/add")
public class AddJobServlet extends HttpServlet {

    // DAO object to perform database insert operation.
    private final JobDAO jobDAO = new JobDAO();

    // doPost runs when React sends a POST request to /api/jobs/add.
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "*");

        // Read the JSON body sent by React.
        String body = readRequestBody(request);

        // Extract values from the JSON string.
        // We use a simple helper method instead of a library.
        Job job = new Job();
        job.setTitle(getJsonValue(body, "title"));
        job.setCompany(getJsonValue(body, "company"));
        job.setLocation(getJsonValue(body, "location"));
        job.setDescription(getJsonValue(body, "description"));

        // Ask the DAO to insert this job into the MySQL database.
        boolean success = jobDAO.addJob(job);
        PrintWriter out = response.getWriter();

        if (success) {
            out.print("{\"message\":\"Job added successfully\"}");
        } else {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.print("{\"message\":\"Failed to add job\"}");
        }
    }

    // This method handles CORS preflight requests.
    // The browser sends an OPTIONS request before a POST with JSON body.
    // We must respond with the correct CORS headers, or the request will fail.
    @Override
    protected void doOptions(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setStatus(HttpServletResponse.SC_OK);
    }

    // Helper: reads the full request body as a string.
    // React sends JSON in the body of a POST request.
    private String readRequestBody(HttpServletRequest request) throws IOException {
        StringBuilder body = new StringBuilder();
        BufferedReader reader = request.getReader();
        String line;

        while ((line = reader.readLine()) != null) {
            body.append(line);
        }

        return body.toString();
    }

    // Helper: extracts a string value from a simple JSON string.
    // For example, from {"title":"Java Dev"} it can extract "Java Dev" for key "title".
    // This is a very basic parser — in real projects we would use Gson or Jackson.
    private String getJsonValue(String json, String key) {
        String searchText = "\"" + key + "\":\"";
        int start = json.indexOf(searchText);

        if (start == -1) {
            return "";
        }

        start = start + searchText.length();
        int end = json.indexOf("\"", start);

        if (end == -1) {
            return "";
        }

        return json.substring(start, end);
    }
}
