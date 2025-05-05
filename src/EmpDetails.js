import React, { useEffect, useState } from "react";
import "./App.css";

function EmpDetails() {
  const [empId, setEmpId] = useState(null);
  const [details, setDetails] = useState(null);
  const [error, setError] = useState(null);
  const [warning, setWarning] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get("empId");
    console.log("Employee ID from URL:", empId);

    // No employee ID provided, show a warning
    if (!id) {
      setWarning("No Employee ID provided.");
      return;
    }

    // Check if another employee's details are open in another tab
    const existingEmpId = localStorage.getItem("openEmpId");

    if (existingEmpId && existingEmpId !== id) {
      setWarning(
        `Another employee's details (ID: ${existingEmpId}) are already open in a tab. You cannot open multiple employee profiles.`
      );
      return; // 🛑 Prevent loading a different profile
    }

    setEmpId(id);
    localStorage.setItem("openEmpId", id); // ✅ Set only after validation

    // Check authentication before proceeding
    fetch("http://localhost:8000/sso/saml/check-auth/", {
      credentials: "include", // Important for sending cookies/session
    })
      .then((res) => {
        if (res.status === 401) {
          // If not authenticated, redirect to SSO login
          // 🔄 Redirect to SSO login with RelayState back to this app
          const redirectUrl = `http://localhost:8000/sso/saml/login/?RelayState=${encodeURIComponent(window.location.href)}`;
          window.location.href = redirectUrl;
          return;
        }
        return res.json();
      })
      .then(() => {
        // Fetch employee details after successful authentication
        fetch(`http://localhost:8000/employee/api/${id}/`, {
          credentials: "include",
        })
          .then((res) => {
            if (!res.ok) throw new Error("Employee not found");
            return res.json();
          })
          .then((data) => setDetails(data))
          .catch((err) => setError(err.message));
      });

    // Cleanup function to remove the open employee ID on page unload
    const clearOnUnload = () => {
      if (localStorage.getItem("openEmpId") === id) {
        localStorage.removeItem("openEmpId");
      }
    };

    window.addEventListener("beforeunload", clearOnUnload);

    return () => {
      clearOnUnload();
      window.removeEventListener("beforeunload", clearOnUnload);
    };
  }, []);

  // Conditional rendering based on the state
  if (warning) return <p style={{ color: "orange" }}>{warning}</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!details) return <p>Loading employee details...</p>;

  return (
    <div className="container">
      <div className="card details">
        <h2>👤 Employee Details</h2>
        <div className="info"><strong>ID:</strong> {details.id}</div>
        <div className="info"><strong>Name:</strong> {details.first_name} {details.last_name}</div>
        <div className="info"><strong>Email:</strong> {details.email}</div>
        <div className="info"><strong>Phone:</strong> {details.phone}</div>
        <div className="info"><strong>Department:</strong> {details.department.name} ({details.department.location})</div>
        <div className="info"><strong>Job Title:</strong> {details.job_title.title}</div>
        <div className="info"><strong>Description:</strong> {details.job_title.description}</div>
        <div className="info"><strong>Salary:</strong> ${parseFloat(details.salary).toFixed(2)}</div>
        <div className="info"><strong>Hire Date:</strong> {details.hire_date}</div>
      </div>
    </div>
  );
}

export default EmpDetails;
