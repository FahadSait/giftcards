import { useState } from 'react'; 
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; 
import styled, { keyframes } from 'styled-components';

// Define animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

// Styled components for the form
const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%);
  animation: ${fadeIn} 1s ease-in-out;
`;

const FormContainer = styled.div`
  background-color: #fff;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 350px;
  text-align: center;
  animation: ${fadeIn} 0.8s ease;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  color: #007bff;
  margin-bottom: 30px;
  animation: ${pulse} 2s infinite;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  transition: 0.3s ease;

  &:focus {
    border-color: #007bff;
    box-shadow: 0px 0px 5px rgba(0, 123, 255, 0.5);
    outline: none;
  }
`;

const SigninLink = styled(Link)`
  display: block;
  margin-top: 20px;
  text-decoration: none;
  color: #007bff;
  font-weight: bold;
  transition: color 0.3s ease;

  &:hover {
    color: #218838;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-top: 10px;
`;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/login', { email, password })
      .then(result => {
        if (result.data === "Success") {
          navigate('/dashboard')
        } else {
          setErrorMessage("Invalid email or password");
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <PageContainer>
      <FormContainer>
        <Title>Login</Title>
        <form onSubmit={handleSubmit}>
          <div>
            <Input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit">Login</Button>
        </form>
        <br></br>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <p>Don't have an account? </p>
        <SigninLink to='/register'>Register</SigninLink>
      </FormContainer>
    </PageContainer>
  );
}

export default Login;
