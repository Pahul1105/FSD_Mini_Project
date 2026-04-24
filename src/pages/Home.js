import { Link } from "react-router-dom";
import PortalSummary from "../components/PortalSummary";
import { getPortalStats, getRecentJobs } from "../services/portalStore";

function Home() {
  const stats = getPortalStats();
  const recentJobs = getRecentJobs();

  return (
    <main className="page">
      <section className="hero">
        <div className="hero__content">
          <p className="hero__tag">Welcome To The Job Portal</p>
          <h1>Search jobs, apply easily, and manage openings in one place</h1>
          <p className="hero__text">
            This version works like a real student project. Users can register,
            login, apply for jobs, and admins can manage job openings without a
            broken screen.
          </p>

          <div className="hero__actions">
            <Link to="/jobs" className="primary-button hero__button-link">
              Explore Jobs
            </Link>
            <Link to="/login" className="secondary-button hero__button-link">
              Login
            </Link>
          </div>

          <div className="hero__demo-box">
            <h3>Demo Accounts</h3>
            <p>Admin: `admin@jobportal.com` / `admin123`</p>
            <p>User: `student@jobportal.com` / `student123`</p>
          </div>
        </div>

        <div className="hero__card">
          <h2>What This Portal Can Do</h2>
          <ul className="hero__list">
            <li>Register and login with saved account data</li>
            <li>Browse jobs with title and location search</li>
            <li>Apply for jobs and track applications</li>
            <li>Admin can add, delete, and review job openings</li>
          </ul>
        </div>
      </section>

      <section className="section-card">
        <div className="section-heading">
          <div>
            <p className="section-tag">Portal Overview</p>
            <h2>Current Activity</h2>
          </div>
        </div>

        <PortalSummary
          items={[
            {
              label: "Total Jobs",
              value: stats.totalJobs,
              text: "Jobs available in the portal right now.",
            },
            {
              label: "Applications",
              value: stats.totalApplications,
              text: "Applications submitted by users.",
            },
            {
              label: "Registered Users",
              value: stats.totalUsers,
              text: "Users who can login and apply.",
            },
          ]}
        />
      </section>

      <section className="section-card">
        <div className="section-heading">
          <div>
            <p className="section-tag">Latest Jobs</p>
            <h2>Recent Openings</h2>
          </div>
          <Link to="/jobs" className="section-link">
            View all jobs
          </Link>
        </div>

        <div className="recent-jobs">
          {recentJobs.map((job) => (
            <article className="recent-job-card" key={job.id}>
              <p className="job-card__company">{job.company}</p>
              <h3>{job.title}</h3>
              <p className="section-note">
                {job.location} • {job.type}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;
