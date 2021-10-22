import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";

function NavigationBar() {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Link to="/" className="navbar-brand">
          <img
            style={{ margin: "10px" }}
            alt="home"
            width="40px"
            height="40px"
            src="https://img.icons8.com/external-vitaliy-gorbachev-fill-vitaly-gorbachev/60/000000/external-dashboard-blogger-vitaliy-gorbachev-fill-vitaly-gorbachev.png"
          />{" "}
          Dashboard
        </Link>

        <Nav className="me-auto">
          <Link to="/list-project" className="nav-link">
            Projects
          </Link>
          <Link to="/add-project" className="nav-link">
            Add Project
          </Link>
          <Link to="/list-users" className="nav-link">
            Users
          </Link>
          <Link to="/add-user" className="nav-link">
            Add User
          </Link>
          <Link to="/progress" className="nav-link">
            Project Progress
          </Link>
          <Link to="/list-progress" className="nav-link">
            Progress Info
          </Link>
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavigationBar;
