import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Modal from 'react-modal';
import Header from '../components/Header';
Modal.setAppElement('#root');
const AvailableMaterialsHeading = styled.h2`
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 20px;
  margin-left:500px;
`;

const GlobalStyles = styled.div`
  font-family: Arial, sans-serif;
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

const Products = ({ state }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [purchaseQuantity, setPurchaseQuantity] = useState(1);


  const { contract, account } = state;

  useEffect(() => {
    const fetchItems = async () => {
      const itemsFromContract = await contract.viewAllRawMaterials();
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
  };

  const handlePurchase = async () => {
    try {
      if (selectedProduct) {
        // Call the purchaseRawMaterial function with the selected product and purchaseQuantity
        await contract.purchaseRawMaterial(
          selectedProduct.id,
          purchaseQuantity,
          { value: selectedProduct.price * purchaseQuantity }
        );

        // Refresh the product list or update the selected product
        const updatedProducts = await contract.viewAllRawMaterials();
        setProducts(updatedProducts);

        // Close the modal
        closeModal();
      }
    } catch (error) {
      console.error("Error purchasing raw material:", error);
    }
  };

  return (
    <GlobalStyles>
      <PageContainer>
        <Header state={state} />
        <ProductContainer>
          <AvailableMaterialsHeading>Available Raw Materials</AvailableMaterialsHeading>
          <ProductList>
            {products.map((product) => (
              <ProductCard key={product.id}>
                <img src={product.imageURL} alt={product.itemName} />
                <h3>Name: {product.name}</h3>
                <p>Price: {ethers.formatEther(product.price)} ETH</p>
                <p>Quantity: {product.quantity}</p>
                <button onClick={() => openModal(product)}>View Details</button>
                <button onClick={() => openModal(product)}>Purchase</button>
              </ProductCard>
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
              {/* ... (Modal content as before) */}
              <div className="content-item">
                <span className="content-label">Quantity to Purchase:</span>
                <input
                  type="number"
                  value={purchaseQuantity}
                  onChange={(e) => setPurchaseQuantity(e.target.value)}
                />
              </div>
              <button onClick={handlePurchase}>Purchase</button>
            </ModalContent>
          )}
        </ModalContainer>
      </PageContainer>
    </GlobalStyles>
  );
};

export default Products;