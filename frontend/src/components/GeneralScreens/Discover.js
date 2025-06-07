import React from "react";
import styled from "styled-components";
import { Container, Row, Col, Image } from "react-bootstrap";
import dad1 from '../../Assets/dad1.jpg';
import dad2 from '../../Assets/dad2.jpg';
import dad3 from '../../Assets/dad3.jpg';
import dad4 from '../../Assets/dad4.jpg';
import ghost from '../../Assets/ghost.jpg';
import ghost2 from '../../Assets/ghost2.jpg';
import ghost3 from '../../Assets/ghost3.jpg';
import ghost4 from '../../Assets/ghost4.jpg';

const articles = [
  {
    title: "Ultimate DAD ROCK Songs",
    date: "30 May 2025",
    image: dad1,
  },
  {
    title: "FATHER'S DAY Gift Guide and the New Sound of DAD ROCK (Updated for 2025)",
    date: "29 May 2025",
    image: dad2,
  },
  {
    title: "A Brief Guide to Aleister Crowley & Witchcraft in Music",
    date: "27 May 2025",
    image: dad3,
  },
  {
    title: "12 of The World’s STRANGEST Musical Instruments",
    date: "26 May 2025",
    image: dad4,
  },
];

const articlesRight = [
  {
    title: "GHOST Plays Queen’s Bohemian Rhapsody…in front of QUEEN!",
    date: "30 May 2025",
    image: ghost,
  },
  {
    title: "Fender Custom Shop Roundup May/June 2025",
    date: "28 May 2025",
    image: ghost2,
  },
  {
    title: "SATCHVAI: Ten Questions with Joe Satriani!",
    date: "26 May 2025",
    image: ghost3,
  },
  {
    title: "Suhr Guitars: Factory Visit!",
    date: "23 May 2025",
    image: ghost4,
  },
];

export default function Discover() {
  return (
    <Styles>
      <Container>
        <Row>
          <Col md={6}>
            {articles.map((article, idx) => (
              <div className="article" key={idx}>
                <Image src={article.image} thumbnail className="thumb" />
                <div>
                  <h6>{article.title}</h6>
                  <p className="date">{article.date}</p>
                </div>
              </div>
            ))}
          </Col>
          <Col md={6}>
            {articlesRight.map((article, idx) => (
              <div className="article" key={idx}>
                <Image src={article.image} thumbnail className="thumb" />
                <div>
                  <h6>{article.title}</h6>
                  <p className="date">{article.date}</p>
                </div>
              </div>
            ))}
          </Col>
        </Row>
      </Container>
    </Styles>
  );
}

const Styles = styled.div`
  padding: 2rem 0;

  .title {
    border-left: 4px solid #007bff;
    padding-left: 10px;
    font-weight: bold;
    margin-bottom: 1.5rem;
  }

  .article {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    .thumb {
      width: 100px;
      height: 100px;
      object-fit: cover;
      margin-right: 15px;
    }

    h6 {
      font-weight: 600;
      margin: 0;
    }

    .date {
      font-size: 0.85rem;
      color: #888;
    }
  }

  @media (max-width: 768px) {
    .article {
      flex-direction: column;
      align-items: flex-start;

      .thumb {
        margin-bottom: 10px;
      }
    }
  }
`;
