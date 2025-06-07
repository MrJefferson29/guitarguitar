import React from "react";
import styled from "styled-components";

const NoStories = () => (
  <Container>
    <Icon>🎸</Icon>
    <Heading>Oops! No Guitars Found</Heading>
    <Subtext>
      We couldn’t find any guitars matching your search or filters.
    </Subtext>
    <Advice>
      Try adjusting your search criteria, or check back later. Keep rocking! 🤘
    </Advice>
  </Container>
);

export default NoStories;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 1rem;
  max-width: 600px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const Icon = styled.div`
  font-size: 4rem;
  margin-bottom: 1.5rem;
  animation: swing 1.5s infinite ease-in-out;
  
  @keyframes swing {
    0%, 100% { transform: rotate(0deg); }
    50% { transform: rotate(15deg); }
  }
`;

const Heading = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 1rem;
  text-align: center;
`;

const Subtext = styled.p`
  font-size: 1.25rem;
  font-weight: 500;
  color: #555;
  text-align: center;
  margin-bottom: 1rem;
`;

const Advice = styled.p`
  font-size: 1rem;
  color: #777;
  text-align: center;
  line-height: 1.4;
`;
