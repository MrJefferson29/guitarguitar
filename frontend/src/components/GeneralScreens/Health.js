import React from "react";
import styled from "styled-components";

// Styled components
const Container = styled.div`
  font-family: "Arial", sans-serif;
  color: #333;
  padding: 20px;
  margin-top: 3.5rem;
`;

const Header = styled.header`
  background: #004d40;
  color: #fff;
  padding: 20px;
  text-align: center;
`;

const Section = styled.section`
  margin: 20px 0;
  column-count: 1;
  column-gap: 40px;

  @media (min-width: 1024px) {
    column-count: 2;
  }
`;

const Title = styled.h2`
  color: #ffcc00;
  margin-bottom: 10px;
  font-size: 24px;
`;

const Paragraph = styled.p`
  line-height: 1.6;
  margin-bottom: 15px;
  break-inside: avoid;
`;

const List = styled.ul`
  list-style-type: disc;
  padding-left: 20px;
`;

const ListItem = styled.li`
  margin-bottom: 10px;
  line-height: 1.5;
  break-inside: avoid;
`;

const Footer = styled.footer`
  background: #f8f9fa;
  padding: 10px 20px;
  text-align: center;
  border-top: 1px solid #ddd;
`;

// Main component
const Health = () => {
  return (
    <Container>
      <Header>
        <h1>Health Guarantee</h1>
        <p>Your puppy's Health, Our Commitment</p>
      </Header>

      <Section>
        <Title>Our Commitment to Your Puppy's Health</Title>
        <Paragraph>
          We take pride in the fact that our relationship with you does not end
          when you take home a puppy from us. As a conscientious breeder and
          die-hard puppy lovers, we’d like to believe that nothing can go wrong
          with our puppies. However, some factors like genetics, exercise,
          nourishment, and overall care may impact a puppy’s health. While we
          can't guarantee your puppy will never face health issues, we will
          always be here to help and provide support, even beyond our guarantee
          coverage.
        </Paragraph>
        <Paragraph>
          Our commitment is to do our very best to ensure your new family member
          is healthy and thriving, but we also understand that life can be
          unpredictable. Below is our detailed health guarantee and what it
          entails.
        </Paragraph>
      </Section>

      <Section>
        <Title>Our Health Guarantee</Title>
        <Paragraph>
          While we do not believe your puppy is replaceable, we understand that
          another furry companion can sometimes help ease the pain. In the
          unfortunate event of your pupp's death due to genetics within two
          years from birth, or if a congenital or hereditary disorder is found
          that adversely affects the health of your puppy within this period, we
          will replace your puppy with another of equivalent value at no
          cost. The cause of death or condition must be certified by a licensed
          veterinarian.
        </Paragraph>
        <Paragraph>
          If the death occurs after two years but within ten years, we will
          issue a credit of 70% of the original purchase price towards a
          replacement puppy of equivalent value. Again, the cause of death must
          be certified by a licensed veterinarian.
        </Paragraph>
      </Section>

      <Section>
        <Title>What We Need From You</Title>
        <Paragraph>
          We are thrilled to provide you with a healthy pupp, but we need
          your help to ensure their continued health and happiness. Here's how
          you can assist in maintaining your pup’s well-being:
        </Paragraph>
        <List>
          <ListItem>
            Submit a copy of your puppy’s medical examination performed by a
            licensed veterinarian within 2 business days of receiving your
            puppy.
          </ListItem>
          <ListItem>
            Continue all recommended vaccinations and regular veterinary care,
            including de-worming until at least 16 weeks of age or as advised by
            your vet.
          </ListItem>
        </List>
      </Section>

      <Section>
        <Title>Exceptions to Our Guarantee</Title>
        <Paragraph>
          While we strive to provide the best, there are a few conditions where
          our health guarantee does not apply:
        </Paragraph>
        <List>
          <ListItem>
            We cannot guarantee the disposition, size, color, or markings of
            your puppy.
          </ListItem>
          <ListItem>
            No replacements are given if breeds prone to hip dysplasia become
            overweight.
          </ListItem>
          <ListItem>
            Failure to provide timely vaccinations or veterinary care voids the
            health guarantee.
          </ListItem>
          <ListItem>
            We do not cover any spaying or neutering costs, including
            undescended testes.
          </ListItem>
        </List>
      </Section>

      <Footer>
        <p>&copy; French Bulldog Kennel US. All rights reserved.</p>
      </Footer>
    </Container>
  );
};

export default Health;
