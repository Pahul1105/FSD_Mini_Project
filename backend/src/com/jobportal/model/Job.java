package com.jobportal.model;

// What is a Model?
// In MVC, a Model is a Java class that represents the data.
// This Job class stores information about one job.
// It has fields like id, title, company, location, and description.
// These fields match the columns in the "jobs" table in MySQL.

public class Job {
    // These are private fields. We use getters and setters to access them.
    // This is called Encapsulation — one of the key OOP concepts.
    private int id;
    private String title;
    private String company;
    private String location;
    private String description;

    // Default constructor — needed when we create a Job object
    // and set values using setters (like in AddJobServlet).
    public Job() {
    }

    // Parameterized constructor — can be used when we already have all values.
    public Job(int id, String title, String company, String location, String description) {
        this.id = id;
        this.title = title;
        this.company = company;
        this.location = location;
        this.description = description;
    }

    // Getters and Setters
    // Getter returns the value, Setter sets the value.

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
