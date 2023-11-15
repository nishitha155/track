import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import backgroundImage from './images/pic2.png';
import logo1 from './images/farming.png'
import logo2 from './images/manufacturing.png'
import logo3 from './images/purchasing.png'


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  background-color: #f5f5f5;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 10px;
  animation: fadeIn 1s;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Button = styled.button`
  margin: 10px;
  padding: 10px 20px;
  background-color: #007b22;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;
  flex: 1;
  max-width: 150px;
  font-size: 18px;
  font-weight: 600;
  transform: scale(1);
  transition: transform 0.2s;

  &:hover {
    background-color: #43aa60;
    transform: scale(1.05);
  }
`;

const AccountNumber = styled.p`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;


const Logo = styled.img`
 width: 150px; /* Increase the width to make the logos bigger */
  height: 150px
`;

const Home = ({ state }) => {
  const { contract, account } = state;

  return (
    <>
      <Container>
        <AccountNumber>{account}</AccountNumber>
      </Container>
      <ButtonContainer>
        <Link to="/farmer">
          <Button>Farmer</Button>
        </Link>
        <Link to="/manufacturer">
          <Button>Manufacturer</Button>
        </Link>
        <Link to="/customer">
          <Button>Customer</Button>
        </Link>
      </ButtonContainer>
      <LogoContainer>
        <Link to='/farmer'><Logo src={logo1} alt="Farming" /></Link>
        <Link to='/manufacturer'><Logo src={logo2} alt="Manufacturing" /></Link>
        <Link to='/customer'><Logo src={logo3} alt="Purchasing" /></Link>
      
      </LogoContainer>
    </>
  );
};


export default Home;
