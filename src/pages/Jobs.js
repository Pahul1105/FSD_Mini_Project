import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import JobList from "../components/JobList";
import { useAuth } from "../context/AuthContext";
import {
  applyForJob,
  getApplicationCountByJobId,
  getJobs,
} from "../services/portalStore";

function Jobs() {
  const { currentUser } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [jobs, setJobs] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchForm, setSearchForm] = useState({
    search: searchParams.get("search") || "",
    location: searchParams.get("location") || "",
  });
  const [applyForm, setApplyForm] = useState({
    applicantName: "",
    applicantEmail: currentUser?.email || "",
  });

  function loadJobs(currentSearch, currentLocation) {
    const data = getJobs(currentSearch, currentLocation);
    setJobs(data);
  }

  useEffect(() => {
    const currentSearch = searchParams.get("search") || "";
    const currentLocation = searchParams.get("location") || "";

    setSearchForm({
      search: currentSearch,
      location: currentLocation,
    });

    loadJobs(currentSearch, currentLocation);
  }, [searchParams]);

  useEffect(() => {
    setApplyForm((previousForm) => ({
      ...previousForm,
      applicantEmail: currentUser?.email || "",
      applicantName: currentUser?.name || previousForm.applicantName,
    }));
  }, [currentUser]);

  const totalJobs = useMemo(() => jobs.length, [jobs]);

  function handleSearchChange(event) {
    setSearchForm({
      ...searchForm,
      [event.target.name]: event.target.value,
    });
  }

  function handleSearchSubmit(event) {
    event.preventDefault();

    const params = {};

    if (searchForm.search.trim()) {
      params.search = searchForm.search.trim();
    }

    if (searchForm.location.trim()) {
      params.location = searchForm.location.trim();
    }

    setSearchParams(params);
  }

  function openApplyForm(job) {
    if (!currentUser) {
      setMessage("Please login first to apply for a job.");
      return;
    }

    setSelectedJob(job);
    setApplyForm({
      applicantName: currentUser.name,
      applicantEmail: currentUser.email,
    });
    setMessage("");
  }

  function handleApplyChange(event) {
    setApplyForm({
      ...applyForm,
      [event.target.name]: event.target.value,
    });
  }

  function handleApplySubmit(event) {
    event.preventDefault();

    try {
      const response = applyForJob({
        jobId: selectedJob.id,
        applicantName: applyForm.applicantName,
        applicantEmail: applyForm.applicantEmail,
        userId: currentUser.id,
      });

      setMessage(response.message);
      setSelectedJob(null);
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <main className="page">
      <section className="section-card">
        <div className="section-heading">
          <div>
            <p className="section-tag">Jobs</p>
            <h1>Find the right role for your skills</h1>
          </div>
          <p className="section-note">
            {totalJobs} jobs matched your current search.
          </p>
        </div>

        <form
          className="search-panel search-panel--small"
          onSubmit={handleSearchSubmit}
        >
          <input
            type="text"
            name="search"
            placeholder="Search by title"
            value={searchForm.search}
            onChange={handleSearchChange}
          />
          <input
            type="text"
            name="location"
            placeholder="Search by location"
            value={searchForm.location}
            onChange={handleSearchChange}
          />
          <button className="primary-button" type="submit">
            Search
          </button>
        </form>

        {message ? <p className="message-box">{message}</p> : null}

        <JobList
          jobs={jobs}
          emptyMessage="No jobs found for this search."
          showApplyButton
          showDeleteButton={false}
          onApplyClick={openApplyForm}
        />
      </section>

      {selectedJob ? (
        <section className="section-card form-card">
          <p className="section-tag">Apply Now</p>
          <h2>Apply for {selectedJob.title}</h2>

          <form onSubmit={handleApplySubmit} className="simple-form">
            <label>
              Full Name
              <input
                type="text"
                name="applicantName"
                value={applyForm.applicantName}
                onChange={handleApplyChange}
                placeholder="Enter your full name"
                required
              />
            </label>

            <label>
              Email
              <input
                type="email"
                name="applicantEmail"
                value={applyForm.applicantEmail}
                onChange={handleApplyChange}
                placeholder="Enter your email"
                required
              />
            </label>

            <div className="form-actions">
              <button className="primary-button" type="submit">
                Submit Application
              </button>
              <button
                className="secondary-button"
                type="button"
                onClick={() => setSelectedJob(null)}
              >
                Cancel
              </button>
            </div>
          </form>
        </section>
      ) : null}

      <section className="section-card">
        <div className="section-heading">
          <div>
            <p className="section-tag">Quick Help</p>
            <h2>How this page works</h2>
          </div>
        </div>
        <ul className="help-list">
          <li>Use the search boxes to filter jobs by title and location.</li>
          <li>Login is required before the user can apply for a job.</li>
          <li>All job and application data is saved in browser storage.</li>
        </ul>
      </section>
    </main>
  );
}

export default Jobs;
