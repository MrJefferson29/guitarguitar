import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import daisy from "../../Assets/gui1.jpg";
import Ads from "./Ads";
import Sc2 from "./Sc2";
import { Row, Col } from "react-bootstrap";
import Discover from "./Discover";
import StoreInfo from "./Info";

export default function Sc1() {
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <Styles>
      <section className="hero-section">
        <div className="ad-wrap">
          <div className="ad">Ad of the week!</div>
          <div className="ad-content">
            <h2 className="ad-title">Gibson Montana</h2>
            <p className="ad-description">
              save up to 18% off these iconic acoustics
            </p>
            <div className="ad-price">$ 1,799</div>
          </div>
        </div>
      </section>
      <Ads />
      <Sc2 />
        <Discover />
        <StoreInfo />
    </Styles>
  );
}

const ProductItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  transition: box-shadow 0.3s ease;
  max-width: 100%;
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  }

  .product-icon {
    width: 48px;
    height: auto;
    margin-right: 1rem;
  }

  .product-info {
    flex-grow: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .product-name {
    font-size: 1.2rem;
    font-weight: 600;
  }

  .view-all {
    color: #ff9900;
    font-weight: 500;
    cursor: pointer;
  }
`;

const Styles = styled.div`
  body,
  html {
    overflow-x: hidden;
  }

  .hero-section {
    background-image: url(${daisy});
    background-size: cover;
    background-position: center;
    color: #fff;
    padding: 4rem 2rem;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  .ad-wrap {
    background: rgba(0, 0, 0, 0.5);
    padding: 2rem;
    border-radius: 8px;
    margin-top: 2rem;
  }

  .ad {
    background: #68cd1d;
    padding: 0.5rem 1rem;
    font-weight: bold;
    border: 2px solid #fff;
    border-radius: 4px;
    margin-bottom: 1rem;
  }

  .ad-title {
    font-size: 1.5rem;
    font-weight: bold;
  }

  .ad-description {
    font-size: 1.1rem;
    margin: 0.5rem 0;
  }

  .ad-price {
    font-size: 1.4rem;
    font-weight: bold;
    color: #f1c40f;
    margin-top: 1rem;
  }

  .product-list {
    padding: 2rem;
    background: #f9f9f9;
  }

  .show-more {
    font-weight: bold;
    text-decoration: underline;
    cursor: pointer;
    font-size: 1rem;
  }

  @media (min-width: 992px) {
    .hero-section {
      padding: 5rem 3rem;
    }

    .ad-title {
      font-size: 2rem;
    }

    .ad-description {
      font-size: 1.3rem;
    }

    .ad-price {
      font-size: 1.6rem;
    }

    .product-list {
      padding: 3rem;
    }

    .show-more {
      font-size: 1.2rem;
    }

    .product-icon {
      width: 64px;
    }

    .product-name {
      font-size: 1.4rem;
    }
  }

  @media (min-width: 1200px) {
    .hero-section {
      padding: 6rem 4rem;
    }

    .ad-title {
      font-size: 2.5rem;
    }

    .ad-description {
      font-size: 1.4rem;
    }

    .ad-price {
      font-size: 1.8rem;
    }

    .product-list {
      padding: 4rem;
    }

    .show-more {
      font-size: 1.4rem;
    }
  }

  .row {
    margin-right: 0;
    margin-left: 0;
  }
`;
