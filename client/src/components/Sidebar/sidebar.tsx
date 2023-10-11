import React, { useState } from "react";
import { NavbarProps } from "../../types/interfaces/NavInterface";

const Sidebar: React.FC<NavbarProps> = ({ links }) => {
  const [selectedLink, setSelectedLink] = useState(null);

  const handleLinkClick = (index) => {
    setSelectedLink(index === selectedLink ? null : index);
  };

  return (
    <div className="left-container">
      <ul>
        {links.map((link, index) => (
          <li key={index} className="left-main-links">
            <h2 onClick={() => handleLinkClick(index)}>{link.title}</h2>
            {selectedLink === index && (
              <ul>
                {link.name.map((item, idx) => (
                  <li className="left-links" key={idx}>
                    <a href={link.url[idx]}>{item}</a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;