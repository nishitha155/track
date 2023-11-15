import React from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const HeaderContainer = styled.header`
  background-color: #037417;
  color: white;
  padding: 20px;
  display: flex;
  justify-content: space-between;
`;

const Navigation = styled.nav`
  display: flex;
  justify-content: center; /* Center-align navigation items */
  align-items: center; /* Center-align navigation items */
`;

const NavLinks = styled.ul`
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
  
`;

const NavItem = styled.li`
  margin-right: 20px;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: white;

  &:hover {
    text-decoration: underline;
  }
`;

const AccountInfo = styled.div`
  display: flex;
  align-items: center;
  color: white;
`;

const AccountSpan = styled.span`
  display: flex;
  align-items: center;
  color: white;
  background-color: #c2c2c27a;
  border-radius: 4px;
  padding: 5px 10px;
`;


const Header2 = ({ state }) => {
  const { account } = state;

 

  return (
    <HeaderContainer>
        <Navigation>
          <NavLinks>
          <NavItem>
              <NavLink to="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/manufacturer">Register</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/purchaseRawMaterials">Purchase Raw Materials</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/PurchasedRawMaterials">Purchased Raw Materials</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/addProducts">Add Products</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/myProducts">My Products</NavLink>
            </NavItem>
          </NavLinks>
        </Navigation>
        <AccountInfo>
          <AccountSpan>Account: {account}</AccountSpan>
        </AccountInfo>
      </HeaderContainer>
  );
};

export default Header2;