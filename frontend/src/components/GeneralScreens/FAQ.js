import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// Container for the entire FAQ section
const FAQContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 30px;
  font-family: "Open Sans", sans-serif;
  line-height: 1.7;
  color: #34495e;
  background: linear-gradient(135deg, #f9f9f9, #ecf0f1);
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  margin-top: 70px;
`;

// Title of the FAQ section
const FAQTitle = styled.h2`
  font-size: 32px;
  margin-bottom: 20px;
  color: #2c3e50;
  text-align: center;
  border-bottom: 4px solid #3498db;
  padding-bottom: 10px;
  letter-spacing: 2px;
  text-transform: uppercase;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    width: 50px;
    height: 5px;
    background-color: #e74c3c;
    left: 50%;
    transform: translateX(-50%);
    top: -15px;
  }
`;

// Subheading styles
const Subheading = styled.h3`
  font-size: 26px;
  margin: 25px 0 15px;
  color: #e74c3c;
  padding-left: 10px;
  border-left: 6px solid #3498db;
`;

// Paragraph styling
const Paragraph = styled.p`
  margin: 10px 0;
  font-size: 18px;
  color: #7f8c8d;
  background: #ffffff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ecf0f1;
  }
`;

// List styles for details under each section
const List = styled.ul`
  margin: 15px 0;
  padding-left: 25px;
`;

// List item styles
const ListItem = styled.li`
  font-size: 18px;
  color: #2c3e50;
  margin-bottom: 10px;
  position: relative;
  padding-left: 20px;
  text-shadow: 1px 1px #ecf0f1;

  &::before {
    content: "✔";
    color: #3498db;
    font-size: 16px;
    position: absolute;
    left: 0;
    top: 2px;
  }
`;

// Button-style component for added creative interactivity
const CTAButton = styled.button`
  background-color: #3498db;
  color: #fff;
  font-size: 18px;
  padding: 12px 24px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: bold;
  margin-top: 30px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  transition: background-color 0.4s ease, transform 0.3s ease;

  &:hover {
    background-color: #2980b9;
    transform: translateY(-3px);
  }
`;

const FAQ = () => {
  return (
    <FAQContainer>
      <FAQTitle>
        Buying a puppy: Your Guide to Choosing the Perfect Companion
      </FAQTitle>

      <Subheading>Introduction:</Subheading>
      <Paragraph>
        Bringing a French Bulldog pupp into your life can be a rewarding and
        heartwarming experience. These friendly and loyal dogs are known for
        their intelligence, versatility, and affectionate nature, making them
        one of the most popular breeds worldwide. However, before you make the
        decision to buy a puppy, it’s essential to do your research and consider
        various factors to ensure you find the perfect furry companion.
      </Paragraph>

      <Subheading>Understanding the Breed:</Subheading>
      <Paragraph>
        French Bulldogs & come in four standard colours: black, yellow, red, and
        chocolate. They are medium to large-sized dogs with a strong, athletic
        build. They are known for their friendly and outgoing
        personalities. They are excellent family dogs, and their playful nature
        makes them great companions for children. They are also intelligent
        and highly trainable, which is why they excel in various roles,
        including assistance dogs, search and rescue dogs, and hunting partners.
      </Paragraph>

      <Subheading>Finding a Reputable Breeder Like Adorable Labs:</Subheading>
      <Paragraph>
        When buying a puppy, it’s crucial to choose a reputable breeder. Avoid
        pet stores or online marketplaces, as these sources may not prioritise
        the health and well-being of their dogs.
      </Paragraph>
      <List>
        <ListItem>We have a clean and well-maintained facility.</ListItem>
        <ListItem>
          Provide proper health care, vaccinations, and a healthy diet for all
          our puppies.
        </ListItem>
        <ListItem>
          Give a written health guarantee and birth certificate.
        </ListItem>
        <ListItem>
          We allow you to meet the puppy’s parents, allowing you to assess their
          temperament.
        </ListItem>
        <ListItem>
          We are knowledgeable about the breed and its specific needs.
        </ListItem>
        <ListItem>
          We are a family-run business with children who interact daily with the
          puppies.
        </ListItem>
      </List>

      <Subheading>Puppy Socialisation:</Subheading>
      <Paragraph>
        Proper socialisation is crucial for pupps to grow into well-adjusted
        adults. Start socialising your puppy from an early age by
        exposing them to various people, places, and experiences. This helps
        prevent behavioural issues and ensures your puppy is comfortable in
        different situations.
      </Paragraph>

      <Subheading>Training and Exercise:</Subheading>
      <Paragraph>
        French Bulldogs are intelligent and energetic dogs that require mental
        stimulation and regular exercise. Enrol your puppy in puppy training
        classes to help them become well-behaved and obedient. Be prepared for
        daily walks, playtime, and interactive toys to keep them mentally
        engaged.
      </Paragraph>
      <Subheading>Grooming:</Subheading>
      <Paragraph>
        They have a short, dense coat that is relatively low-maintenance.
        Regular brushing helps reduce shedding and keeps their coat healthy.
        Additionally, clean their ears, trim their nails, and brush their teeth
        to maintain their overall hygiene.
      </Paragraph>

      <Subheading>Budgeting:</Subheading>
      <Paragraph>
        Owning a puppy comes with ongoing expenses, including food, grooming,
        veterinary care, and training. Make sure you have a budget in place to
        provide for your puppy's needs throughout their life.
      </Paragraph>

      <Subheading>Conclusion:</Subheading>
      <Paragraph>
        Buying a Puppy from us can be a wonderful decision for those seeking a
        loving and loyal companion. By selecting a reputable breeder,
        understanding the breed’s needs, and being prepared for the
        responsibilities of ownership, you can ensure a happy and healthy life
        for your puppy. With proper care and attention, your new puppy will
        become a cherished member of your family for years to come.
      </Paragraph>

      <Link to="/all-pets">
        {" "}
        <CTAButton>Get Started</CTAButton>{" "}
      </Link>
    </FAQContainer>
  );
};

export default FAQ;
