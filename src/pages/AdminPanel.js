import { useEffect, useState } from "react";
import JobList from "../components/JobList";
import PortalSummary from "../components/PortalSummary";
import {
  addJob,
  deleteJob,
  getApplicationCountByJobId,
  getApplications,
  getJobs,
  getPortalStats,
} from "../services/portalStore";

function AdminPanel() {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [message, setMessage] = useState("");
  const [jobForm, setJobForm] = useState({
    title: "",
    company: "",
    location: "",
    type: "",
    salary: "",
    description: "",
  });

  function loadPortalData() {
    setJobs(getJobs());
    setApplications(getApplications());
  }

  useEffect(() => {
    loadPortalData();
  }, []);

  const stats = getPortalStats();

  function handleChange(event) {
    setJobForm({
      ...jobForm,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = addJob(jobForm);
      setMessage(response.message);
      setJobForm({
        title: "",
        company: "",
        location: "",
        type: "",
        salary: "",
        description: "",
      });
      loadPortalData();
    } catch (error) {
      setMessage(error.message);
    }
  }

  function handleDelete(jobId) {
    const response = deleteJob(jobId);
    setMessage(response.message);
    loadPortalData();
  }

  return (
    <main className="page">
      <section className="section-card">
        <div className="section-heading">
          <div>
            <p className="section-tag">Admin Dashboard</p>
            <h1>Manage jobs and monitor applications</h1>
          </div>
        </div>

        <PortalSummary
          items={[
            {
              label: "Jobs",
              value: stats.totalJobs,
              text: "Open positions posted in this portal.",
            },
            {
              label: "Applications",
              value: stats.totalApplications,
              text: "Applications received from job seekers.",
            },
            {
              label: "Users",
              value: stats.totalUsers,
              text: "Registered user accounts in the portal.",
            },
          ]}
        />
      </section>

      <div className="admin-layout">
        <section className="section-card form-card">
          <p className="section-tag">Add Job</p>
          <h2>Create a new opening</h2>

          <form onSubmit={handleSubmit} className="simple-form">
            <label>
              Job Title
              <input
                type="text"
                name="title"
                value={jobForm.title}
                onChange={handleChange}
                placeholder="Frontend Developer"
                required
              />
            </label>

            <label>
              Company
              <input
                type="text"
                name="company"
                value={jobForm.company}
                onChange={handleChange}
                placeholder="ABC Technologies"
                required
              />
            </label>

            <label>
              Location
              <input
                type="text"
                name="location"
                value={jobForm.location}
                onChange={handleChange}
                placeholder="Delhi"
                required
              />
            </label>

            <label>
              Job Type
              <input
                type="text"
                name="type"
                value={jobForm.type}
                onChange={handleChange}
                placeholder="Full Time"
                required
              />
            </label>

            <label>
              Salary
              <input
                type="text"
                name="salary"
                value={jobForm.salary}
                onChange={handleChange}
                placeholder="6 LPA"
                required
              />
            </label>

            <label>
              Description
              <textarea
                name="description"
                value={jobForm.description}
                onChange={handleChange}
                placeholder="Write short job details"
                rows="5"
                required
              />
            </label>

            <button className="primary-button" type="submit">
              Add Job
            </button>
          </form>

          {message ? <p className="message-box">{message}</p> : null}
        </section>

        <section className="section-card">
          <div className="section-heading">
            <div>
              <p className="section-tag">All Jobs</p>
              <h2>Current listings</h2>
            </div>
          </div>

          <JobList
            jobs={jobs}
            emptyMessage="No jobs are available right now."
            showApplyButton={false}
            showDeleteButton
            onDeleteClick={handleDelete}
            getApplicationCount={getApplicationCountByJobId}
          />
        </section>
      </div>

      <section className="section-card">
        <div className="section-heading">
          <div>
            <p className="section-tag">Applications</p>
            <h2>Recent candidate applications</h2>
          </div>
        </div>

        {applications.length === 0 ? (
          <p className="section-note">No applications received yet.</p>
        ) : (
          <div className="table-card">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Job Title</th>
                  <th>Applied On</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((application) => (
                  <tr key={application.id}>
                    <td>{application.applicantName}</td>
                    <td>{application.applicantEmail}</td>
                    <td>{application.jobTitle}</td>
                    <td>{application.appliedAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}

export default AdminPanel;
