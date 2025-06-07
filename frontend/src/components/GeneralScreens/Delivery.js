import React from 'react';
import styled from 'styled-components';

const DeliverySection = styled.section`
  padding: 20px;
  background-color: #f9f9f9;
  color: #333;
  font-family: 'Arial', sans-serif;
`;
const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: #4a90e2;
  text-align: center;
`;
const Paragraph = styled.p`
  font-size: 1rem;
  line-height: 1.8;
  margin-bottom: 15px;
`;
const SubTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin-top: 20px;
  margin-bottom: 10px;
`;
const List = styled.ul`
  list-style-type: none;
  padding-left: 0;
  margin-bottom: 20px;
`;
const ListItem = styled.li`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 10px;
  &:before {
    content: '✔';
    color: #4a90e2;
    margin-right: 10px;
  }
`;
const Highlight = styled.span`
  color: #4a90e2;
  font-weight: bold;
`;
const Delivery = () => {
  return (
    <DeliverySection>
      <SectionTitle>Delivery Process</SectionTitle>
      <Paragraph>
        At <Highlight>Adorable French Bulldog Home</Highlight>, we take pride in offering only the
        highest quality and healthiest puppies. Each puppy is considered a member of our family,
        and we care for them as if they are coming to live with us. While we know you are eager to
        welcome your puppy home, we must comply with state and international regulations to ensure
        your puppy's safety.
      </Paragraph>
      <SubTitle>Delivery Arrangements</SubTitle>
      <Paragraph>
        If you live too far to pick up your puppy in person, we offer two delivery options:
      </Paragraph>
      <List>
        <ListItem>
          Same-day or next-day delivery within the US.
        </ListItem>
        <ListItem>
          International delivery within 72 hours of departure.
        </ListItem>
      </List>
      <Paragraph>
        Your puppy can either be delivered to the nearest airport or hand-delivered to your home.
        Delivery costs vary based on your location. Please be aware that delays may occur due to
        weather or other unforeseen circumstances.
      </Paragraph>
      <SubTitle>General Airline Requirements</SubTitle>
      <List>
        <ListItem>The puppy must be at least 8 weeks old.</ListItem>
        <ListItem>A veterinarian health/acclimation certificate is required.</ListItem>
        <ListItem>Airlines may have temperature restrictions for both departure and arrival.</ListItem>
      </List>
      <SubTitle>Cost of Shipping</SubTitle>
      <Paragraph>
        Shipping costs depend on several factors including the veterinarian certificate, the travel
        kennel size, and airfreight charges which are based on the puppy's weight and crate size.
      </Paragraph>
      <SubTitle>Information Needed for Shipping</SubTitle>
      <Paragraph>
        If you decide to have your puppy shipped, we will need the following information:
      </Paragraph>
      <List>
        <ListItem>Your full name (matching your I.D.)</ListItem>
        <ListItem>A backup contact with I.D.</ListItem>
        <ListItem>Your physical address (no P.O. boxes)</ListItem>
        <ListItem>Two reachable phone numbers</ListItem>
        <ListItem>Your county and preferred airport</ListItem>
        <ListItem>The name of the puppy you’re interested in</ListItem>
      </List>
      <SubTitle>Safe and Comfortable Shipping Process</SubTitle>
      <Paragraph>
        Shipping your puppy may seem concerning, but we ensure that the process is safe and
        comfortable. Puppies can either be shipped in the cargo compartment or with a pet nanny who
        flies in-cabin with your puppy. We make sure all puppies are vaccinated with <Highlight>Bordetella</Highlight>
        before shipping to minimize health risks.
      </Paragraph>
    </DeliverySection>
  );
};
export default Delivery;
