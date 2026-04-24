package com.jobportal.dao;

import com.jobportal.model.Job;
import com.jobportal.util.DBConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

// What is DAO?
// DAO stands for Data Access Object.
// It is a class that contains all the SQL queries for one table.
// This keeps database code separate from the servlet (controller).
// JobDAO handles all operations on the "jobs" table in MySQL.

public class JobDAO {

    // This method fetches jobs from the database.
    // It supports search by title and location using SQL LIKE.
    // If search or location is empty, it returns all jobs.
    public List<Job> getAllJobs(String search, String location) {
        List<Job> jobs = new ArrayList<Job>();

        // SQL query with LIKE for flexible searching.
        // The % symbol means "match anything before or after".
        String sql = "SELECT * FROM jobs WHERE title LIKE ? AND location LIKE ? ORDER BY id DESC";

        // try-with-resources: Connection and PreparedStatement are closed automatically.
        // This prevents memory leaks.
        try (Connection connection = DBConnection.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {

            // If search is null, we use empty string so LIKE matches everything.
            String titleValue = "%" + (search == null ? "" : search) + "%";
            String locationValue = "%" + (location == null ? "" : location) + "%";

            // PreparedStatement uses ? placeholders to prevent SQL injection.
            statement.setString(1, titleValue);
            statement.setString(2, locationValue);

            // Execute the query and get results.
            ResultSet resultSet = statement.executeQuery();

            // Loop through each row and create a Job object.
            while (resultSet.next()) {
                Job job = new Job();
                job.setId(resultSet.getInt("id"));
                job.setTitle(resultSet.getString("title"));
                job.setCompany(resultSet.getString("company"));
                job.setLocation(resultSet.getString("location"));
                job.setDescription(resultSet.getString("description"));
                jobs.add(job);
            }
        } catch (Exception e) {
            // Print error details to the console for debugging.
            e.printStackTrace();
        }

        return jobs;
    }

    // This method inserts a new job into the database.
    // It is called by AddJobServlet when admin adds a job.
    public boolean addJob(Job job) {
        String sql = "INSERT INTO jobs(title, company, location, description) VALUES(?, ?, ?, ?)";

        try (Connection connection = DBConnection.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setString(1, job.getTitle());
            statement.setString(2, job.getCompany());
            statement.setString(3, job.getLocation());
            statement.setString(4, job.getDescription());

            // executeUpdate returns number of rows affected.
            // If it is more than 0, the insert was successful.
            return statement.executeUpdate() > 0;
        } catch (Exception e) {
            e.printStackTrace();
        }

        return false;
    }

    // This method deletes a job by its id.
    // It is called by DeleteJobServlet when admin removes a job.
    public boolean deleteJob(int id) {
        String sql = "DELETE FROM jobs WHERE id = ?";

        try (Connection connection = DBConnection.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setInt(1, id);
            return statement.executeUpdate() > 0;
        } catch (Exception e) {
            e.printStackTrace();
        }

        return false;
    }
}
