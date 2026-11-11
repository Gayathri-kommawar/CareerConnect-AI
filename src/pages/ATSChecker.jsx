
import { useState } from "react";
import "./ATSChecker.css";

function ATSChecker() {
  const [resume, setResume] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [fileName, setFileName] = useState("");
  const [result, setResult] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file && file.type !== "application/pdf") {
      alert("Please upload a PDF resume.");
      event.target.value = "";
      return;
    }

    if (file) {
      setFileName(file.name);
    }
  };

  const analyzeResume = () => {
    if (!resume.trim() || !jobDescription.trim()) {
      alert("Please enter resume text and job description.");
      return;
    }

    const keywords = [
      ...new Set(
        jobDescription.toLowerCase().match(/\b[a-z+#.]+\b/g) || []
      ),
    ];

    const matched = keywords.filter((word) =>
      resume.toLowerCase().includes(word)
    );

    const missing = keywords.filter(
      (word) => !resume.toLowerCase().includes(word)
    );

    const score = keywords.length
      ? Math.round((matched.length / keywords.length) * 100)
      : 0;

    setResult({ score, matched, missing });
  };

  return (
    <div className="ats-container">
      <h1>ATS Resume Checker</h1>
      <p>Check how well your resume matches a Job Description.</p>

      <div className="ats-card">
        <h2>Upload Your Resume</h2>

        <input
          type="file"
          accept=".pdf,application/pdf"
          onChange={handleFileChange}
        />

        {fileName && <p>Selected file: {fileName}</p>}

        <label>Resume Text</label>
        <textarea
          placeholder="Paste your resume text here..."
          value={resume}
          onChange={(e) => setResume(e.target.value)}
        />

        <label>Job Description (JD)</label>
        <textarea
          placeholder="Paste the complete job description here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />

        <button onClick={analyzeResume}>Analyze Resume</button>
      </div>

      {result && (
        <div className="ats-card">
          <h2>ATS Analysis Result</h2>

          <h1>{result.score}/100</h1>
          <p>Estimated keyword match score</p>

          <h3>Matching Keywords</h3>
          <p>{result.matched.join(", ") || "No matches found"}</p>

          <h3>Missing Keywords</h3>
          <p>{result.missing.join(", ") || "No missing keywords"}</p>
        </div>
      )}
    </div>
  );
}

export default ATSChecker;
