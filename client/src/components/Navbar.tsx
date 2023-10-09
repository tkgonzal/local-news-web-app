import React, {useState, useRef} from 'react';
import './Navbar.css'

interface NavbarProps {
    title: string;
    links: { 
        name: string;
         url: string
         }[];
}

const Navbar: React.FC<NavbarProps> = ({ title, links }) => {
    // const navRef = useRef(null);
    const [navOpen, setNavOpen] = useState(false);

    const toggleNav = () => {
        setNavOpen(!navOpen);
      };

    return (
        <nav className='nav-main'>
            <div className="hamburger-menu">

            <button onClick={toggleNav}>sidebar placeholder</button>
            </div>

            <div className="title">
            <h1>{title}</h1>
            </div>

            <div className="top-navbar-links">

            <ul>
                {links.map((link, index) => (
                    <li key={index} className='main-links'>
                        <a href={link.url}>{link.name}</a>
                    </li>
                ))}
            </ul>
                </div>

            {navOpen && <div>Content for open sidebar</div>}

        </nav>
    );
};

export default Navbar;
