import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import gunsData from "./gunsData";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FiMail, FiHeart } from "react-icons/fi";

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
};

export default function GunDetails() {
  const [like, setLike] = useState(false);
  const handleLike = () => setLike(!like);

  const handleEmailClick = () => {
    const email = "malteseandmixespuppiesforadopt@gmail.com";
    const subject = `Purchase of ${gun.name}`;
    const body =
      `Dear Adoption Team,\n\n` +
      `I am interested in adopting ${gun.name} as part of my family\n\n` +
      `Could you please provide more details regarding its availability and delivery arrangements?\n\n` +
      `Thank you!\n\n` +
      `[Your Name]`;
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
  };

  const { name } = useParams();
  const gun = gunsData.find(
    (g) => g.name.replace(/\s+/g, "-").toLowerCase() === name.toLowerCase()
  );

  if (!gun) {
    return (
      <GunNotFoundStyles>
        <h2>Gun not found</h2>
        <Link to="/all-pets" className="back-link">
          Go back to listings
        </Link>
      </GunNotFoundStyles>
    );
  }

  const relatedGuns = gunsData.filter(
    (g) => g.category === gun.category && g.name !== gun.name
  );

  return (
    <GunDetailsStyles>
      <div className="carousel-wrapper">
        <Slider {...sliderSettings}>
          {gun.images.map((image, index) => (
            <div key={index} className="slide">
              <img src={image} alt={gun.name} className="carousel-img" />
            </div>
          ))}
        </Slider>
      </div>
      <div className="details-content">
        <h1 className="name">{gun.name}</h1>
        <p className="description">{gun.description}</p>
        <div className="info">
          <div className="info-left">
            <p>
              <strong>Category:</strong> {gun.category}
            </p>
            <p>
              <strong>Sex:</strong> {gun.sex}
            </p>
            <p>
              <strong>Age:</strong> {gun.age}
            </p>
            <p>
              <strong>Price:</strong> {gun.price}
            </p>
          </div>
          <div className="info-right">
            <p>
              <strong>Health:</strong> Regularly Vetted
            </p>
            <p>
              <strong>Vaccination:</strong> Up to date
            </p>
          </div>
        </div>
      </div>

      <div className="hero-box">
        <FiHeart
          onClick={handleLike}
          style={{
            color: like ? "#ff4500" : "#ddd",
            fill: like ? "#ff4500" : "none",
            fontSize: "2.6rem",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
        />
        <div className="block" onClick={handleEmailClick}>
          <FiMail
            style={{
              fontSize: "2.6rem",
              marginRight: "1.5rem",
              transition: "all 0.3s ease",
            }}
            className="mail"
          />
          <button className="send">Message</button>
        </div>
      </div>

      {relatedGuns.length > 0 && (
        <RelatedGunsStyles>
          <h2>You May Also Love</h2>
          <div className="horizontal-scroll">
            {relatedGuns.map((relatedGun, index) => (
              <Link
                key={index}
                to={`/pet/${relatedGun.name
                  .replace(/\s+/g, "-")
                  .toLowerCase()}`}
                className="related-gun-card"
              >
                <img
                  src={relatedGun.images[0]}
                  alt={relatedGun.name}
                  className="related-gun-img"
                />
                <div className="related-gun-info">
                  <p className="related-gun-name">{relatedGun.name}</p>
                  <p className="related-gun-price">{relatedGun.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </RelatedGunsStyles>
      )}
    </GunDetailsStyles>
  );
}

const GunDetailsStyles = styled.div`
  margin: 3rem auto;
  max-width: 1200px;
  font-family: "Roboto", sans-serif;
  color: #333;

  .carousel-wrapper {
    margin-bottom: 2.5rem;
    margin-top: 3rem;
    overflow: hidden;
    border-radius: 15px;
  }

  .carousel-img {
    width: 100%;
    height: 500px;
    object-fit: cover;
    border-radius: 12px;
    transition: transform 0.3s ease-in-out;
  }

  .carousel-img:hover {
    transform: scale(1.05);
  }

  .details-content {
    width: 100%;
    text-align: left;
    padding: 0 2rem;
    box-sizing: border-box;
  }

  .name {
    font-size: 2.8rem;
    font-weight: 900;
    margin-bottom: 1.5rem;
    color: #1d1d1d;
  }

  .description {
    font-size: 1.4rem;
    line-height: 1.8;
    margin-bottom: 2rem;
    color: #666;
  }

  .info {
    display: flex;
    justify-content: space-between;
    font-size: 1.3rem;
    font-weight: 400;
    color: #444;
  }

  .info-left,
  .info-right {
    padding-bottom: 1.5rem;
  }

  .info-left p,
  .info-right p {
    margin: 0.5rem 0;
  }

  .hero-box {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 650px;
    background-color: #2a2a2a;
    color: #fff;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
    text-align: center;
    padding: 25px 30px;
    font-size: 1.5rem;
    z-index: 1000;
    display: flex;
    justify-content: space-between;
    border-radius: 12px 12px 0 0;
    transition: all 0.3s ease;
  }

  .hero-box:hover {
    background-color: #333;
  }

  .send {
    background-color: #ff4500;
    border: none;
    padding: 1rem 2rem;
    border-radius: 8px;
    color: white;
    cursor: pointer;
    font-size: 1.3rem;
    transition: background-color 0.3s ease-in-out;
  }

  .send:hover {
    background-color: #e03c00;
  }

  .block:hover .send {
    background-color: #444;
  }

  @media (max-width: 768px) {
    .carousel-img {
      height: 300px;
    }

    .name {
      font-size: 2rem;
    }

    .description {
      font-size: 1.2rem;
    }

    .info {
      flex-direction: column;
      font-size: 1.1rem;
    }
  }
`;

const GunNotFoundStyles = styled.div`
  text-align: center;
  margin: 2rem auto;
  font-family: "Roboto", sans-serif;

  h2 {
    font-size: 2.4rem;
    margin-bottom: 1rem;
    color: #444;
  }

  .back-link {
    font-size: 1.2rem;
    color: #0066cc;
    text-decoration: none;
    transition: color 0.3s ease;
  }

  .back-link:hover {
    color: #ff4500;
    text-decoration: underline;
  }
`;

const RelatedGunsStyles = styled.div`
  margin-top: 3rem;
  background-color: #f9f9f9;
  padding: 2rem 0;

  h2 {
    margin: 1rem 0;
    font-size: 2rem;
    color: #333;
    font-weight: 700;
    text-align: center;
  }

  .horizontal-scroll {
    display: flex;
    overflow-x: auto;
    padding: 1rem 0;
    gap: 1.5rem;
  }

  .horizontal-scroll::-webkit-scrollbar {
    display: none;
  }

  .related-gun-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    color: inherit;
    min-width: 250px;
    padding: 25px;
    border-radius: 12px;
    background-color: #ffffff;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    overflow: hidden;
  }

  .related-gun-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
  }

  .related-gun-img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 1rem;
  }

  .related-gun-info {
    text-align: center;
  }

  .related-gun-name {
    font-size: 1.2rem;
    color: #444;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }

  .related-gun-price {
    font-size: 1.3rem;
    font-weight: bold;
    color: #ff4500;
  }

  @media (max-width: 768px) {
    .related-gun-card {
      min-width: 220px;
    }

    .related-gun-name {
      font-size: 1.1rem;
    }

    .related-gun-price {
      font-size: 1.2rem;
    }
  }
`;
