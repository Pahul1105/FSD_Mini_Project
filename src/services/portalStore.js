const STORAGE_KEYS = {
  jobs: "job_portal_jobs",
  users: "job_portal_users",
  applications: "job_portal_applications",
  currentUser: "job_portal_current_user",
};

const defaultJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Bright Web Solutions",
    location: "Delhi",
    type: "Full Time",
    salary: "6 LPA",
    description: "Work on React pages, reusable components, and clean styling.",
  },
  {
    id: 2,
    title: "Java Developer",
    company: "Code Matrix",
    location: "Noida",
    type: "Full Time",
    salary: "5.5 LPA",
    description: "Build backend features using Java, JSP, Servlets, and MySQL.",
  },
  {
    id: 3,
    title: "UI Designer",
    company: "Pixel Craft",
    location: "Pune",
    type: "Internship",
    salary: "20,000 / month",
    description: "Design simple layouts, banners, and visual sections for web apps.",
  },
];

const defaultUsers = [
  {
    id: 1,
    name: "Portal Admin",
    email: "admin@jobportal.com",
    password: "admin123",
    role: "admin",
  },
  {
    id: 2,
    name: "Student User",
    email: "student@jobportal.com",
    password: "student123",
    role: "user",
  },
];

function readStorage(key, fallbackData) {
  const savedValue = localStorage.getItem(key);

  if (!savedValue) {
    localStorage.setItem(key, JSON.stringify(fallbackData));
    return fallbackData;
  }

  return JSON.parse(savedValue);
}

function writeStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getNextId(items) {
  if (items.length === 0) {
    return 1;
  }

  return Math.max(...items.map((item) => item.id)) + 1;
}

function formatDate() {
  return new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function seedPortalData() {
  readStorage(STORAGE_KEYS.jobs, defaultJobs);
  readStorage(STORAGE_KEYS.users, defaultUsers);
  readStorage(STORAGE_KEYS.applications, []);
}

export function getJobs(searchText = "", location = "") {
  const jobs = readStorage(STORAGE_KEYS.jobs, defaultJobs);

  return jobs.filter((job) => {
    const titleMatch = job.title
      .toLowerCase()
      .includes(searchText.trim().toLowerCase());
    const locationMatch = job.location
      .toLowerCase()
      .includes(location.trim().toLowerCase());

    return titleMatch && locationMatch;
  });
}

export function getRecentJobs() {
  const jobs = readStorage(STORAGE_KEYS.jobs, defaultJobs);
  return jobs.slice(-3).reverse();
}

export function addJob(jobData) {
  const jobs = readStorage(STORAGE_KEYS.jobs, defaultJobs);

  const newJob = {
    id: getNextId(jobs),
    title: jobData.title.trim(),
    company: jobData.company.trim(),
    location: jobData.location.trim(),
    type: jobData.type.trim(),
    salary: jobData.salary.trim(),
    description: jobData.description.trim(),
  };

  writeStorage(STORAGE_KEYS.jobs, [newJob, ...jobs]);
  return { message: "Job added successfully." };
}

export function deleteJob(jobId) {
  const jobs = readStorage(STORAGE_KEYS.jobs, defaultJobs);
  const applications = readStorage(STORAGE_KEYS.applications, []);

  const updatedJobs = jobs.filter((job) => job.id !== jobId);
  const updatedApplications = applications.filter(
    (application) => application.jobId !== jobId
  );

  writeStorage(STORAGE_KEYS.jobs, updatedJobs);
  writeStorage(STORAGE_KEYS.applications, updatedApplications);

  return { message: "Job deleted successfully." };
}

export function applyForJob(applicationData) {
  const applications = readStorage(STORAGE_KEYS.applications, []);
  const jobs = readStorage(STORAGE_KEYS.jobs, defaultJobs);
  const selectedJob = jobs.find((job) => job.id === applicationData.jobId);

  if (!selectedJob) {
    throw new Error("Selected job was not found.");
  }

  const alreadyApplied = applications.some(
    (application) =>
      application.jobId === applicationData.jobId &&
      application.userId === applicationData.userId
  );

  if (alreadyApplied) {
    throw new Error("You have already applied for this job.");
  }

  const newApplication = {
    id: getNextId(applications),
    jobId: selectedJob.id,
    jobTitle: selectedJob.title,
    company: selectedJob.company,
    location: selectedJob.location,
    applicantName: applicationData.applicantName.trim(),
    applicantEmail: applicationData.applicantEmail.trim(),
    userId: applicationData.userId,
    appliedAt: formatDate(),
  };

  writeStorage(STORAGE_KEYS.applications, [newApplication, ...applications]);

  return { message: "Application submitted successfully." };
}

export function getApplications() {
  return readStorage(STORAGE_KEYS.applications, []);
}

export function getApplicationsByUser(userId) {
  const applications = readStorage(STORAGE_KEYS.applications, []);
  return applications.filter((application) => application.userId === userId);
}

export function getApplicationCountByJobId(jobId) {
  const applications = readStorage(STORAGE_KEYS.applications, []);
  return applications.filter((application) => application.jobId === jobId).length;
}

export function registerUser(name, email, password) {
  const users = readStorage(STORAGE_KEYS.users, defaultUsers);
  const cleanEmail = email.trim().toLowerCase();

  const existingUser = users.find((user) => user.email === cleanEmail);

  if (existingUser) {
    throw new Error("An account with this email already exists.");
  }

  const newUser = {
    id: getNextId(users),
    name: name.trim(),
    email: cleanEmail,
    password: password.trim(),
    role: "user",
  };

  const updatedUsers = [...users, newUser];
  writeStorage(STORAGE_KEYS.users, updatedUsers);
  writeStorage(STORAGE_KEYS.currentUser, newUser);

  return newUser;
}

export function loginUser(email, password) {
  const users = readStorage(STORAGE_KEYS.users, defaultUsers);
  const cleanEmail = email.trim().toLowerCase();

  const matchedUser = users.find(
    (user) => user.email === cleanEmail && user.password === password.trim()
  );

  if (!matchedUser) {
    throw new Error("Invalid email or password.");
  }

  writeStorage(STORAGE_KEYS.currentUser, matchedUser);
  return matchedUser;
}

export function logoutUser() {
  localStorage.removeItem(STORAGE_KEYS.currentUser);
}

export function getCurrentUser() {
  const savedValue = localStorage.getItem(STORAGE_KEYS.currentUser);
  return savedValue ? JSON.parse(savedValue) : null;
}

export function getPortalStats() {
  const jobs = readStorage(STORAGE_KEYS.jobs, defaultJobs);
  const users = readStorage(STORAGE_KEYS.users, defaultUsers);
  const applications = readStorage(STORAGE_KEYS.applications, []);

  return {
    totalJobs: jobs.length,
    totalUsers: users.length,
    totalApplications: applications.length,
  };
}
