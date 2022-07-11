import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMyAddressList } from '../../store/actions/addressActions';
import { saveShippingAddress } from '../../store/actions/cartActions';

import { Box, Container } from '@mui/material';
import { Button } from 'react-bootstrap';
import { AddressCard } from '../../components/AddressCard';
import { CartContainer } from './CartContainer';

export const ShippingScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedAddress, setSelectedAddress] = useState('');

  const { userInfo } = useSelector(state => state.userLogin)


  useEffect(() => {
    if (!userInfo) {
      navigate('/')
    } else {
      dispatch(getMyAddressList())
    }

  }, [userInfo, dispatch,navigate])

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
    <Button type='button' className='btn-clock' disabled={selectedAddress === ''}
      onClick={submitHandler}>Continue
    </Button>
  )

  return (
    <CartContainer container={<ShippingContainer />} button={ <ButtonContainer /> } />
  )
}
