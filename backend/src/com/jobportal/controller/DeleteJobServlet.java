package com.jobportal.controller;

import com.jobportal.dao.JobDAO;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;

// This servlet deletes a job from the database.
// React sends a POST request like: /api/jobs/delete?id=3
// The servlet reads the id from the URL and asks the DAO to delete it.
@WebServlet("/api/jobs/delete")
public class DeleteJobServlet extends HttpServlet {

    // DAO object for database delete operation.
    private final JobDAO jobDAO = new JobDAO();

    // doPost handles the delete request from React.
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "*");

        // Read the job id from the URL query parameter.
        int id = Integer.parseInt(request.getParameter("id"));

        // Ask DAO to delete this job from MySQL.
        boolean success = jobDAO.deleteJob(id);

        PrintWriter out = response.getWriter();

        if (success) {
            out.print("{\"message\":\"Job deleted successfully\"}");
        } else {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.print("{\"message\":\"Failed to delete job\"}");
        }
    }

    // Handle CORS preflight request from the browser.
    @Override
    protected void doOptions(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setStatus(HttpServletResponse.SC_OK);
    }
}
