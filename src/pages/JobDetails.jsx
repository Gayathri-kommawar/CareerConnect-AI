
import { useParams, Link, useNavigate } from "react-router-dom";
import { jobs } from "../data/jobs";
import "./JobDetails.css";

function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const job = jobs.find((item) => item.id === Number(id));

  if (!job) {
    return (
      <div className="job-not-found">
        <h2>Job Not Found</h2>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  const responsibilities = [
    "Develop and maintain web applications.",
    "Write clean, reusable and efficient code.",
    "Work with databases and REST APIs.",
    "Collaborate with the development team.",
    "Test and debug application functionality."
  ];

  const qualifications = [
    "Bachelor's degree in Computer Science or a related field.",
    "Knowledge of the required technical skills.",
    "Understanding of programming fundamentals.",
    "Problem-solving and communication skills."
  ];

  const currentUser = localStorage.getItem("currentUser");

  const handleApply = () => {
    if (!currentUser) {
      navigate("/login");
    } else {
      alert("Application submission will be available after backend integration.");
    }
  };

  const handleATS = () => {
    navigate("/ats-checker", {
      state: { jobDescription: job.description }
    });
  };

  return (
    <div className="job-details-page">
      <div className="job-details-container">

        <Link to="/" className="back-link">
          ← Back to Jobs
        </Link>

        <div className="job-details-header">
          <div>
            <span className="job-type-badge">{job.type}</span>
            <h1>{job.title}</h1>
            <h3>{job.company}</h3>

            <div className="job-meta">
              <span>📍 {job.location}</span>
              <span>💰 {job.salary}</span>
              <span>💼 {job.experience || "Not specified"}</span>
            </div>
          </div>

          <button className="apply-job-btn" onClick={handleApply}>
            Apply Now
          </button>
        </div>

        <div className="job-details-grid">
          <main className="job-details-content">

            <section className="details-card">
              <h2>Job Description</h2>
              <p>{job.description}</p>
            </section>

            <section className="details-card">
              <h2>Key Responsibilities</h2>
              <ul>
                {responsibilities.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="details-card">
              <h2>Required Qualifications</h2>
              <ul>
                {qualifications.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="details-card">
              <h2>Required Skills</h2>
              <div className="details-skills">
                {job.skills.map((skill, index) => (
                  <span key={index}>{skill}</span>
                ))}
              </div>
            </section>

          </main>

          <aside className="job-details-sidebar">
            <div className="details-card">
              <h2>Job Overview</h2>
              <p><strong>Company:</strong> {job.company}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Job Type:</strong> {job.type}</p>
              <p><strong>Experience:</strong> {job.experience || "Not specified"}</p>
              <p><strong>Salary:</strong> {job.salary}</p>
            </div>

            <div className="details-card ats-job-card">
              <h2>Check Your Resume</h2>
              <p>Compare your resume with this job description and identify missing keywords.</p>
              <button onClick={handleATS}>
                Check Resume Against This JD
              </button>
            </div>
          </aside>
        </div>

      </div>
    </div>
  );
}

export default JobDetails;
