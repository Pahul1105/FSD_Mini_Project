package com.jobportal.util;

import java.sql.Connection;
import java.sql.DriverManager;

// What is JDBC?
// JDBC stands for Java Database Connectivity.
// It is a Java API that lets us connect to and interact with databases.
// We use DriverManager.getConnection() to open a connection to MySQL.

// This class provides a single static method to get a database connection.
// All DAO classes use this method to talk to MySQL.

public class DBConnection {

    // Database connection details.
    // URL tells Java where the MySQL database is running and which database to use.
    // Change USERNAME and PASSWORD to match your MySQL setup.
    private static final String URL = "jdbc:mysql://localhost:3306/job_portal";
    private static final String USERNAME = "root";
    private static final String PASSWORD = "root";

    // This method creates and returns a new MySQL connection.
    public static Connection getConnection() {
        Connection connection = null;

        try {
            // Load the MySQL JDBC driver class.
            // This tells Java which driver to use for MySQL.
            Class.forName("com.mysql.cj.jdbc.Driver");

            // Open a connection using URL, username, and password.
            connection = DriverManager.getConnection(URL, USERNAME, PASSWORD);
        } catch (Exception e) {
            // If connection fails, print the error.
            e.printStackTrace();
        }

        return connection;
    }
}
