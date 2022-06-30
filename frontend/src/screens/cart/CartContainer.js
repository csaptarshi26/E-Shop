import { Box, Container, Grid } from '@mui/material'
import React from 'react'
import { Card, Col, ListGroup, ListGroupItem, Row, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

const nextRoute = {
  "/cart": "/shipping",
  "/shipping": "/payment",
  "/payment": "/placeorder"
}

export const CartContainer = (props) => {
  const cart = useSelector(state => ({ ...state.cart }));
  const location = useLocation();
  const navigate = useNavigate();


  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  const checkOutHandler = () => {
    navigate(nextRoute[location.pathname])
  }
  cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2)

  return (
    <Container component="main" maxWidth="xm" style={{ background: 'white', height: 'auto' }}>
      <Box sx={{ display: 'column', flexDirection: 'column', alignItems: "center", justifyContent: "center" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={8}>
            {props.container}
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroupItem>
                  <h2>Subtotal ({cart.cartItems.reduce((acc, cur) => acc + Number(cur.qty), 0)}) items </h2>
                  ₹{cart.cartItems.reduce((acc, cur) => acc + cur.qty * cur.price, 0).toFixed(2)}
                </ListGroupItem>
              </ListGroup>

              <ListGroup variant='flush'>
                <ListGroupItem>
                  <h2>Order Summary</h2>
                </ListGroupItem>

                <ListGroupItem>
                  <Row>
                    <Col>Items</Col>
                    <Col>₹{cart.itemsPrice}</Col>
                  </Row>
                </ListGroupItem>

                <ListGroupItem>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>₹{cart.shippingPrice}</Col>
                  </Row>
                </ListGroupItem>

                <ListGroupItem>
                  <Row>
                    <Col>Tax</Col>
                    <Col>₹{cart.taxPrice}</Col>
                  </Row>
                </ListGroupItem>

                <ListGroupItem>
                  <Row>
                    <Col>Total</Col>
                    <Col>₹{cart.totalPrice}</Col>
                  </Row>
                </ListGroupItem>

                <ListGroup variant='flush'>
                  <ListGroupItem>
                    {props.button}
                  </ListGroupItem>
                </ListGroup>

              </ListGroup>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}
