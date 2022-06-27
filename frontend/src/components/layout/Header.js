import React, { useState } from 'react';
import { Container, Dropdown, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/actions/userActions';
import { SearchBox } from '../SearchBox'
import LoginDialog from '../dialog/LoginRegisterModal/LoginDialog';
import { setSignUpModalStatus } from '../../store/actions/appActions';
import AddressDialog from '../dialog/AddressModal/AddressDialog';
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector(state => state.userLogin)
  const {
    openSignUpModal,
    addressModal: {
      openAddressModal,
      modalType: addressModalType
    }
  } = useSelector(state => state.app)

  const logoutHandler = (e) => {
    dispatch(logout())
    navigate('/')
  }
  const signInHandler = () => {
    dispatch(setSignUpModalStatus(true))
  }
  return (
    <header>
      <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
        <Container>
          <Nav.Link as={Link} to='/'>
            <Navbar.Brand >E-Shop</Navbar.Brand>
          </Nav.Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <SearchBox />
            <Nav className="ms-auto">
              <Nav.Link as={Link} to='/cart'>
                <i className='fas fa-shopping-cart px-1'></i>
                Cart
              </Nav.Link>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
                  <Dropdown.Item onClick={logoutHandler}>Logout</Dropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link onClick={() => signInHandler()}>
                  <i className='fas fa-user px-1'></i>
                  Sign In
                </Nav.Link>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id="adminMenu">
                  <Dropdown.Item as={Link} to="/admin/userList">Users</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/admin/productList">Products</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/admin/orderList">Orders</Dropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <LoginDialog open={openSignUpModal} />
      <AddressDialog open={openAddressModal} type={addressModalType} />
    </header >
  )
}

export default Header