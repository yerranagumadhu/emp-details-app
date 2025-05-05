// AddEmp.js
import React from "react";
import { Button } from "devextreme-react/button";
import { TextBox } from "devextreme-react/text-box";
import { useState } from "react";

function AddEmp() {
const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    department: "",
    job_title: "",
    salary: ""
});

const handleChange = (e) => {
    setForm({ ...form, [e.event.target.name]: e.event.target.value });
};

const handleSubmit = () => {
    fetch("http://localhost:8000/employee/api/add/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
    credentials: "include",
    })
    .then((res) => res.json())
    .then((data) => alert("Employee added!"))
    .catch((err) => alert("Error adding employee"));
};

return (
    <div>
    <h2>➕ Add New Employee</h2>
    <div className="form-grid">
        <TextBox name="first_name" value={form.first_name} placeholder="First Name" onValueChanged={handleChange} />
        <TextBox name="last_name" value={form.last_name} placeholder="Last Name" onValueChanged={handleChange} />
        <TextBox name="email" value={form.email} placeholder="Email" onValueChanged={handleChange} />
        <TextBox name="phone" value={form.phone} placeholder="Phone" onValueChanged={handleChange} />
        <TextBox name="department" value={form.department} placeholder="Department" onValueChanged={handleChange} />
        <TextBox name="job_title" value={form.job_title} placeholder="Job Title" onValueChanged={handleChange} />
        <TextBox name="salary" value={form.salary} placeholder="Salary" onValueChanged={handleChange} />
    </div>
    <Button text="Submit" type="success" stylingMode="contained" onClick={handleSubmit} />
    </div>
);
}

export default AddEmp;


