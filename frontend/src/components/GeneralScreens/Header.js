import React, { useEffect, useState , useContext} from "react";
import styled from "styled-components";
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../Assets/logo.png';
import Navbar from './Navbar';
import { AuthContext } from "../../Context/AuthContext";

export default function Header() {
  const [isMobile, setIsMobile] = useState(false);
  const bool = localStorage.getItem("authToken") ? true : false
  const [auth, setAuth] = useState(bool)
  const { activeUser } = useContext(AuthContext)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const handleResize = () => {
    setIsMobile(window.innerWidth < 1024); // Set true for mobile screens
  };

  useEffect(() => {
    handleResize(); // Check initial size
    window.addEventListener("resize", handleResize); // Update on resize

    return () => window.removeEventListener("resize", handleResize); // Cleanup
  }, []);


  useEffect(() => {

    setAuth(bool)
    setTimeout(() => {
        setLoading(false)
    }, 1600)

}, [bool])

  return (
    <Styles>
      <div className="container">
        <Link to='/' className="logo-link">
          <img src={logo} alt="Logo" className="logo-image" />
          <div className="logo-text">
          </div>
        </Link>
        {!isMobile && ( // Render links only on larger screens
          <div className="icon-wrapper">
            <Link className="link" to="/">Home</Link>
            {auth?
            <Link className="link" to="/addStory">Post Guitar</Link>
            : <></>}
            <Link className="link" to="/store">Our Store</Link>
            <Link className="link" to="/store">Electric</Link>
            <Link className="link" to="/store">Acoustic</Link>
            <Link className="link" to="/store">Bass</Link>
            <Link className="link" to="/store">Amps</Link>
            <Link className="link" to="/store">Pedals</Link>
            <Link className="link" to="/store">Studio</Link>
            <Link className="link" to="/store">PA</Link>
            <Link className="link" to="/store">Mics</Link>
            <Link className="link" to="/store">Keys & Pianos</Link>
            <Link className="link" to="/store">Drums</Link>

          </div>
        )}
        {isMobile && <Navbar />} {/* Render Navbar only on mobile screens */}
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
    justify-content: space-between; // Keep logo on the left and navbar on the right
    align-items: center;
    width: 100%;
    height: 100%;
    position: relative;
    padding: 0 10px; // Add some padding for better spacing
  }

  .logo-link {
    display: flex;
    align-items: center;
    height: 100%;
    text-decoration: none;
    color: #333;
    transition: color 0.3s ease, transform 0.3s ease;
  }

  .logo-image {
    height: 95%;
    width: auto;
    object-fit: cover;
    margin-right: 10px;
    transition: transform 0.3s ease;
  }

  .logo-link:hover .logo-image {
    transform: scale(1.05);
  }

  .logo-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .logo-text span {
    font-size: 0.75rem;
    color: #555;
  }

  .icon-wrapper {
    display: flex;
    gap: 30px; /* Increased spacing for a more professional look */
    align-items: center;

    @media (max-width: 768px) {
      display: none; /* Hide on mobile screens */
    }
  }

  .icon-wrapper a {
    font-size: 1rem; /* Adjust font size for better readability */
    font-weight: 600; /* Slightly bolder text */
    color: #333;
    text-decoration: none; /* Remove underline */
    transition: color 0.3s ease, transform 0.3s ease;
    padding: 5px 10px; /* Add padding for a button-like effect */
    border-radius: 5px; /* Rounded corners for links */
    background-color: transparent; /* No background */
  }

  .icon-wrapper a:hover {
    color: #ff9900; /* Change color on hover */
    transform: scale(1.05); /* Slightly increase size on hover */
    background-color: rgba(255, 153, 0, 0.1); /* Light background on hover */
  }

  .search, .user, .plus {
    font-size: 22.5px;
    transition: color 0.3s ease;
  }

  @media (max-width: 1024px) {
    .navbar {
      position: absolute; // Position the navbar absolutely
      right: 0; // Align it to the right
      top: 55px; // Position it below the header
      width: 100%; // Ensure it takes full width
    }
  }
`;
