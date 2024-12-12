import React from "react";
import { Link } from "react-router-dom"; // For proper React routing
// import "../css/Header.css";

const Header = () => {
  return (
    <header className="bg-dark text-white">
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          {/* Logo */}
          <a className="navbar-brand" href="/">
            {/* <img
              src="/path/to/logo.png"
              // alt="Bhoomi Logo"
              style={{ width: "40px", height: "40px", marginRight: "10px" }}
            /> */}
            Admin Module
          </a>

          {/* Toggle button for mobile view */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/add-Project">
                  Add Project
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/BuilderForm">
                  Add builder
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/AddRolePage">
                  Add Role
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/view-Project">
                  View Project
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/view-Property">
                  Add Property
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/view-Property">
                  View Role
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/view-Property">
                  View Property
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/view-Builder">
                  View Builder
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
