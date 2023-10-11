import React, { useState } from "react";
import "./Navbar.css";
import { NavbarProps } from "../../types/interfaces/NavInterface";
import Sidebar from "../Sidebar/sidebar";

const Navbar: React.FC<NavbarProps> = ({ title, links }) => {
  const [navOpen, setNavOpen] = useState(false);

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  const sideBarLinks = [
    {
      title: "News",
      name: ["breaking", "local", "crime"],
      url: ["/staff", "/login", "/crime"],
    },
    { title: "Sports", name: ["local", "crime"], url: [] },
  ];

  return (
    <nav className="nav-main">
      <div className="hamburger-menu">
        <button onClick={toggleNav}>sidebar placeholder</button>
      </div>

      <div className="title">
        <h1>
          <a href="/" className="nav-title">
            {title}
          </a>
        </h1>
      </div>

      <div className="top-navbar-links">
        <ul>
          {links.map((link, index) => (
            <li key={index} className="main-links">
              <a href={link.url}>{link.name}</a>
            </li>
          ))}
        </ul>
      </div>

      {navOpen && (
        <div className="sidebar-content">
          <button onClick={toggleNav}>close sidebar</button>
          <Sidebar links={sideBarLinks} />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
