// UpdateEmp.js
import React, { useEffect, useState } from "react";
import { TextBox } from "devextreme-react/text-box";
import { Button } from "devextreme-react/button";

function UpdateEmp() {
const [empId, setEmpId] = useState("");
const [details, setDetails] = useState(null);

const handleSearch = () => {
    fetch(`http://localhost:8000/employee/api/${empId}/`, { credentials: "include" })
    .then((res) => res.json())
    .then((data) => setDetails(data))
    .catch(() => alert("Employee not found"));
};

const handleUpdate = () => {
    fetch(`http://localhost:8000/employee/api/update/${empId}/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(details),
    credentials: "include",
    })
    .then((res) => res.json())
    .then(() => alert("Employee updated!"))
    .catch(() => alert("Update failed"));
};

return (
    <div>
    <h2>✏️ Update Employee</h2>
    <TextBox placeholder="Enter Employee ID" value={empId} onValueChanged={(e) => setEmpId(e.value)} />
    <Button text="Search" onClick={handleSearch} />

    {details && (
        <div className="form-grid">
        <TextBox value={details.first_name} onValueChanged={(e) => setDetails({ ...details, first_name: e.value })} placeholder="First Name" />
        <TextBox value={details.last_name} onValueChanged={(e) => setDetails({ ...details, last_name: e.value })} placeholder="Last Name" />
        <TextBox value={details.email} onValueChanged={(e) => setDetails({ ...details, email: e.value })} placeholder="Email" />
        <TextBox value={details.phone} onValueChanged={(e) => setDetails({ ...details, phone: e.value })} placeholder="Phone" />
        <TextBox value={details.salary} onValueChanged={(e) => setDetails({ ...details, salary: e.value })} placeholder="Salary" />
        <Button text="Update" type="default" stylingMode="contained" onClick={handleUpdate} />
        </div>
    )}
    </div>
);
}

export default UpdateEmp;
