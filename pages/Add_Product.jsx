import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';  
import Header2 from '../components/Header2';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

// string memory _name,
//         string memory _manufacturedDate,
//         string memory _expireDate,
//         string memory _energyUsed,
//         string memory _processingMethod,
//         string memory _packagingMaterial,
//         uint256 _price,
//         uint256 _quantity,
//         uint256[] memory _rawMaterialIndices


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


const Add_Product=({state})=>{
    const [name, setName] = useState('');
    const [manufacturedDate, setManufacturedDate] = useState('');
    const [expireDate, setExpireDate] = useState('');
    const [processingMethod, setProcessingMethod] = useState('');
    const [packagingMaterial, setPackagingMaterial] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [rawMaterialIndices, setRawMaterialIndices] = useState('');
    const [rawMaterialArray, setRawMaterialArray] = useState([]);

    const {contract,account} = state;

    const handleInputChange = (e) => {
        const  value = e.target.value;
        setRawMaterialIndices(value);
    
        // Split the input value by commas and trim spaces
        const newArrayValue = value.split(',').map((item) => item.trim());
        setRawMaterialArray(newArrayValue);
      };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        const amountInWei = ethers.parseEther(price); 
        try 
        {
           await contract.addProduct(name,manufacturedDate,expireDate,processingMethod,packagingMaterial,amountInWei,quantity,rawMaterialArray,imageURL);
        } catch (error) {
          // Handle any errors here
          console.error('Error:', error);
        }
      };

     

      return (
        <div>
        <Header2 state={state}></Header2>
        <LoginContainer>
          <LoginForm onSubmit={handleAddProduct}>
            <FormTitle>Add Product</FormTitle>
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
                id="manufacturedDate"
                type="text"
                value={manufacturedDate}
                onChange={(e) => setManufacturedDate(e.target.value)}
                required
              />
              <FormLabel htmlFor="manufacturedDate" $focused={location.length > 0}>Manufactured Date</FormLabel>
            </FormGroup>
            <FormGroup>
              <FormInput
                id="expireDate"
                type="text"
                value={expireDate}
                onChange={(e) => setExpireDate(e.target.value)}
                required
              />
              <FormLabel htmlFor="expireDate" $focused={expireDate.length > 0}>Expire Date</FormLabel>
            </FormGroup>
           
            <FormGroup>
              <FormInput
                id="processingMethod"
                type="text"
                value={processingMethod}
                onChange={(e) => setProcessingMethod(e.target.value)}
                required
              />
              <FormLabel htmlFor="processingMethod" $focused={processingMethod.length > 0}>Processing Method</FormLabel>
            </FormGroup>
            <FormGroup>
              <FormInput
                id="packagingMaterial"
                type="text"
                value={packagingMaterial}
                onChange={(e) => setPackagingMaterial(e.target.value)}
                required
              />
              <FormLabel htmlFor="packagingMaterial" $focused={packagingMaterial.length > 0}>Packaging Material</FormLabel>
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
              <FormLabel htmlFor="imageURL" $focused={imageURL.length > 0}>Image URL</FormLabel>
            </FormGroup>
            
            <FormGroup>
              <FormInput
                id="rawMaterialIndices"
                type="text"
                value={rawMaterialIndices}
               onChange={handleInputChange}
              />
              <FormLabel htmlFor="rawMaterialIndices" $focused={rawMaterialIndices.length > 0}>Raw Material Indices</FormLabel>
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

}

export default Add_Product;