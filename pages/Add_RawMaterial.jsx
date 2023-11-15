import  { useState } from 'react';
import { ethers } from 'ethers';  
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
  height: 650px;
`;

const FormTitle = styled.h2`
  margin: 20px 0;
  color: #47994b;
  font-family: sans-serif;
  font-size: 45px;
`;

const FormGroup = styled.div`
  position: relative;
  margin: 20px 0;
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



const Add_RawMaterial = ({ state }) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [cultivationPractices, setCultivationPractices] = useState('');
  const [pesticides, setPesticides] = useState('');
  const [producedDate, setProducedDate] = useState('');
  const [shelfLife, setShelfLife] = useState(0); // Change this to use a number, not a string
  const [price, setPrice] = useState(0); // Change this to use a number, not a string
  const [quantity, setQuantity] = useState(0); // Change this to use a number, not a string
  const [imageURL, setImageURL] = useState('');


  const { contract, account } = state;

 
  const handleAddRawMaterial = async (e) => {
    e.preventDefault();
  
    try 
    {
      const shelfLifeInteger = parseInt(shelfLife);
    const amount=ethers.parseEther(price);
      const quantityInteger = parseInt(quantity);

       await contract.addRawMaterials( name,
        location,
        cultivationPractices,
        pesticides,
        producedDate,
        shelfLifeInteger,
     amount,
        quantityInteger,
        imageURL);
       console.log(shelfLife)
    } catch (error) {
      // Handle any errors here
      console.error('Error:', error);
    }
  };

  return (
    <div>
     <Header state={state}></Header>
      <LoginContainer>
        <LoginForm onSubmit={handleAddRawMaterial}>
          <FormTitle>Add Raw Material</FormTitle>
          <FormGroup>
            <FormInput
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <FormLabel htmlFor="name" $focused={name.length > 0}>Name</FormLabel>
          </FormGroup>
          <FormGroup>
            <FormInput
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
            <FormLabel htmlFor="location" $focused={location.length > 0}>Location</FormLabel>
          </FormGroup>
          <FormGroup>
            <FormInput
              id="cultivationPractices"
              type="text"
              value={cultivationPractices}
              onChange={(e) => setCultivationPractices(e.target.value)}
              required
            />
            <FormLabel htmlFor="cultivationPractices" $focused={cultivationPractices.length > 0}>Cultivation Practices</FormLabel>
          </FormGroup>
          <FormGroup>
            <FormInput
              id="pesticides"
              type="text"
              value={pesticides}
              onChange={(e) => setPesticides(e.target.value)}
              required
            />
            <FormLabel htmlFor="pesticides" $focused={pesticides.length > 0}>Pesticides</FormLabel>
          </FormGroup>
          <FormGroup>
            <FormInput
              id="producedDate"
              type="text"
              value={producedDate}
              onChange={(e) => setProducedDate(e.target.value)}
              required
            />
            <FormLabel htmlFor="producedDate" $focused={producedDate.length > 0}>Produced Date</FormLabel>
          </FormGroup>
          <FormGroup>
            <FormInput
              id="shelfLife"
              type="number"
              value={shelfLife}
              onChange={(e) => setShelfLife(e.target.value)}
              required
            />
            <FormLabel htmlFor="shelfLife" $focused={pesticides.length > 0}>Shelf Life</FormLabel>
          </FormGroup>
          <FormGroup>
            <FormInput
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            <FormLabel htmlFor="price" $focused={price.length > 0}>Price</FormLabel>
          </FormGroup>
          <FormGroup>
            <FormInput
              id="quntity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
            <FormLabel htmlFor="quantity" $focused={quantity.length > 0}>Quantity</FormLabel>
          </FormGroup>
          <FormGroup>
            <FormInput
              id="imageURL"
              type="text"
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
              required
            />
            <FormLabel htmlFor="quantity" $focused={quantity.length > 0}>Image URL</FormLabel>
          </FormGroup>
          
          <FormGroup>
            <FormInput
              id="account"
              type="text"
              value={account}
              readOnly
            />
            <FormLabel htmlFor="account" $focused={account.length > 0}>Account</FormLabel>
          </FormGroup>
          <LoginButton type="submit">Add</LoginButton>
        </LoginForm>
      </LoginContainer>
    </div>
  );
};

export default Add_RawMaterial;

// string memory _name,
//  string memory _location,
//     string memory _cultivationPratices,
//     string memory _pesticides,
//     string memory _producedDate,
//     uint256 _shelfLife,
//     uint256 _price,
//     uint256 _quantity