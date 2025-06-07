import React from "react";
import styled from "styled-components";
import br1 from "../../Assets/alf1.jpg";
import ma1 from "../../Assets/apple1.jpg";

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

  @media (min-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`;

const Content = styled.div`
  flex: 1;
  margin: 10px 0;

  @media (min-width: 768px) {
    margin: 0 20px;
    flex-basis: 48%; /* Ensures the text takes up around half the width on large screens */
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
`;

const List = styled.ul`
  list-style-type: disc;
  padding-left: 20px;
`;

const ListItem = styled.li`
  margin-bottom: 10px;
  line-height: 1.5;
`;

const ImageWrapper = styled.div`
  width: 100%;
  margin: 20px 0;

  img {
    width: 100%;
    max-width: 500px; /* Limits image size on larger screens */
    height: auto;
    margin: 0 auto;
    display: block;
  }

  @media (min-width: 768px) {
    flex-basis: 48%; /* Ensures images take up around half the width on large screens */
    margin: 20px auto;
  }
`;

const Footer = styled.footer`
  background: #f8f9fa;
  padding: 10px 20px;
  text-align: center;
  border-top: 1px solid #ddd;
`;

const AdBanner = styled.div`
  background: #ffcc00;
  color: #004d40;
  padding: 20px;
  text-align: center;
  margin: 20px 0;
`;

// Main component
const About = () => {
  return (
    <Container>
      <Header>
        <h1>French Bulldog Excellence</h1>
        <p>Your Trusted Source for Purebred puppies</p>
      </Header>

      <Section>
        <Content>
          <Title>About Us</Title>
          <Paragraph>
            AFrench Bulldog Kennel, we specialize in breeding and selling
            top-quality pupps to loving families. With over
            a decade of experience, we take pride in the ethical and careful
            breeding of French Bulldogs, ensuring that each pup is healthy,
            well-adjusted, and ready for its forever home.
          </Paragraph>
          <Paragraph>
            We operate with integrity and transparency, offering full support
            before, during, and after you welcome your puppy into your home.
            Our goal is not just to sell dogs but to match each one with the
            perfect family where they will thrive.
          </Paragraph>
        </Content>
        <ImageWrapper>
          <img src={ma1} alt="Cocker Spaniel Excellence" />
        </ImageWrapper>
      </Section>

      <AdBanner>
        <h2>Want to Meet Our  Support Service?</h2>
        <p>
          Contact us to schedule a visit and get to know our lovable puppies.
        </p>
      </AdBanner>

      <Section>
        <Content>
          <Title>Our Process</Title>
          <Paragraph>
            We follow a thorough process to ensure that every puppy we breed
            meets the highest standards of health and temperament. Our puppies
            are raised in a nurturing environment, receiving the best care from
            birth to the day they go to their new homes.
          </Paragraph>
          <List>
            <ListItem>
              Full veterinary checks including vaccinations and deworming.
            </ListItem>
            <ListItem>
              Proper socialization to ensure the puppies are friendly and
              adaptable.
            </ListItem>
            <ListItem>
              Early obedience training to set the foundation for a well-mannered
              dog.
            </ListItem>
            <ListItem>
              Strict adherence to breed standards, ensuring purebred,
              high-quality puppies.
            </ListItem>
          </List>
        </Content>
      </Section>

      <Section>
        <Content>
          <Title>Selective Adoption Process</Title>
          <Paragraph>
            At French Bulldog Kennel, we are highly selective about the homes we
            place our puppies in. Our dogs are not sold to just anyone. We
            carefully vet each potential family to ensure they can provide a
            safe, loving, and nurturing environment for our puppies.
          </Paragraph>
          <Paragraph>
            We look for homes where puppies will be treated as part of the
            family, receive proper exercise, and live in a stable environment.
            Our goal is to ensure that every dog we sell will have a happy and
            healthy life. We ask prospective owners to fill out an application
            and participate in an interview to ensure a perfect match.
          </Paragraph>
        </Content>
      </Section>

      <Section>
        <Content>
          <Title>Why Choose  us?</Title>
          <Paragraph>
            Choosing us means you are not only getting a
            high-quality dog but also becoming part of a community of puppy
            lovers. We stand out for several reasons:
          </Paragraph>
          <List>
            <ListItem>
              Exceptional care and love go into every puppy we raise.
            </ListItem>
            <ListItem>
              We provide lifelong support to our customers, offering advice and
              guidance as your puppy grows.
            </ListItem>
            <ListItem>
              Our puppies come with a health guarantee, ensuring peace of mind
              for their new owners.
            </ListItem>
            <ListItem>
              We have a long-standing reputation for honesty, integrity, and the
              ethical breeding of puppies.
            </ListItem>
          </List>
        </Content>
        <ImageWrapper>
          <img src={br1} alt="Why Choose Us" />
        </ImageWrapper>
      </Section>

      <Section>
        <Content>
          <Title>Our Values</Title>
          <Paragraph>
            We are committed to promoting responsible pet ownership and the
            well-being of every dog we breed. As dedicated French Bulldog lovers, we
            adhere to the highest ethical standards in all that we do.
          </Paragraph>
          <List>
            <ListItem>
              <strong>Health:</strong> We ensure all our dogs are in peak
              health, providing thorough veterinary care.
            </ListItem>
            <ListItem>
              <strong>Commitment:</strong> Every puppy is raised in a loving
              environment with individual attention and care.
            </ListItem>
            <ListItem>
              <strong>Trust:</strong> We build trust with our customers by being
              transparent about our breeding practices and always putting the
              dogs' well-being first.
            </ListItem>
          </List>
        </Content>
      </Section>

      <Footer>
        <p>&copy; 2024 French Bulldog Excellence. All rights reserved.</p>
      </Footer>
    </Container>
  );
};

export default About;
