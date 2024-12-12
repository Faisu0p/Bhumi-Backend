import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import PropertyPage from "./pages/PropertyPage";
import BuilderForm from "./pages/BuilderForm";
import AddRolePage from "./pages/AddRolePage";
import ProjectView from "./pages/ProjectViewPage.js"; // ProjectView component
import AddProject from "./pages/addNewProject.js";
import PropertyView from "./pages/PropertyView.js";
import ViewBuilders from "./pages/ViewBuilders.js";
function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/properties" element={<PropertyPage />} />
          <Route path="/BuilderForm" element={<BuilderForm />} />
          <Route path="/AddRolePage" element={<AddRolePage />} />
          <Route path="/add-Project" element={<AddProject />} />
          <Route path="/view-Project" element={<ProjectView />} />
          <Route path="/view-Property" element={<PropertyView />} />
          <Route path="/view-Property" element={<PropertyView />} />
          <Route path="/view-Builder" element={<ViewBuilders />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
