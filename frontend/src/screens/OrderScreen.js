import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getOrderDetails, payOrder } from '../actions/orderActions';
import Message from '../components/Message';
import { Loader } from '../components/Loader';
import axios from 'axios';
import { PayPalButton } from "react-paypal-button-v2";
import { ORDER_PAY_RESET } from '../constants/orderConstants';


export const OrderScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const orderId = params.id;

  const [sdkReady, setSdkReady] = useState(false);

  const { order, loading, error } = useSelector(state => state.orderDetails)
  const { loading: loadingPay, success: successPay } = useSelector(state => state.orderPay)

  if (!loading) {
    const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2)
    order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0))
  }

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script);
    }
    if (!order || successPay) {
      dispatch({type : ORDER_PAY_RESET});
      dispatch(getOrderDetails(orderId))
    } else if(!order.isPaid){
      if (!window.paypal) {
        addPayPalScript()
      } else {
        setSdkReady(true);
      }
    }
  }, [order, orderId, dispatch, successPay])


  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  }
  return loading ? <Loader /> : error ? <Message variant='danger'> {error} </Message> :
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroupItem>
              <h2>Shipping</h2>
              <p><strong>Name: </strong> {order.user.name}</p>
              <p>
                <strong>Email: </strong>{' '}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address : </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>Delivered on {order.deliveredAt}</Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )}

            </ListGroupItem>

            <ListGroupItem>
              <h2>Payment Method</h2>
              <p>
                <strong>Method : </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>Paid on {order.paidAt}</Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroupItem>

            <ListGroupItem>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? <Message> Orderis empty</Message> : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroupItem key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>

                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>

                        <Col md={4}>
                          {item.qty} X ₹{item.price} = ₹{(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroupItem>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroupItem>
                <h2>Order Summary</h2>
              </ListGroupItem>

              <ListGroupItem>
                <Row>
                  <Col>Items</Col>
                  <Col>₹{order.itemsPrice}</Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Row>
                  <Col>Shipping</Col>
                  <Col>₹{order.shippingPrice}</Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Row>
                  <Col>Tax</Col>
                  <Col>₹{order.taxPrice}</Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Row>
                  <Col>Total</Col>
                  <Col>₹{order.totalPrice}</Col>
                </Row>
              </ListGroupItem>
              {!order.isPaid && (
                <ListGroupItem>
                  {loadingPay && <Loader />}
                  {!sdkReady ? <Loader /> : (
                    <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler}>

                    </PayPalButton>
                  )}
                </ListGroupItem>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>

}
