import React from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

// Define animations
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

// Styled components for the links and container
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%);
  animation: ${fadeIn} 1s ease-in-out;
`;

const StyledLink = styled(Link)`
  display: block;
  font-size: 2rem;
  color: white;
  background-color: #007bff;
  padding: 15px 30px;
  margin: 20px;
  border-radius: 50px;
  text-decoration: none;
  text-align: center;
  width: 200px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, background-color 0.3s ease;
  animation: ${slideIn} 0.7s ease forwards;
  
  &:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }
  
  &:nth-child(1) {
    animation-delay: 0.2s;
  }
  
  &:nth-child(3) {
    animation-delay: 0.4s;
  }
`;

const Divider = styled.hr`
  width: 80%;
  border: 1px solid #fff;
  opacity: 0.5;
`;

function Option() {
  return (
    <Container>
      <StyledLink to="/login">Login</StyledLink>
      <Divider />
      <StyledLink to="/register">Register</StyledLink>
    </Container>
  );
}

export default Option;
