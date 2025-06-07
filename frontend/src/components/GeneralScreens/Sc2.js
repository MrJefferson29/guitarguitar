import React, { useState } from "react";
import styled from "styled-components";
import { Row, Col, Container } from "react-bootstrap";
import { FiMail } from "react-icons/fi";
import be from "../../Assets/news2.jpg";
import de from "../../Assets/news1.jpg";
import TestimonialSlider from "./Testimonies";
import email from "../../Assets/email.webp";
import Red from "./Red";

export default function Sc2() {
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    if (email.trim() === "") {
      alert("Please enter your email address.");
    } else {
      alert(`Thank you for subscribing to our newsletter, ${email}`);
      setEmail("");
    }
  };

  return (
    <Styles>
      <Container>
        <Row className="rowa">
          <Col md={12} className="text-center">
            <FiMail color="white" size={50} />
            <h3>SUBSCRIBE TO OUR NEWSLETTER</h3>
            <div className="subscribe-form">
              <input
                type="email"
                placeholder="Your Email"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="submit-button" onClick={handleSubmit}>
                Submit
              </div>
            </div>

            <div className="checkboxes">
              <div className="checkbox">
                <input type="checkbox" id="bogs-newsletter" />
                <label htmlFor="bogs-newsletter">
                  Sign me up to our newsletter
                </label>
              </div>
              <div className="checkbox">
                <input type="checkbox" id="third-party-offers" />
                <label htmlFor="third-party-offers">
                  Send me offers and promotions!!
                </label>
              </div>
            </div>
          </Col>
        </Row>

        <Row className="content-row">
          <Col md={12} lg={6}>
            <img src={de} alt="Advice" />
          </Col>
          <Col md={12} lg={6}>
            <h2>GHOST Plays Queen’s Bohemian Rhapsody…in front of QUEEN!</h2>
            <p>
              It takes some guts to stand on a stage in front of rock titans
              Queen and play their most iconic song at them, doesn’t it? Well,
              this is exactly what Swedish metal behemoths Ghost have just gone
              and done! At a star-studded celebration bash for the Polar Music
              Prize, Ghost were the stars of the night’s entertainment. The band
              bolstered their ranks with a hull choir and none other than
              guitarguitar’s friend Fredrik Åkesson from Opeth on lead guitar!
              This is a version of Bohemian Rhapsody that you have not seen
              before!
            </p>
            <p className="read-more">read more</p>
            <hr />
          </Col>
        </Row>

        <Row className="content-row">
          <Col md={12} lg={6}>
            <img src={be} alt="News" />
          </Col>
          <Col md={12} lg={6}>
            <h2>Suhr Guitars: Factory visits</h2>
            <p>
              Lake Elsinore lies a little South East of greater Los Angeles,
              nestled behind the Santa Ana mountains and next to the freshwater
              lake itself. Compared to the sprawling bustle of LA, it’s a quiet
              lakeside town, idyllic and peaceful. Our team were headed there
              for a few reasons. One was to take the factory tour and check out
              the various areas and stages of workshop, building and finishing
              for every Suhr guitar. Another reason was to talk to the company
              about some very special new instruments which I’ll share news with
              you about somewhere down the line (its worth the wait!) and
              lastly, our guys were there to pick out some very specific pieces
              of timber.
            </p>
            <p className="read-more">read more</p>
            <hr />
          </Col>
        </Row>
      </Container>
    </Styles>
  );
}

const Styles = styled.div`
  .rowa {
    background-color: #212527;
    color: white;
    padding: 2rem 1rem;
    border-radius: 8px;
    margin: 1rem auto;
    max-width: 800px; /* Adjust width for larger screens */
  }

  .subscribe-form {
    display: flex;
    justify-content: center;
    margin: 1rem 0;
  }

  input[type="email"] {
    width: 60%;
    padding: 0.5rem;
    font-size: 1rem;
    border-radius: 3px;
    border: 1px solid #ccc;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.2s ease-in-out;
    margin-right: 1rem;
  }

  .submit-button {
    padding: 0.55rem;
    background-color: #ff9900;
    color: #fff;
    text-align: center;
    border-radius: 3px;
    cursor: pointer;
    font-weight: bold;
  }

  .checkboxes {
    margin-top: 1rem;
  }

  .checkbox {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  .checkbox input {
    width: 20px;
    height: 20px;
    margin-right: 0.5rem;
  }

  .content-row {
    padding: 1rem 0;
    display: flex;
    align-items: center;
  }

  img {
    width: 100%;
    border-radius: 3px;
  }

  h2 {
    font-size: 1.6rem;
    margin-top: 1rem;
    font-weight: bold;
  }

  h3 {
    font-size: 1.4rem;
    font-weight: bold;
  }

  p {
    font-size: 1rem;
  }

  .read-more {
    font-weight: 700;
    color: #ff9900;
    text-decoration: underline;
    cursor: pointer;
  }

  @media (min-width: 992px) {
    .rowa {
      max-width: 1200px; /* Adjust the width for larger screens */
    }

    .subscribe-form input[type="email"] {
      width: 50%;
    }
  }
`;
