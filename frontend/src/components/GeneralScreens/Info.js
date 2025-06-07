import React from "react";
import styled from "styled-components";
import backi from '../../Assets/backi.jpg';

export default function StoreInfo() {
  return (
    <Wrapper>
      <div className="overlay">
        <div className="info-box">
          <h3>Edinburgh Store</h3>
          <p className="contact">0131 334 7100</p>
          <p className="contact">edin@guitarguitar.co.uk</p>

          <div className="hours">
            <strong>Opening Hours</strong>
            <p>Mon - Sat: <strong>10:00am - 05:30pm</strong></p>
            <p>Sun: <strong>11:00am - 05:00pm</strong></p>
          </div>

          <button className="store-button" to="/store">View Store Details</button>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-image: url(${backi}); /* Replace with actual path */
  background-size: cover;
  background-position: center;
  height: 500px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  .overlay {
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 5%;

    .info-box {
      background-color: rgba(0, 0, 0, 0.85);
      color: white;
      padding: 2rem;
      max-width: 300px;
      border-radius: 4px;

      h3 {
        margin-bottom: 1rem;
        border-bottom: 2px solid #00bfff;
        padding-bottom: 0.5rem;
      }

      .contact {
        margin: 0.2rem 0;
      }

      .hours {
        margin-top: 1rem;
        font-size: 0.9rem;
      }

      .store-button {
        margin-top: 1.5rem;
        background-color: #f90;
        border: none;
        color: white;
        font-weight: bold;
        padding: 0.5rem 1rem;
        border-radius: 3px;
        cursor: pointer;
        transition: background 0.3s ease;

        &:hover {
          background-color: #e67e00;
        }
      }
    }
  }

  @media (max-width: 768px) {
    height: auto;
    .overlay {
      padding: 2rem 1rem;
      .info-box {
        width: 100%;
      }
    }
  }
`;
