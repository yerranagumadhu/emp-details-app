// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { TabPanel } from "devextreme-react/tab-panel";
import EmpDetails from "./EmpDetails";
import AddEmp from "./AddEmp";
import ListEmp from "./ListEmp";
import UpdateEmp from "./UpdateEmp";
import './App.css';
import 'devextreme/dist/css/dx.light.css'; // or another theme


function TabRouter() {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { title: "👤 EMP Details", path: "/details" },
    { title: "➕ Add New EMP", path: "/add" },
    { title: "📋 List All EMPs", path: "/list" },
    { title: "✏️ Update EMP", path: "/update" },
  ];

  const currentIndex = tabs.findIndex((t) => location.pathname.includes(t.path));

  return (
    <div className="app-container">
      <h1 className="title">🏢 Employee Management Portal</h1>
      <TabPanel
        items={tabs.map((tab) => ({ title: tab.title }))}
        selectedIndex={currentIndex}
        onSelectionChanged={(e) => navigate(tabs[e.component.option("selectedIndex")].path)}
        deferRendering={false}
        elementAttr={{ class: 'custom-tabs' }}
      />
      <div className="tab-content">
        <Routes>
          <Route path="/details" element={<EmpDetails />} />
          <Route path="/add" element={<AddEmp />} />
          <Route path="/list" element={<ListEmp />} />
          <Route path="/update" element={<UpdateEmp />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <TabRouter />
    </Router>
  );
}

export default App;
