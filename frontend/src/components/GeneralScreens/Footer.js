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
    gap: 1rem;
    margin: 1rem 0;
    font-size: 2rem;
    align-items: center;
  }

  .icons a, .icons svg {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: rgba(255,255,255,0.06);
    color: #fff;
    transition: background 0.2s, color 0.2s, box-shadow 0.2s;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    font-size: 1.6em;
    cursor: pointer;
    text-decoration: none;
  }

  .icons a:hover[aria-label="Facebook"] {
    background: #1877f2;
    color: #fff;
    box-shadow: 0 4px 16px rgba(24,119,242,0.15);
  }
  .icons a:hover[aria-label="Instagram"] {
    background: radial-gradient(circle at 30% 110%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%);
    color: #fff;
    box-shadow: 0 4px 16px rgba(214,36,159,0.15);
  }
  .icons svg:hover {
    background: #222;
    color: #1da1f2;
    box-shadow: 0 4px 16px rgba(29,161,242,0.10);
  }
  .icons svg[aria-label="Tiktok"]:hover {
    background: #000;
    color: #fff;
  }
  .icons svg[aria-label="Youtube"]:hover {
    background: #ff0000;
    color: #fff;
  }

  @media (max-width: 600px) {
    .icons {
      gap: 0.5rem;
      font-size: 1.3rem;
    }
    .icons a, .icons svg {
      width: 34px;
      height: 34px;
      font-size: 1.1em;
    }
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
              "Retrieve Store Quote",
              "Finance FAQs",
              "Cookie Information",
              "Terms & Conditions",
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
              "News",
              "Education",
              "Our Privacy Policy",
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
            <a href="https://www.facebook.com/share/1Au7EAZ5XR/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF /></a>
            <a href="https://www.instagram.com/melodymart_?igsh=MXNiZ2oxY2RmdHoz&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
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
