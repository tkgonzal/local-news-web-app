import React, { useState } from "react";
import "./Navbar.css";
import { NavbarProps } from "../../types/interfaces/NavInterface";
import Sidebar from "../Sidebar/sidebar";

const Navbar: React.FC<NavbarProps> = ({ links }) => {
  //   const [navOpen, setNavOpen] = useState(false);

  //   const toggleNav = () => {
  //     setNavOpen(!navOpen);
  //   };

  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
  };

  const sideBarLinks = [
    { name: ["HOME"], url: "/" },
    {
      name: ["NEWS", "BREAKING", "LOCAL"],
      url: ["/", "/", "/"],
    },
    { name: ["SPORTS", "HIGHSCHOOL"], url: ["/", "/"] },
    { name: ["LOCAL", "CRIME"], url: ["/", "/"] },
    { name: ["BUSINESS", "STAFF"], url: ["/panel", "/staff"] },
  ];

  return (
    <>
      <div className="nav-container">
        <div className="left-column">
          <Sidebar links={sideBarLinks} />
          {/* <button onClick={toggleNav}>sidebar placeholder</button> */}
        </div>
        <nav className="nav-main">
          <div className="title">
          <form onSubmit={handleSearch} className="search-bar">
      <input
        type="text"
        placeholder="Search articles"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleSearch(e);
          }
        }}
      />
    </form>
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

          {/* {navOpen && (  
          <div className="sidebar-content">
          <button onClick={toggleNav}>close sidebar</button>
          <Sidebar links={sideBarLinks} />
          </div>
        )} */}

        </nav>
      </div>
    </>
  );
};

export default Navbar;
