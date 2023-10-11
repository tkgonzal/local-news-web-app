import React, { useState } from "react";
import { NavbarProps } from "../../types/interfaces/NavInterface";
import Logo from "../Navbar/image 6.png";

const Sidebar: React.FC<NavbarProps> = ({ links }) => {
  return (
    <div className="left-container">
      <div className="logo">
        <img src={Logo} alt="logo" />
      </div>
      <ul>
        {links.map((link, index) => (
          <li key={index} className="left-main-links">
            <ul>
              {link.name.map((item, idx) => (
                <li className="left-links" key={idx}>
                  <a href={link.url[idx]}>{item}</a>
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
