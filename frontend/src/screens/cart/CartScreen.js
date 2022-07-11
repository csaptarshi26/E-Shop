import { Button, ButtonGroup, Card, CardContent, Grid, IconButton } from '@mui/material';
import { useEffect } from 'react';
import { Form, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Message from '../../components/Message';
import { setSignUpModalStatus } from '../../store/actions/appActions';
import { addToCart, removeFromCart } from '../../store/actions/cartActions';
import { CartContainer } from './CartContainer';
import DeleteIcon from '@mui/icons-material/Delete';

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
      <Grid item xs={12} sm={12}>
        {cartItems.length === 0
          ? (<Message>Your cart is empty <Link to='/'>Go Back</Link> </Message>)
          : (cartItems.map(item => (

            <Card sx={{ m: 1 }} key={item._id}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Grid>

                  <Grid item md={4}>
                    <Link to={`/product/${item.product}`}> {item.name} </Link>
                  </Grid>
                  <Grid item md={2}> {item.price} </Grid>
                  <Grid item md={2}>

                    <ButtonGroup size="small" aria-label="small outlined button group">
                      <Button variant='contained' onClick={() => dispatch(addToCart(item.product, Number((parseInt(item.qty)) + 1)))} disabled={item.qty >= item.countInStock || item.qty === 10}>+</Button>
                      <Button disabled>{item.qty}</Button>
                      <Button variant='contained' onClick={() => dispatch(addToCart(item.product, Number(parseInt(item.qty) - 1)))} disabled={item.qty == 1} >-</Button>
                    </ButtonGroup>


                  </Grid>
                  <Grid item md={2}>
                    <IconButton style={{marginTop:'-5px'}} color="primary" onClick={() => removeFromCartHandler(item.product)}>
                      <DeleteIcon />
                    </IconButton>

                
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))

          )
        }
      </Grid>
    </>

  )

  const ButtonContainer = () => (
    <Button variant='outlined'  disabled={cartItems.length === 0}
      onClick={checkOutHandler}>
      Proceed To Checkout
    </Button>
  )
  return <CartContainer container={<Cart />} button={<ButtonContainer />} />

}

export default CartScreen