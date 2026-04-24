CREATE DATABASE job_portal;

USE job_portal;

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

INSERT INTO jobs (title, company, location, description) VALUES
('Frontend Developer', 'ABC Technologies', 'Delhi', 'Work on website pages using HTML, CSS and React.'),
('Java Developer', 'NextGen Soft', 'Noida', 'Create backend features using JSP, Servlet and MySQL.'),
('UI Designer', 'Bright Solutions', 'Pune', 'Design simple user friendly portal layouts.');
