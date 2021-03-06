import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Col, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import Message from '../../components/Message';
import { setSignUpModalStatus } from '../../store/actions/appActions';
import { deliverOrder, getOrderDetails, payOrder } from '../../store/actions/orderActions';
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from '../../store/constants/orderConstants';
import { CartContainer } from './CartContainer';
import { printAddress } from '../../components/utils/App.utils';

export const OrderScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const orderId = params.id;

  const [sdkReady, setSdkReady] = useState(false);

  const orderDetails = useSelector(state => ({ ...state.orderDetails }))
  const { order, loading, error } = orderDetails;

  const { userInfo } = useSelector(state => state.userLogin)
  const { loading: loadingPay, success: successPay } = useSelector(state => state.orderPay)
  const { loading: loadingDeliver, success: successDeliver } = useSelector(state => state.orderDeliver)

  if (!loading) {
    const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2)
    order.itemsPrice = addDecimals([...order.orderItems].reduce((acc, item) => acc + item.price * item.qty, 0))
  }

  useEffect(() => {
    if (!userInfo) {
      //navigate('/login')      
      dispatch(setSignUpModalStatus(true))
    }
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
    if (!order || successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });

      dispatch(getOrderDetails(orderId))
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript()
      } else {
        setSdkReady(true);
      }
    }
  }, [order, navigate, orderId, dispatch, successPay, successDeliver, userInfo])


  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  }
  const deliverHandler = () => {
    dispatch(deliverOrder(order))
  }

  const OrderContainer = () => (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={12}>
          <ListGroup variant='flush'>
            <ListGroupItem>
              <h2>Shipping</h2>
              <p><strong>Name: </strong> {order.shippingAddress.name}</p>
              <p><strong>Phone No: </strong> {order.shippingAddress.mobileNum}</p>
              <p>
                <strong>Email: </strong>{' '}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address : </strong>
                {printAddress(order.shippingAddress)}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>Delivered on {order.deliveredAt}</Message>
              ) : (
                <Message >Not Delivered</Message>
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
                <Message >Not Paid</Message>
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
                          {item.qty} X ???{item.price} = ???{(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
    </>
  )

  const ButtonContainer = () => (
    <>
      {!order.isPaid && (
        <>
          {loadingPay && <Loader />}
          {!sdkReady ? <Loader /> : (
            <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler}>

            </PayPalButton>
          )}
        </>
      )}
      {loadingDeliver && <Loader />}
      {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
        <>
          <Button type='button' className='btn btn-block' onClick={deliverHandler}>
            Mark As Delivered
          </Button>
        </>
      )}
    </>
  )
  return loading ? <Loader /> : error ? <Message > {error} </Message> :
    <>
      <CartContainer container={<OrderContainer />} button={<ButtonContainer />} />
    </>

}
