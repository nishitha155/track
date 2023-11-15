import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import Header from '../components/Header';


const whiteColor = '#fff';
const lightGray = '#f5f5f5';

const pulseAnimation = keyframes`
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



const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 88vh;
  background-color: ${lightGray};
`;

const LoginForm = styled.form`
  background-color: ${whiteColor};
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 100%;
  max-width: 600px;
  margin: 20px;
  height: 450px;
`;

const FormTitle = styled.h2`
  margin: 20px 0;
  color: #47994b;
  font-family: sans-serif;
  font-size: 45px;
`;

const FormGroup = styled.div`
  position: relative;
  margin: 50px 0;
`;

const FormLabel = styled.label`
  position: absolute;
  top: -15px;
  left: 5px;
  font-size: 12px;
  color: black;
 
`;


const FormInput = styled.input`
  width: 95%;
  padding: 10px;
  border: none;
  border-bottom: 2px solid #b2adad;
  outline: none;
  
  font-size: 12px;
  
`;

const LoginButton = styled.button`
  background-color: #309a40;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.2s;
  animation: ${pulseAnimation} 1s infinite;

  &:hover {
    background-color: #309a40c2;
  }
`;


const Farmer_Register = ({ state }) => {
  const [name, setName] = useState('');
  const [address,setAddress]=useState('');
  const [userInfo, setUserInfo] = useState(null);

  const { contract, account } = state;

  const doRegister = async (event) => {
    event.preventDefault();
    console.log(name);
    await contract.registerFarmer(name,address);
  };

  return (
    <div>

    <Header state={state}></Header>
     
      <LoginContainer>
        <LoginForm onSubmit={doRegister}>
          <FormTitle>Registration</FormTitle>
          <FormGroup>
            <FormInput
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <FormLabel htmlFor="name" focused={name.length > 0} hasValue={name.length > 0}>Name</FormLabel>

          </FormGroup>
          <FormGroup>
            <FormInput
              id="address"
              type="text"
              value={address}
              onChange={(e)=>setAddress(e.target.value)}
              
            />
           <FormLabel htmlFor="address" focused={address.length > 0} hasValue={address.length > 0}>Address</FormLabel>

          </FormGroup>
          <FormGroup>
            <FormInput
              id="account"
              type="text"
              value={account}
              readOnly
            />
           <FormLabel htmlFor="account" focused={account.length > 0} hasValue={account.length > 0}>Account</FormLabel>

          </FormGroup>
          <LoginButton type="submit">Register</LoginButton>
        </LoginForm>
      </LoginContainer>
    </div>
  );
};

export default Farmer_Register;
