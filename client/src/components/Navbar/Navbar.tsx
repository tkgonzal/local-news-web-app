import React, { useState } from "react";
import "./Navbar.css";
import { NavbarProps } from "../../types/interfaces/NavInterface";
import Sidebar from "../Sidebar/sidebar";
import SearchBar from "./magnifying-glass-1976105_960_720.webp";

const Navbar: React.FC<NavbarProps> = ({ links }) => {
  //   const [navOpen, setNavOpen] = useState(false);

  //   const toggleNav = () => {
  //     setNavOpen(!navOpen);
  //   };

  const [searchTerm, setSearchTerm] = useState("");

  const inputChange = (e) => {
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
    { name: ["BUSINESS", "STAFF"], url: ["/business/articles", "/staff"] },
  ];

  return (
    <>
      <div className="nav-container">
        <div className="left-column">
          <Sidebar links={sideBarLinks} />
          {/* <button onClick={toggleNav}>sidebar placeholder</button>  */}
        </div>
        <nav className="nav-main">
          

          <div className="top-navbar-links">
            <ul>
              {links.map((link, index) => (
                <li key={index} className="main-links">
                  <a
                    href={link.url}
                    className={
                      link.name === "Subscribe" ? "subscribe-link" : ""
                    }
                    
                  >
                    {link.name}
                  </a>
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


      <div className="title">
            <form onSubmit={handleSearch} className="search-bar">
              <div className="">
                <img src={SearchBar} alt="" className="mglass" />
                <input
                  type="text"
                  placeholder="Search articles"
                  value={searchTerm}
                  onChange={inputChange}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSearch(e);
                    }
                  }}
                  className="custom-input"
                />
              </div>
            </form>
          </div>
    </>
  );
};

export default Navbar;
