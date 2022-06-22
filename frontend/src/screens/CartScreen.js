import React, { useEffect } from 'react'
import { ListGroup } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { ListGroupItem } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../store/actions/cartActions';
import Message from '../components/Message';

const CartScreen = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const productId = params.id;
  const qty = searchParams.get('qty');
  const { cartItems } = useSelector(state => state.cart)


  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  }
  const checkOutHandler = () => {
    navigate('/login?redirect=/shipping')
  }

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0
          ? (<Message>Your cart is empty <Link to='/'>Go Back</Link> </Message>)
          : (
            <ListGroup variant='flush'>
              {cartItems.map(item => (
                <ListGroupItem key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}`}> {item.name} </Link>
                    </Col>
                    <Col md={2}> {item.price} </Col>
                    <Col md={2}>
                      <Form.Control as='select' value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))} >
                        {[...Array(item.countInStock).keys()].map(x => (
                          <option key={x + 1} value={x + 1} > {x + 1}</option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button type='button' variant='light' onClick={() => removeFromCartHandler(item.product)}>
                        <i className='fas fa-trash'></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroupItem>
              ))}
            </ListGroup>
          )
        }
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroupItem>
              <h2>Subtotal ({cartItems.reduce((acc, cur)=> acc + Number(cur.qty),0) }) items </h2>
              ₹{cartItems.reduce((acc,cur) => acc + cur.qty * cur.price,0).toFixed(2)}
            </ListGroupItem>
            <ListGroupItem>
              <Button type='button' className='btn-clock' disabled={cartItems.length ===0}
              onClick={checkOutHandler}>
                Proceed To Checkout
              </Button>
            </ListGroupItem>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen