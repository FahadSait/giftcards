import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;



const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%);
  animation: ${fadeIn} 1s ease-in-out;
`;




const Choice = () => {
  const navigate = useNavigate();
  useEffect(() => {

    const timer = setTimeout(() => {
      navigate('/option');
    }, 2000);

    return () => {
      clearTimeout(timer);

    }

  }, [navigate]);

  return (
    <Container className="welcome-heading">
      <h4 style={{ textAlign: 'center', marginTop: '50px', marginBottom: '50px', fontFamily: 'cursive', fontSize: '50px' }}>Welcome to the world of Gift Cards</h4>
    </Container>
  );
}



export default Choice;
