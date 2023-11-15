import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Modal from 'react-modal';
import Header3 from '../components/Header3';

Modal.setAppElement('#root');
const AvailableMaterialsHeading = styled.h2`
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 20px;
  margin-left:500px;
`;

const GlobalStyles = styled.div`
  
  margin: 0;
  padding: 0;
  box-sizing: border-box;
`;

const PageContainer = styled.div`
  background-color: #f0f0f0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
 
`;


const ProductContainer = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const ProductList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ProductCard = styled.div`
 border: 10px solid #00000030;
    background-color: white;
    margin: 10px;
    padding: 20px;
    border-radius: 11px;
    box-shadow: 0 14px 15px rgba(0, 0, 0, 0.1);
    width: 270px;
    height:350px;
  img {
    max-width: 100%;
    height: 71%;
  }

  h3 {
    font-size: 1.2rem;
  }

  p {
    margin: 5px 0;
  }
`;

const ProductLink = styled(Link)`
  text-decoration: none;
  color: #333;
  cursor: pointer;
`;


const ModalContainer = styled(Modal)`
font-family: Arial, sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top:250px;
`;

const ModalContent = styled.div`
 display: flex;
  max-width: 600px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  height: 100%; 
  overflow: auto; 
  img {
    max-width: 50%;
    object-fit: cover;
    border-radius: 8px 0 0 8px;
  }
`;

const ModalDetails = styled.div`
  flex: 1;
  padding: 20px;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }

  p {
    margin: 5px 0;
  }

  .content-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .content-label {
    font-weight: bold;
    margin-right: 10px;
  }
`;

const SearchContainer = styled.div`
  margin: 20px 0;
  display: flex;
  align-items: center;

  input[type="text"] {
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-right: 10px;
  }

  button {
    background-color: #333;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
  }
`;




const TrackProducts = ({ state }) => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [rawMaterialDetails, setRawMaterialDetails] = useState(null);
    const [showRawMaterialDetails, setShowRawMaterialDetails] = useState(false); 
    const { contract, account } = state;
    const [searchInput, setSearchInput] = useState(''); // New state variable for search input
    const [searchedProduct, setSearchedProduct] = useState(null);
    useEffect(() => {
      const fetchItems = async () => {
        const itemsFromContract = await contract.viewAllProducts();
        setProducts(itemsFromContract);
      };
      fetchItems();
    }, [contract]);
  
    const openModal = (product) => {
      setSelectedProduct(product);
      setModalIsOpen(true);
    };
  
    const closeModal = () => {
      setModalIsOpen(false);
      // Clear the raw material details when closing the modal
      setRawMaterialDetails(null);
      setShowRawMaterialDetails(false);
    };
  
    const fetchRawMaterialDetails = async () => {
      if (selectedProduct && selectedProduct.rawMaterialIndices.length > 0) {
        // Call the Solidity function to fetch raw material details
        const rawMaterials = await contract.getRawMaterialsForProduct(selectedProduct.id);
        setRawMaterialDetails(rawMaterials);
        setShowRawMaterialDetails(true);
      }
    };

    const handleSearch = () => {
      const foundProduct = products.find((product) =>
        product.name.toLowerCase().includes(searchInput.toLowerCase())
      );
      if (foundProduct) {
        setSearchedProduct(foundProduct);
        openModal(foundProduct);
      }else{
        console.log("product not available");
      }

      // const searchedProduct=contract.searchProducts(searchInput);
      // setSearchedProduct(searchedProduct);
      // console.log(searchedProduct);
    };
  
    return (
      <GlobalStyles>
        <PageContainer>
          <Header3 state={state}></Header3>
          <SearchContainer>
          <input
            type="text"
            placeholder="Enter Product Name"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </SearchContainer>
          <ProductContainer>
            <AvailableMaterialsHeading>Track Products</AvailableMaterialsHeading>
            <ProductList>
              {products.map((product) => (
                <ProductLink
                  onClick={() => openModal(product)}
                  key={product.id}
                >
                  <ProductCard>
                    <img src={product.imageURL} alt={product.itemName} />
                    <h3>Name: {product.name}</h3>
                  </ProductCard>
                </ProductLink>
              ))}
            </ProductList>
          </ProductContainer>
          <ModalContainer
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Product Modal"
          >
            {selectedProduct && (
              <ModalContent>
                <img src={selectedProduct.imageURL} alt={selectedProduct.itemName} />
                <ModalDetails>
                  <h2>{selectedProduct.name}</h2>
               
                  <div className="content-item">
                    <span className="content-label">Manufactured Date:</span>
                    <p>{selectedProduct.manufacturedDate}</p>
                  </div>
                  <div className="content-item">
                    <span className="content-label">Expire Date:</span>
                    <p>{selectedProduct.expireDate}</p>
                  </div>
                  <div className="content-item">
                    <span className="content-label">Processing Method:</span>
                    <p>{selectedProduct.processingMethod}</p>
                  </div>
                 
                  <div className="content-item">
                    <span className="content-label">Price:</span>
                    <p>{ethers.formatEther(selectedProduct.price)} ETH</p>
                  </div>
                  <div className="content-item">
                    <span className="content-label">Raw Material Indices:</span>
                    <p>{selectedProduct.rawMaterialIndices}</p>
                    <button onClick={fetchRawMaterialDetails}>View Raw Material Details</button>
                  </div>
               
          {/* Display raw material details */}
          {showRawMaterialDetails && (
            <div>
              <h3>Raw Material Details</h3>
              {rawMaterialDetails.map((rawMaterial, index) => (
                <div key={index}>
                  {/* Display raw material details here */}
                  <p>{`Raw Material ${index + 1}: ${rawMaterial.name}, Location: ${rawMaterial.location}, Cultivation Practices: ${rawMaterial.cultivationPractices}, Pesticides: ${rawMaterial.pesticides}, Produced Date: ${rawMaterial.producedDate}, ShelfLife: ${rawMaterial.shelfLife}`}</p>
                  {/* Add more raw material details as needed */}
                </div>
          ))}
              </div>
          )}
          </ModalDetails>
          </ModalContent>
            )}
            </ModalContainer>
            </PageContainer>
            </GlobalStyles>
    );
  
}
export default TrackProducts;