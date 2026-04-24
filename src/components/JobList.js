import JobCard from "./JobCard";

function JobList({
  jobs,
  emptyMessage,
  showApplyButton,
  showDeleteButton,
  onApplyClick,
  onDeleteClick,
  getApplicationCount,
}) {
  if (jobs.length === 0) {
    return <p className="section-note">{emptyMessage}</p>;
  }

  return (
    <div className="job-grid">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          showApplyButton={showApplyButton}
          showDeleteButton={showDeleteButton}
          onApplyClick={onApplyClick}
          onDeleteClick={onDeleteClick}
          applicationCount={getApplicationCount ? getApplicationCount(job.id) : -1}
        />
      ))}
    </div>
  );
}

export default JobList;
