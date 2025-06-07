import React from 'react';
import styled from 'styled-components';
import { FaFacebookF, FaTwitter, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';

const FooterWrapper = styled.footer`
  background-color: #0f1e27;
  color: white;
  padding: 3rem 1rem 2rem;
  font-size: 0.9rem;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: auto;
`;

const Section = styled.div``;

const Heading = styled.h3`
  font-weight: bold;
  margin-bottom: 1rem;
`;

const LinkList = styled.ul`
  list-style: none;
  padding: 0;
`;

const LinkItem = styled.li`
  margin-bottom: 0.5rem;
  color: #ccc;

  a {
    color: inherit;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Contact = styled.div`
  font-size: 1rem;

  p {
    margin: 0.3rem 0;
    color: #ccc;
  }

  .phone {
    font-size: 1.2rem;
    font-weight: bold;
    color: white;
    margin: 0.5rem 0;
  }

  .icons {
    display: flex;
    gap: 0.6rem;
    margin: 1rem 0;
    font-size: 1.2rem;
  }

  img {
    margin-top: 0.5rem;
    width: 130px;
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 2rem;
  font-size: 0.75rem;
  color: #aaa;
  max-width: 900px;
  margin: auto;
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <Container>
        {/* Customer Service */}
        <Section>
          <Heading>Customer Service</Heading>
          <LinkList>
            {[
              "Contact us",
              "Delivery Information",
              "Returns Policy",
              "Track my Order",
              "Retrieve Store Quote",
              "Finance FAQs",
              "Cookie Information",
              "Terms & Conditions",
              "Klarna Information",
              "Clearpay Information",
            ].map((text) => (
              <LinkItem key={text}><a href="#">{text}</a></LinkItem>
            ))}
          </LinkList>
        </Section>

        {/* Our Stores */}
        <Section>
          <Heading>Our Stores</Heading>
          <LinkList>
            {["Tampa, FL", "Nashville, TN", "Austin, TX", "Seattle, WA", "Portland, OR", "Newcastle, UK"].map((store) => (
              <LinkItem key={store}><a href="#">{store}</a></LinkItem>
            ))}
          </LinkList>
        </Section>

        {/* guitarguitar */}
        <Section>
          <Heading>guitarguitar</Heading>
          <LinkList>
            {[
              "About Us",
              "E-Gift Cards",
              "Trade it. Sell it.",
              "News",
              "Education",
              "Music Therapy Charity",
              "Our Privacy Policy",
              "Vacancies",
            ].map((item) => (
              <LinkItem key={item}><a href="#">{item}</a></LinkItem>
            ))}
          </LinkList>
        </Section>

        {/* Contact */}
        <Contact>
          <Heading>Contact Us</Heading>
          <p>Mon - Sat 10am to 5:30pm</p>
          <p>Sun 11am to 5pm</p>
          <div className="icons">
            <FaFacebookF />
            <FaTwitter />
            <FaInstagram />
            <FaTiktok />
            <FaYoutube />
          </div>
        </Contact>
      </Container>

      <Copyright>
        <p>
          Credit subject to status and affordability. Minimum spend applies. Terms & Conditions Apply. Guitar Guitar Limited acts as a credit broker not a lender and is Authorised and Regulated by the Financial Conduct Authority.
        </p>
        <p className="mt-2">
          © Copyright 2025 GUITARGUITAR Limited. All rights reserved.
        </p>
      </Copyright>
    </FooterWrapper>
  );
};

export default Footer;
