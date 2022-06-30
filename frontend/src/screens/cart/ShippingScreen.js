import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../../store/actions/cartActions';
import CheckoutSteps from '../../components/CheckoutSteps';
import { FormContainer } from '../../components/FormContainer';
import { getMyAddressList } from '../../store/actions/addressActions';

import { setAddressModalStatus } from '../../store/actions/appActions';
import { AddressCard } from '../../components/AddressCard';
import { Box, Container } from '@mui/material';
import { CartContainer } from './CartContainer';
import { Button } from 'react-bootstrap';

export const ShippingScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedAddress, setSelectedAddress] = useState('');

  const { shippingAddress } = useSelector(state => state.cart);
  const { userInfo } = useSelector(state => state.userLogin)


  useEffect(() => {
    if (!userInfo) {
      navigate('/')
    } else {
      dispatch(getMyAddressList())
    }

  }, [userInfo, dispatch,])

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress(selectedAddress));
    navigate('/payment')
  }
  const ShippingContainer = () => (
    <Container component="main" maxWidth="md" style={{ background: 'white', height: 'auto' }}>
      <Box sx={{ display: 'column', flexDirection: 'column', alignItems: "center", justifyContent: "center" }}>
        <h3>Shipping</h3>
        <AddressCard setSelectedAddress={setSelectedAddress} selectedAddress={selectedAddress} />

      </Box>
    </Container>
  )
  
  const ButtonContainer = () => (
    <Button type='button' className='btn-clock' disabled={selectedAddress == ''}
      onClick={submitHandler}>Continue
    </Button>
  )

  return (
    <CartContainer container={<ShippingContainer />} button={ <ButtonContainer /> } />
  )
}
