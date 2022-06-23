import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../store/actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import { FormContainer } from '../components/FormContainer';

export const ShippingScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { shippingAddress } = useSelector(state => state.cart);
  const { userInfo } = useSelector(state => state.userLogin)

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  useEffect(() => {
    if (!userInfo) {
      navigate('/')
    }
  }, [userInfo])

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate('/payment')
  }
  return (
    <FormContainer>
      <CheckoutSteps step1 step2/>
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Address'
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter city'
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId='postalCode'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter postal Code'
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Country'
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}>
          </Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}
