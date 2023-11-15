import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Modal from 'react-modal';
import Header2 from '../components/Header2';

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




// ... (Previous imports and styles)

const MyProducts = ({ state }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { contract, account } = state;

  useEffect(() => {
    const fetchItems = async () => {
      const itemsFromContract = await contract.myProducts();
      setProducts(itemsFromContract);
      console.log(itemsFromContract)
    };
    fetchItems();
  }, [contract]);

  const openModal = (product) => {
    setSelectedProduct(product);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
// string memory _name,
//         string memory _manufacturedDate,
//         string memory _expireDate,

//         string memory _processingMethod,
//         string memory _packagingMaterial,
//         uint256 _price,
//         uint256 _quantity,
//         uint256[] memory _rawMaterialIndices
  return (
    <GlobalStyles>
      <PageContainer>
      <Header2 state={state}></Header2>
        <ProductContainer>
          <AvailableMaterialsHeading>My Products</AvailableMaterialsHeading>
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
                  <span className="content-label">Id:</span>
                  <p>{Number(selectedProduct.id)}</p>
                </div>
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
                  <span className="content-label">Quantity:</span>
                  <p>{Number(selectedProduct.quantity)}</p>
                </div>
                <div className="content-item">
                  <span className="content-label">Price:</span>
                  <p>{ethers.formatEther(selectedProduct.price)} ETH</p>
                </div>
                <div className="content-item">
                  <span className="content-label">Raw Material Indicies:</span>
                  <p>{Number(selectedProduct.rawMaterialIndices)}</p>
                </div>
                </ModalDetails>
            </ModalContent>
          )}
        </ModalContainer>
      </PageContainer>
    </GlobalStyles>
  );
};

export default MyProducts;