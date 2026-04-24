function JobCard({
  job,
  showApplyButton,
  showDeleteButton,
  onApplyClick,
  onDeleteClick,
  applicationCount,
}) {
  return (
    <article className="job-card">
      <div className="job-card__top">
        <div>
          <p className="job-card__company">{job.company}</p>
          <h3>{job.title}</h3>
        </div>
        <span className="job-card__location">{job.location}</span>
      </div>

      <div className="job-card__meta">
        <span>{job.type}</span>
        <span>{job.salary}</span>
        {applicationCount >= 0 ? <span>{applicationCount} applications</span> : null}
      </div>

      <p className="job-card__description">{job.description}</p>

      <div className="job-card__actions">
        {showApplyButton ? (
          <button className="primary-button" onClick={() => onApplyClick(job)}>
            Apply
          </button>
        ) : null}

        {showDeleteButton ? (
          <button
            className="secondary-button secondary-button--danger"
            onClick={() => onDeleteClick(job.id)}
          >
            Delete
          </button>
        ) : null}
      </div>
    </article>
  );
}

export default JobCard;
