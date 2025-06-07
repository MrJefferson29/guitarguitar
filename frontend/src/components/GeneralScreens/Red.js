import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import in1 from "../../Assets/in1.webp";
import in2 from "../../Assets/in2.webp";
import in3 from "../../Assets/in3.webp";

const Red = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/all-pets");
  };

  const handleLogin = () => {
    navigate("/about");
  };

  return (
    <StyledContainer>
      <Content>
        <Heading>Adorable Maltese Puppies</Heading>
        <Subheading>We Love Puppies, Just as You Do!</Subheading>
        <Text>Welcome to Maltese puppies for adoption</Text>

        <ButtonContainer>
          <StyledButton onClick={handleRegister}>Visit Store</StyledButton>
          <StyledButton onClick={handleLogin}>Know More</StyledButton>
        </ButtonContainer>

        <Features>
          <FeatureCard>
            <img src={in1} alt="Experienced Breeders" />
            <FeatureTitle>Experienced & Licensed Breeders</FeatureTitle>
            <FeatureText>
              We respect each and every one of our beloved dogs.
            </FeatureText>
          </FeatureCard>
          <FeatureCard>
            <img src={in2} alt="Customer Service" />
            <FeatureTitle>24/7 Online Customer Service</FeatureTitle>
            <FeatureText>Contact us anytime for inquiries.</FeatureText>
          </FeatureCard>
          <FeatureCard>
            <img src={in3} alt="Secure Payments" />
            <FeatureTitle>100% Safe & Secure Payments</FeatureTitle>
            <FeatureText>Trusted by those who know us.</FeatureText>
          </FeatureCard>
        </Features>
      </Content>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
`;

const Content = styled.div`
  background: #ffffff;
  padding: 60px;
  max-width: 900px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

const Heading = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #4b0082;
  font-weight: bold;
`;

const Subheading = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #6c757d;
  font-weight: 500;
`;

const Text = styled.p`
  font-size: 1.1rem;
  color: #6c757d;
  margin-bottom: 3rem;
  line-height: 1.6;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
`;

const StyledButton = styled.button`
  background: linear-gradient(135deg, #4b0082, #3b0069);
  color: #ffffff;
  border: none;
  padding: 0.9rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 4px 10px rgba(75, 0, 130, 0.2);

  &:hover {
    background: linear-gradient(135deg, #3b0069, #29004b);
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(75, 0, 130, 0.3);
  }

  &:focus {
    outline: 2px solid #6a0dad;
    outline-offset: 3px;
  }
`;

const Features = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin-bottom: 2.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const FeatureCard = styled.div`
  background-color: #ffffff;
  width: 280px;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 12px 30px rgba(75, 0, 130, 0.15);
    transform: translateY(-8px);
  }

  img {
    width: 80px;
    height: 80px;
    margin-bottom: 15px;
    border-radius: 50%;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 320px;
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.6rem;
  margin-bottom: 0.8rem;
  color: #4b0082;
  font-weight: 600;
`;

const FeatureText = styled.p`
  font-size: 1rem;
  color: #6c757d;
  line-height: 1.5;
`;

export default Red;
