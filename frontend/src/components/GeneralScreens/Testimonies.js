import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

// Testimonial data
const testimonials = [
  {
    name: "Dawn, Derek",
    feedback:
      "We are so happy we found Catharine and The Happiest pupp. Our Bentley never stops wagging her tail. She loves being around people of all ages and other dogs. Catharine kept us informed during the entire process and all of the AKC information matched up perfectly. Our vet even asked who our breeder was as he said she was a “very healthy and happy puppy.",
    location: "Soho, UK",
    rating: 5,
  },
  {
    name: "Miller Temili",
    feedback:
      "I got Maggie (then named espresso) from happiest puppy in the fall of 2019. I knew from photos of her as a newborn that she was meant to be my companion. Her puppyhood was one of the easiest I’ve experienced. Her temperament and mannerisms were so mellow and calm and weren’t high strung like the British French Bulldog, which is what I wanted. She’s just the sweetest girl and I’m so blessed to have come across happiest puppy and gain a best friend.",
    location: "Los Angeles, CA",
    rating: 4.5,
  },
  {
    name: "Michael Harrington",
    feedback:
      "Ember is doing great she has been perfect honestly, she is the sweetest and best dog. She loves kittens, kids, and any animal she meets. She’s very spoiled and gets to go to work with me everyday and is the office baby. I get compliments on her regularly and she is loved by everyone that meets her.",
    location: "Abergavenny",
    rating: 4,
  },
  {
    name: "Gemma Rose",
    feedback:
      "I picked up my chocolate French Bulldog pup on June 12th, and thought you guys might appreciate an update - This is Talulah (or Ms. Green) and she has the biggest, sassiest personality. She thinks she’s much bigger than she is, and only likes playing with bigger dogs - and is very food driven 🙂 She’s hungry 24/7! She’s been the best addition to our family and she’ll be making the move to Scottsdale, Arizona, with us in a few months!",
    location: "Bradford",
    rating: 5,
  },
  {
    name: "Meatball's new family",
    feedback:
      "Wilson (nickname Meatball) has brought so much joy to our lives. He's 19.5 pounds. Healthy as a horse. House broken for 2 weeks. Best student at obedience training. You really brought joy to our family. Thank you.",
    location: "Leeds",
    rating: 4.5,
  },
];

// Helper function to render star ratings
const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <>
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={`full-${i}`} color="#FFD700" />
      ))}
      {halfStar && <FaStarHalfAlt color="#FFD700" />}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={`empty-${i}`} color="#FFD700" />
      ))}
    </>
  );
};

// Styled components
const Container = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 0;

  @media (max-width: 576px) {
    padding: 1rem 0;
  }
`;

const TestimonialCard = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Stars = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

const Feedback = styled.p`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 1.5rem;
  font-weight: 400;
  line-height: 1.8;
  max-width: 85%;
  margin: 0 auto;
  font-style: italic;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }

  @media (max-width: 576px) {
    font-size: 1rem;
  }
`;

const Name = styled.h3`
  font-size: 1.4rem;
  color: #222;
  margin-bottom: 0.5rem;
  font-weight: 600;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }

  @media (max-width: 576px) {
    font-size: 1.1rem;
  }
`;

const Location = styled.p`
  font-size: 1rem;
  color: #666;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 576px) {
    font-size: 0.85rem;
  }
`;

const TestimonialSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
  };

  return (
    <Container>
      <Slider {...settings}>
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={index}
            aria-label={`Testimonial from ${testimonial.name}`}
          >
            <Stars>{renderStars(testimonial.rating)}</Stars>
            <Feedback>"{testimonial.feedback}"</Feedback>
            <Name>{testimonial.name}</Name>
            <Location>{testimonial.location}</Location>
          </TestimonialCard>
        ))}
      </Slider>
    </Container>
  );
};

export default TestimonialSlider;
