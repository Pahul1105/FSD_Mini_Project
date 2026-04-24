import { useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { getApplicationsByUser } from "../services/portalStore";

function Applications() {
  const { currentUser } = useAuth();
  const applications = useMemo(
    () => getApplicationsByUser(currentUser.id),
    [currentUser]
  );

  return (
    <main className="page">
      <section className="section-card">
        <div className="section-heading">
          <div>
            <p className="section-tag">My Applications</p>
            <h1>Track the jobs you have applied for</h1>
          </div>
        </div>

        {applications.length === 0 ? (
          <p className="section-note">
            You have not applied to any jobs yet. Go to the Jobs page and apply
            to a role that interests you.
          </p>
        ) : (
          <div className="table-card">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Job Title</th>
                  <th>Company</th>
                  <th>Location</th>
                  <th>Applied On</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((application) => (
                  <tr key={application.id}>
                    <td>{application.jobTitle}</td>
                    <td>{application.company}</td>
                    <td>{application.location}</td>
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

export default Applications;
