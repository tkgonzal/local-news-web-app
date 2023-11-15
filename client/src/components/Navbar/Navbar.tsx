import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

import { useUserContext } from "../../contexts/UserContext"

import Sidebar from "./Sidebar"

import { Weather } from "../../types/interfaces/Navbar/Weather"
import { LinkData } from "../../types/interfaces/Navbar/LinkData"

// import magnifyingGlassImg from "/assets/magnifying-glass-1976105_960_720.webp"

import "./Navbar.css"

// Constants
const OPEN_WEATHER_API_KEY: string = import.meta.env.VITE_OPEN_WEATHER_API_KEY

const Navbar: React.FC = () => {
  // const [navOpen, setNavOpen] = useState(false)
  // const [searchTerm, setSearchTerm] = useState("")
  const [weather, setWeather] = useState<Weather | null>(null)
  const homeNavigate = useNavigate()
  const { user, logout } = useUserContext()

  // Side Effects
  // Side effect to update the weather state if the user allows the app
  // to get their location and has a valid API key
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords
        // const geocodingUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`;
        const weatherData = await getWeatherByLocation(
          latitude,
          longitude,
          OPEN_WEATHER_API_KEY
        )

        if (weatherData) {
          setWeather(weatherData)
        }
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, [OPEN_WEATHER_API_KEY]);


  // Event Handlers
  const handleLogout = () => {
    user && alert(`User of email ${user.email} has been successfully logged out`)
    logout()
    homeNavigate("/")
  }

  //   const toggleNav = () => {
  //     setNavOpen(!navOpen);
  //   };

  // const inputChange = (e) => {
  //   setSearchTerm(e.target.value);
  // };

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   console.log("Searching for:", searchTerm);
  // };

  /**
   * @param latitude {number} The latitude of the user, as determined by their
   * geolocation
   * @param longitude {number} The longitude of the user, as determined by their
   * geolocation
   * @param apiKey {string} The API key from which to accecces the Open Weather 
   * API with
   * @returns A response from the Open Weather API with the relevent information
   * regarding the user's location's current weather if available 
   */
  const getWeatherByLocation = async (
    latitude: number, longitude: number, apiKey: string
  ) => {
    try {
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
      const response = await fetch(weatherUrl);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching weather data:", error);
      return null;
    }
  };

  // Converts kelvin to fahrenheit, for the weather temperature display
  const kelvinToFahrenheit = (kelvin: number) => {
    return ((kelvin - 273.15) * 9) / 5 + 32;
  };

  // An array of the different links to render on the Navbar's sidebar
  const sideBarLinks: LinkData[] = [
    { name: ["HOME"], url: ["/"] },
    {
      name: ["NEWS", "LOCAL", "CRIME", "GOVERNMENT",  "EDUCATION", "SPORTS"],
      url: [
        "/news", 
        "/news/local", 
        "/news/crime", 
        "/news/government", 
        "/news/education",
        "/"
      ]
    },
    { name: ["BUSINESS", "STAFF"], url: ["/business/articles", "/staff"] },
  ]

  return (
    <>
      <div className="nav-container">
        <div className="left-column">
          <Sidebar links={sideBarLinks} />
          {/* <button onClick={toggleNav}>sidebar placeholder</button>  */}
        </div>
        <nav className="nav-main">
          {weather && (
            <div className="weather-details">
              <img
                src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
                alt="weather icon"
                className="weather-icon"
              ></img>
              <p className="temperature">
                {kelvinToFahrenheit(weather.main.temp).toFixed(0)}°F
              </p>
              <p className="location">{weather.name}</p>
            </div>
          )}

          <div className="top-navbar-links">
            <ul>
              <li className="main-links">
                {
                  user ? 
                  <span onClick={handleLogout}>Logout</span> :
                  <Link to="/login">Login</Link>
                }
              </li>
              <li className="main-links">
                <Link to="/subscribe" className="subscribe-link">Subscribe</Link>
              </li>
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

      {/* Commented out search bar as it it not required for MVP */}
      {/* <div className="title">
        <form onSubmit={handleSearch} className="search-bar">
          <div className="">
            <img src={magnifyingGlassImg} alt="" className="mglass" />
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
      </div> */}
    </>
  );
};

export default Navbar;
