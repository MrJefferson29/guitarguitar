// src/components/Header.js
import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../Assets/logo.png';
import Navbar from './Navbar';
import { AuthContext } from "../../Context/AuthContext";

const categories = [
  "All",
  "Electric",
  "Acoustic",
  "Bass",
  "Amps",
  "Pedals",
  "Studio",
  "PA",
  "Mics",
  "Keys & Pianos",
  "Drums"
];

export default function Header() {
  const [isMobile, setIsMobile] = useState(false);
  const bool = localStorage.getItem("authToken") ? true : false;
  const [auth, setAuth] = useState(bool);
  const { activeUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleResize = () => {
    setIsMobile(window.innerWidth < 1024);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setAuth(bool);
    const timer = setTimeout(() => setLoading(false), 1600);
    return () => clearTimeout(timer);
  }, [bool]);

  const handleCategoryNav = (cat) => {
    const query = cat === "All" ? '' : `?category=${encodeURIComponent(cat)}`;
    navigate(`/store${query}`);
  };

  return (
    <Styles>
      <div className="container">
        <Link to='/' className="logo-link">
          <img src={logo} alt="Logo" className="logo-image" />
        </Link>

        {!isMobile && (
          <div className="icon-wrapper">
            <Link className="link" to="/">Home</Link>
            {auth && <Link className="link" to="/addStory">Post Guitar</Link>}
            {categories.map(cat => (
              <button
                key={cat}
                className="link category-button"
                onClick={() => handleCategoryNav(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {isMobile && <Navbar />}
      </div>
    </Styles>
  );
}

const Styles = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  padding: 6px;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  height: 55px;

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 0 10px;
  }

  .logo-link {
    display: flex;
    align-items: center;
    height: 100%;
    text-decoration: none;
    color: #333;
    transition: transform 0.3s ease;
  }

  .logo-image {
    height: 95%;
    width: auto;
    object-fit: cover;
  }

  .icon-wrapper {
    display: flex;
    gap: 20px;
    align-items: center;
  }

  .link {
    font-size: 1rem;
    font-weight: 600;
    color: #333;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 5px;
    transition: color 0.3s ease, background-color 0.3s ease, transform 0.3s ease;
    text-decoration: none;
  }

  .link:hover {
    color: #ff9900;
    background-color: rgba(255, 153, 0, 0.1);
    transform: scale(1.05);
  }

  button.category-button {
    background: transparent;
  }
`;

