package com.jobportal.controller;

import com.jobportal.dao.ApplicationDAO;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;

// This servlet handles job applications.
// When a user clicks "Apply" on the Jobs page, React sends a POST request
// with JSON data like: { "jobId": 1, "applicantName": "Rahul" }
// The servlet saves this into the applications table in MySQL.
@WebServlet("/api/apply")
public class ApplyJobServlet extends HttpServlet {

    // DAO for application-related database operations.
    private final ApplicationDAO applicationDAO = new ApplicationDAO();

    // doPost runs when React sends the apply request.
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "*");

        // Read the JSON body from the request.
        String body = readRequestBody(request);

        // Extract jobId and applicantName from the JSON.
        int jobId = Integer.parseInt(getJsonValue(body, "jobId"));
        String applicantName = getJsonValue(body, "applicantName");

        // Save the application in the database using DAO.
        boolean success = applicationDAO.applyForJob(jobId, applicantName);
        PrintWriter out = response.getWriter();

        if (success) {
            out.print("{\"message\":\"Application submitted successfully\"}");
        } else {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.print("{\"message\":\"Failed to submit application\"}");
        }
    }

    // Handle CORS preflight OPTIONS request.
    // Without this, the browser will block the POST request from React.
    @Override
    protected void doOptions(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setStatus(HttpServletResponse.SC_OK);
    }

    // Helper: reads the full body of the HTTP request.
    private String readRequestBody(HttpServletRequest request) throws IOException {
        StringBuilder body = new StringBuilder();
        BufferedReader reader = request.getReader();
        String line;

        while ((line = reader.readLine()) != null) {
            body.append(line);
        }

        return body.toString();
    }

    // Helper: extracts a value from a simple JSON string.
    // It handles both string values like "applicantName":"Rahul"
    // and number values like "jobId":1
    private String getJsonValue(String json, String key) {
        String numberSearch = "\"" + key + "\":";
        String textSearch = "\"" + key + "\":\"";

        // Check if value is a string (surrounded by quotes)
        if (json.contains(textSearch)) {
            int start = json.indexOf(textSearch) + textSearch.length();
            int end = json.indexOf("\"", start);
            return json.substring(start, end);
        }

        // Otherwise, value is a number
        int start = json.indexOf(numberSearch);

        if (start == -1) {
            return "0";
        }

        start = start + numberSearch.length();
        int end = json.indexOf(",", start);

        if (end == -1) {
          end = json.indexOf("}", start);
        }

        return json.substring(start, end).trim();
    }
}
