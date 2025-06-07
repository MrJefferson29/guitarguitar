import React from 'react';
import styled from 'styled-components';

// Container for the entire contact us page
const ContactUsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);

  @media (min-width: 768px) {
    padding: 50px;
  }
`;

// Contact form box
const ContactBox = styled.div`
  background-color: #ffffff;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
  text-align: center;

  @media (min-width: 768px) {
    max-width: 700px;
    padding: 50px;
  }
`;

// Title of the form
const Title = styled.h1`
  font-size: 28px;
  color: #34495e;
  margin-bottom: 20px;
  letter-spacing: 1px;
  text-transform: uppercase;
  border-bottom: 3px solid #3498db;
  display: inline-block;
  padding-bottom: 8px;

  @media (min-width: 768px) {
    font-size: 36px;
  }
`;

// Paragraph description
const Description = styled.p`
  font-size: 18px;
  color: #7f8c8d;
  margin-bottom: 30px;

  @media (min-width: 768px) {
    font-size: 20px;
  }
`;

// Email Button
const EmailButton = styled.button`
  background-color: #3498db;
  color: #ffffff;
  border: none;
  padding: 12px 30px;
  font-size: 18px;
  border-radius: 50px;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #2980b9;
    transform: translateY(-3px);
  }

  @media (min-width: 768px) {
    font-size: 20px;
    padding: 15px 40px;
  }
`;

// Open the email client with a pre-filled message
const handleEmailClick = () => {
  window.location.href = "frenchbulldogkennel.help@gmail.com";
};

const Contact = () => {
  return (
    <ContactUsContainer>
      <ContactBox>
        <Title>Contact Us</Title>
        <Description>
          We'd love to hear from you! Please feel free to get in touch using the button below, and we will get back to you as soon as possible.
        </Description>
        <EmailButton onClick={handleEmailClick}>Send Email</EmailButton>
      </ContactBox>
    </ContactUsContainer>
  );
};

export default Contact;
