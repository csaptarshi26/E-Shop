import React from 'react';
import { Container, Dropdown, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';
const Header = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.userLogin)
  const logoutHandler =(e)=>{
    dispatch(logout())
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
                <Nav.Link as={Link} to='/login'>
                  <i className='fas fa-user px-1'></i>
                  Sign In
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header >
  )
}

export default Header