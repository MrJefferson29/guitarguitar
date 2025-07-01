
// src/components/Navbar.js
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { List } from "react-bootstrap-icons";
import Offcanvas from "react-bootstrap/Offcanvas";
import styled from "styled-components";
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

function Navbar() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const bool = localStorage.getItem("authToken") ? true : false;
  const [auth, setAuth] = useState(bool);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleNavigate = (path) => {
    navigate(path);
    handleClose();
  };

  const handleCategoryNav = (cat) => {
    const query = cat === "All" ? '' : `?category=${encodeURIComponent(cat)}`;
    handleNavigate(`/store${query}`);
  };

  useEffect(() => {
    setAuth(bool);
  }, [bool]);

  return (
    <NavbarContainer>
      <MenuIcon size={30} color="#343a40" onClick={handleShow} aria-label="Open menu" />
      <Offcanvas show={show} onHide={handleClose} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Categories</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ProductList>
            <ProductItem onClick={() => handleNavigate("/")}>Home</ProductItem>
            {auth && <ProductItem onClick={() => handleNavigate("/addStory")}>Post Guitar</ProductItem>}
            {categories.map(cat => (
              <ProductItem key={cat} onClick={() => handleCategoryNav(cat)}>
                {cat}
              </ProductItem>
            ))}
          </ProductList>
        </Offcanvas.Body>
      </Offcanvas>
    </NavbarContainer>
  );
}

export default Navbar;

const NavbarContainer = styled.div`
  position: relative;
`;

const MenuIcon = styled(List)`
  cursor: pointer;
`;

const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ProductItem = styled.div`
  padding: 0.75rem;
  cursor: pointer;
  border-radius: 4px;
  background-color: rgba(248,249,250,0.8);
  font-weight: bold;
  transition: background 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: rgba(255,153,0,0.8);
    color: #fff;
  }
`;
