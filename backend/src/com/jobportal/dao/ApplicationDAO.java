package com.jobportal.dao;

import com.jobportal.util.DBConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;

// ApplicationDAO handles database operations for the "applications" table.
// When a user applies for a job, this DAO inserts a record with
// the job ID and the applicant's name.

public class ApplicationDAO {

    // This method saves a job application into the database.
    // It is called by ApplyJobServlet.
    public boolean applyForJob(int jobId, String applicantName) {
        String sql = "INSERT INTO applications(job_id, applicant_name) VALUES(?, ?)";

        try (Connection connection = DBConnection.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {

            // Set the values for the two ? placeholders.
            statement.setInt(1, jobId);
            statement.setString(2, applicantName);

            // If one row was inserted, return true.
            return statement.executeUpdate() > 0;
        } catch (Exception e) {
            e.printStackTrace();
        }

        return false;
    }
}
