// ListEmp.js
import React, { useEffect, useState } from "react";
import DataGrid, { Column, Paging, Pager,Scrolling } from "devextreme-react/data-grid";

function ListEmp() {
const [employees, setEmployees] = useState([]);

useEffect(() => {
    fetch("http://localhost:8000/employee/api/list/", { 
        credentials: "include",  
        // headers: { 'Accept': 'application/json', },
    })
    .then((res) => res.json())
    .then((data) => setEmployees(data))
    .catch((err) => console.error("Failed to fetch employees"));
}, []);

return (
    <div>
    <h2>📋 All Employees</h2>
    {/* <DataGrid dataSource={employees} keyExpr="id" showBorders={true}>
        <Paging defaultPageSize={10} />
        <Pager showPageSizeSelector={true} allowedPageSizes={[5, 10, 20]} showInfo={true} />
        <Column dataField="id" width={50} />
        <Column dataField="first_name" caption="First Name" />
        <Column dataField="last_name" caption="Last Name" />
        <Column dataField="email" />
        <Column dataField="department.name" caption="Department" />
        <Column dataField="job_title.title" caption="Title" />
    </DataGrid> */}
    <DataGrid
        id="gridContainer"
        dataSource={employees}
        keyExpr="id"
        showBorders={true}
        // customizeColumns={customizeColumns}
    >
        <Scrolling rowRenderingMode="virtual"></Scrolling>
        <Paging defaultPageSize={10} />
    </DataGrid>
    </div>
);
}

export default ListEmp;

