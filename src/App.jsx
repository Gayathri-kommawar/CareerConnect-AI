
import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

import { jobs } from "./data/jobs";
import JobDetails from "./pages/JobDetails";
import ATSChecker from "./pages/ATSChecker";
import "./App.css";

// NAVBAR
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        CareerConnect <span>AI</span>
      </Link>

      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/#jobs" onClick={() => setMenuOpen(false)}>Find Jobs</Link>
        <Link to="/ats-checker" onClick={() => setMenuOpen(false)}>
          ATS Resume Checker
        </Link>
        <Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link>
        <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
      </div>

      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>
    </nav>
  );
}

// HOME PAGE
function Home() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All Locations");
  const [jobType, setJobType] = useState("All Types");
  const [experience, setExperience] = useState("All Experience");
  const [salary, setSalary] = useState("Any Salary");

  const filteredJobs = jobs.filter((job) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      job.title.toLowerCase().includes(searchText) ||
      job.company.toLowerCase().includes(searchText) ||
      job.description.toLowerCase().includes(searchText) ||
      job.skills.some((skill) =>
        skill.toLowerCase().includes(searchText)
      );

    const matchesLocation =
      location === "All Locations" || job.location === location;

    const matchesType =
      jobType === "All Types" || job.type === jobType;

    const matchesExperience =
      experience === "All Experience" ||
      job.experience === experience;

    const salaryNumber = parseFloat(job.salary.replace(/[^\d.]/g, ""));
    let matchesSalary = true;

    if (salary === "Under 3 LPA") {
      matchesSalary =
        !job.salary.toLowerCase().includes("/month") &&
        salaryNumber < 3;
    } else if (salary === "3–5 LPA") {
      matchesSalary =
        !job.salary.toLowerCase().includes("/month") &&
        salaryNumber >= 3 &&
        salaryNumber <= 5;
    } else if (salary === "Above 5 LPA") {
      matchesSalary =
        !job.salary.toLowerCase().includes("/month") &&
        salaryNumber > 5;
    } else if (salary === "Internship Stipend") {
      matchesSalary = job.salary.toLowerCase().includes("/month");
    }

    return (
      matchesSearch &&
      matchesLocation &&
      matchesType &&
      matchesExperience &&
      matchesSalary
    );
  });

  const clearFilters = () => {
    setSearch("");
    setLocation("All Locations");
    setJobType("All Types");
    setExperience("All Experience");
    setSalary("Any Salary");
  };

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h1>
            Find Your Dream Job with <span>CareerConnect AI</span>
          </h1>

          <p>
            Discover opportunities, explore careers and find jobs
            that match your skills.
          </p>

          <div className="hero-search">
            <input
              type="text"
              placeholder="Search jobs, companies or skills..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option>All Locations</option>
              <option>Hyderabad</option>
              <option>Bangalore</option>
              <option>Chennai</option>
              <option>Pune</option>
              <option>Mumbai</option>
              <option>Remote</option>
            </select>

            <button
              onClick={() =>
                document.getElementById("jobs")?.scrollIntoView({
                  behavior: "smooth",
                })
              }
            >
              Search Jobs
            </button>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="stat-card">
          <h2>16+</h2>
          <p>Sample Jobs</p>
        </div>
        <div className="stat-card">
          <h2>15+</h2>
          <p>Sample Companies</p>
        </div>
        <div className="stat-card">
          <h2>100+</h2>
          <p>Career Opportunities</p>
        </div>
        <div className="stat-card">
          <h2>24/7</h2>
          <p>Job Search Access</p>
        </div>
      </section>

      <section className="jobs-section" id="jobs">
        <div className="section-heading">
          <h2>Explore Latest Jobs</h2>
          <p>Find opportunities that match your interests and skills.</p>
        </div>

        <div className="filter-container">
          <input
            type="text"
            placeholder="Search by title, company or skill"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option>All Locations</option>
            <option>Hyderabad</option>
            <option>Bangalore</option>
            <option>Chennai</option>
            <option>Pune</option>
            <option>Mumbai</option>
            <option>Remote</option>
          </select>

          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
          >
            <option>All Types</option>
            <option>Full Time</option>
            <option>Internship</option>
          </select>

          <select
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          >
            <option>All Experience</option>
            <option>Fresher</option>
            <option>0–2 Years</option>
            <option>1–3 Years</option>
          </select>

          <select
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          >
            <option>Any Salary</option>
            <option>Under 3 LPA</option>
            <option>3–5 LPA</option>
            <option>Above 5 LPA</option>
            <option>Internship Stipend</option>
          </select>

          <button className="clear-filter" onClick={clearFilters}>
            Clear Filters
          </button>
        </div>

        <p className="result-count">
          Showing {filteredJobs.length} of {jobs.length} sample jobs
        </p>

        <div className="jobs-grid">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div className="job-card" key={job.id}>
                <span className="job-type">{job.type}</span>

                <h3>{job.title}</h3>
                <h4>{job.company}</h4>

                <p>📍 {job.location}</p>
                <p>💰 {job.salary}</p>
                <p>💼 {job.experience || "Not specified"}</p>

                <p className="job-description">
                  {job.description}
                </p>

                <div className="job-skills">
                  {job.skills.map((skill, index) => (
                    <span key={index}>{skill}</span>
                  ))}
                </div>

                <div className="job-card-actions">
                  <Link
                    to={`/job/${job.id}`}
                    className="view-details-btn"
                  >
                    View Details
                  </Link>

                  <Link to="/login" className="apply-btn">
                    Apply Now
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="no-jobs">
              <h3>No Jobs Found</h3>
              <p>Try changing your search or filters.</p>
              <button onClick={clearFilters}>Clear Filters</button>
            </div>
          )}
        </div>
      </section>

      <section className="ats-promo">
        <h2>Make Your Resume ATS Friendly</h2>
        <p>
          Analyze your resume, identify missing keywords and
          improve your chances of getting shortlisted.
        </p>

        <Link to="/ats-checker" className="ats-button">
          Check Your Resume
        </Link>
      </section>

      <footer className="footer">
        <h3>CareerConnect AI</h3>
        <p>Connecting talent with career opportunities.</p>
        <p>© 2026 CareerConnect AI. Project demonstration.</p>
      </footer>
    </>
  );
}

// REGISTER PAGE
function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Student",
  });

  const handleRegister = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const existingUser = users.find(
      (user) => user.email === form.email
    );

    if (existingUser) {
      alert("This email is already registered.");
      return;
    }

    users.push(form);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful! Please login.");
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleRegister}>
        <h2>Create Account</h2>
        <p>Join CareerConnect AI</p>

        <input
          type="text"
          placeholder="Full Name"
          required
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          type="email"
          placeholder="Email Address"
          required
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <select
          value={form.role}
          onChange={(e) =>
            setForm({ ...form, role: e.target.value })
          }
        >
          <option>Student</option>
          <option>Recruiter</option>
        </select>

        <button type="submit">Register</button>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

// LOGIN PAGE
function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const user = users.find(
      (item) =>
        item.email === email &&
        item.password === password
    );

    if (!user) {
      alert("Invalid email or password.");
      return;
    }

    localStorage.setItem("currentUser", JSON.stringify(user));

    alert(`Welcome, ${user.name}!`);
    navigate("/");
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleLogin}>
        <h2>Welcome Back</h2>
        <p>Login to CareerConnect AI</p>

        <input
          type="email"
          placeholder="Email Address"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>

        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}

// MAIN APP
function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ats-checker" element={<ATSChecker />} />
        <Route path="/job/:id" element={<JobDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
