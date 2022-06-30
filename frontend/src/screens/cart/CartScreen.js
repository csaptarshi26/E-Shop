import { Grid } from '@mui/material';
import { useEffect } from 'react';
import { Button, Form, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Message from '../../components/Message';
import { setSignUpModalStatus } from '../../store/actions/appActions';
import { addToCart, removeFromCart } from '../../store/actions/cartActions';
import { CartContainer } from './CartContainer';

const CartScreen = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const productId = params.id;
  const qty = searchParams.get('qty');
  const { cartItems } = useSelector(state => state.cart)
  const { loading, error, userInfo } = useSelector(state => state.userLogin)


  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  }
  const checkOutHandler = () => {
    //navigate('/login?redirect=/shipping')
    if (userInfo) {
      navigate('/shipping')
    } else {
      dispatch(setSignUpModalStatus(true))
    }
  }
  const Cart = () => (
    <>
      <h1>Shopping Cart</h1>
      {cartItems.length === 0
      ? (<Message>Your cart is empty <Link to='/'>Go Back</Link> </Message>)
      : (
      <Grid container spacing={2}>
        {cartItems.map(item => (
          <Grid item xs={12} sm={12} key={item.product}>
            <Grid container spacing={2}>

              <Grid item md={2}>
                <Image src={item.image} alt={item.name} fluid rounded />
              </Grid>

              <Grid item md={4}>
                <Link to={`/product/${item.product}`}> {item.name} </Link>
              </Grid>
              <Grid item md={2}> {item.price} </Grid>
              <Grid item md={2}>
                <Form.Control as='select' value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))} >
                  {[...Array(item.countInStock).keys()].map(x => (
                    <option key={x + 1} value={x + 1} > {x + 1}</option>
                  ))}
                </Form.Control>
              </Grid>
              <Grid item md={2}>
                <Button type='button' variant='light' onClick={() => removeFromCartHandler(item.product)}>
                  <i className='fas fa-trash'></i>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        ))
        }
      </Grid >
      )}
    </>

  )

  const ButtonContainer = () => (
    <Button type='button' className='btn-clock' disabled={cartItems.length === 0}
      onClick={checkOutHandler}>
      Proceed To Checkout
    </Button>
  )
  return <CartContainer container={<Cart/> } button={<ButtonContainer/>} />
  
}

export default CartScreen