import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
//import icons from react icons
import { FaChartArea, FaList, FaUser } from "react-icons/fa";
import {
  FiHome,
  FiArrowLeftCircle,
  FiArrowRightCircle,
  FiLogOut,
} from "react-icons/fi";

function NavigationBar() {
  const [menuCollapse, setMenuCollapse] = useState(false);
  const [isLogged, setIsLogged] = useState(true);
  const sidebarCss = {
    display: "block",
    float: "left",
    height: "100vh",
  };

  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  return (
    <>
      <div id="header" style={sidebarCss}>
        <ProSidebar
          style={{ sidebarCollapsedWidth: "80px !default" }}
          collapsed={menuCollapse}
        >
          <SidebarHeader>
            <Link to="/" className="navbar-brand">
              <p
                style={{
                  fontSize: "25px",
                  color: "darkslategrey",
                  marginBottom: "0px",
                }}
              >
                <img
                  style={{ margin: "20px" }}
                  alt="home"
                  width="40px"
                  height="40px"
                  src="https://img.icons8.com/external-vitaliy-gorbachev-fill-vitaly-gorbachev/60/000000/external-dashboard-blogger-vitaliy-gorbachev-fill-vitaly-gorbachev.png"
                />
                Dashboard
              </p>
            </Link>
            <div className="closemenu" onClick={menuIconClick}>
              {/* changing menu collapse icon on click */}
              {menuCollapse ? (
                <FiArrowRightCircle style={{ float: "left" }} />
              ) : (
                <FiArrowLeftCircle style={{ float: "right" }} />
              )}
            </div>
          </SidebarHeader>
          <Menu iconShape="square">
            <MenuItem active={true} icon={<FiHome />}>
              <Link to="/" className="navbar-brand">
                Home
              </Link>
            </MenuItem>
            <SubMenu title="Projects" icon={<FaList />}>
              <MenuItem>
                <Link to="/add-project" className="nav-link">
                  Add Project
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="/list-project" className="nav-link">
                  Projects
                </Link>
              </MenuItem>
            </SubMenu>
            <SubMenu title="Users" icon={<FaUser />}>
              <MenuItem>
                <Link to="/add-user" className="nav-link">
                  Add User
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="/list-users" className="nav-link">
                  Users
                </Link>
              </MenuItem>
            </SubMenu>
            <SubMenu title="Progress" icon={<FaChartArea />}>
              <MenuItem>
                <Link to="/progress" className="nav-link">
                  Project Progress
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="/list-progress" className="nav-link">
                  Progress Info
                </Link>
              </MenuItem>
            </SubMenu>
            <SidebarFooter style={{ marginTop: "480px" }}>
              <Menu iconShape="square">
                <MenuItem title="Logout" icon={<FiLogOut />}>
                  <Link to="/login">LOGOUT</Link>
                </MenuItem>
              </Menu>
            </SidebarFooter>
          </Menu>
        </ProSidebar>
      </div>
    </>
  );
}

export default NavigationBar;
