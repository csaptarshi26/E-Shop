import { useEffect } from 'react';
import { Button, Col, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Message from '../../components/Message';
import { getAddressById } from '../../store/actions/addressActions';
import { createOrder } from '../../store/actions/orderActions';
import { CartContainer } from './CartContainer';

export const PlaceOrderScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }


  const { order, success, error } = useSelector(state => state.orderCreate);
  const { userInfo } = useSelector(state => state.userLogin);
  const { address: selectedAddress } = useSelector(state => state.addressSelected);


  const cart = useSelector(state => ({ ...state.cart }))

  cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2)

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`)
    }
    if (!userInfo) {
      navigate('/')
    }
    if (cart && userInfo) {
      dispatch(getAddressById(cart.shippingAddress))
    }
    // eslint-disable-next-line
  }, [navigate, success, userInfo])

  const placeOrderHandler = () => {
    dispatch(createOrder({
      orderItems: cart.cartItems,
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod,
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice
    }))
  }

  const PlaceOrderContainer = () => (
    <>
      <Row>
        <Col md={12}>
          <ListGroup variant='flush'>
            <ListGroupItem>
              <h2>Shipping</h2>
              <p>
                <strong>Address : </strong>
                {selectedAddress.address}, {selectedAddress.city}{' '}
                {selectedAddress.postalCode},{' '}
                {selectedAddress.country}
              </p>
            </ListGroupItem>

            <ListGroupItem>
              <h2>Payment Method</h2>
              <strong>Method : </strong>
              {cart.paymentMethod}
            </ListGroupItem>

            <ListGroupItem>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? <Message> Your cart is empty</Message> : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
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
      </Row>
    </>
  )
  const ButtonContainer = () => (
    <Button type='button' className='btn-block' disabled={cart.cartItems === 0}
      onClick={placeOrderHandler}>
      Place Order
    </Button>
  )
  return (
    <>
      <CartContainer container={<PlaceOrderContainer />} button={<ButtonContainer />} />
    </>
  )
}
