import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { List } from "react-bootstrap-icons";
import Offcanvas from "react-bootstrap/Offcanvas";
import styled from "styled-components";
import { AuthContext } from "../../Context/AuthContext";

function Navbar() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate(); // Initialize navigate
  const bool = localStorage.getItem("authToken") ? true : false;
  const [auth, setAuth] = useState(bool);
  const { activeUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Handle navigation and close Offcanvas
  const handleNavigate = (path) => {
    navigate(path);
    handleClose(); // Close the navbar after navigation
  };

  useEffect(() => {
    setAuth(bool);
    setTimeout(() => {
      setLoading(false);
    }, 1600);
  }, [bool]);

  return (
    <NavbarContainer>
      <MenuIcon
        size={30}
        color="#343a40" // Dark color for the icon
        onClick={handleShow}
        aria-label="Open product categories menu"
      />
      <Offcanvas show={show} onHide={handleClose} placement="start">
        <OffcanvasHeader closeButton>
          <OffcanvasTitle />
        </OffcanvasHeader>
        <Offcanvas.Body>
          <ProductList>
            <ProductItem onClick={() => handleNavigate("/")}>Home</ProductItem>
            {auth && (
              <ProductItem onClick={() => handleNavigate("/addStory")}>
                Post Guitar
              </ProductItem>
            )}
            <ProductItem onClick={() => handleNavigate("/store")}>
              Our Store
            </ProductItem>
            <ProductItem onClick={() => handleNavigate("/store")}>
              Electric
            </ProductItem>
            <ProductItem onClick={() => handleNavigate("/store")}>
              Acoustic
            </ProductItem>
            <ProductItem onClick={() => handleNavigate("/store")}>
              Bass
            </ProductItem>
            <ProductItem onClick={() => handleNavigate("/store")}>
              Amps
            </ProductItem>
            <ProductItem onClick={() => handleNavigate("/store")}>
              Pedals
            </ProductItem>
            <ProductItem onClick={() => handleNavigate("/store")}>
              Studio
            </ProductItem>
            <ProductItem onClick={() => handleNavigate("/store")}>
              PA
            </ProductItem>
            <ProductItem onClick={() => handleNavigate("/store")}>
              Mics
            </ProductItem>
            <ProductItem onClick={() => handleNavigate("/store")}>
              Keys & Pianos
            </ProductItem>
            <ProductItem onClick={() => handleNavigate("/store")}>
              Drums
            </ProductItem>
          </ProductList>
        </Offcanvas.Body>
      </Offcanvas>
    </NavbarContainer>
  );
}

export default Navbar;

// Styled components
const NavbarContainer = styled.div`
  position: relative;
`;

const MenuIcon = styled(List)`
  cursor: pointer;
`;

const OffcanvasHeader = styled(Offcanvas.Header)`
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  height: 70px;
  border-bottom: none;
  padding: 0;
`;

const OffcanvasTitle = styled(Offcanvas.Title)`
  display: none;
`;

const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const ProductItem = styled.div`
  padding: 0.75rem;
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease;
  border-radius: 4px;
  background-color: rgba(
    248,
    249,
    250,
    0.8
  ); // Light background with transparency
  color: #333; // Dark text color
  font-weight: bold;

  &:hover {
    background-color: rgba(
      255,
      153,
      0,
      0.8
    ); // Change to your desired hover color with transparency
    color: #fff; // Change text color on hover
  }
`;
