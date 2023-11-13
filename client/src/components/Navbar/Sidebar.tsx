import React from "react"
import { Link, useNavigate } from "react-router-dom"

import { NavbarProps } from "../../types/interfaces/Navbar/NavInterface"

import moNewsLogo from "/assets/mo_news_logo_white.png"

const Sidebar: React.FC<NavbarProps> = ({ links }) => {
  const homeNavigate = useNavigate()

  return (
    <div className="left-container">
      <div 
        className="logo"
        onClick={() => homeNavigate("/")}
      >
        <img src={moNewsLogo} alt="logo" />
      </div>
      <ul>
        {links.map((link, index) => (
          <li key={index} className="left-main-links">
            <ul>
              {link.name.map((item, idx) => (
                <li className="left-links" key={idx}>
                  <Link to={link.url[idx]}>{item}</Link>
                </li>
              ))}
            </ul>{" "}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
