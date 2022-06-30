import { useEffect, useState } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../../store/actions/cartActions';
import CheckoutSteps from '../../components/CheckoutSteps';
import { FormContainer } from '../../components/FormContainer';
import { CartContainer } from './CartContainer';

export const PaymentScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { shippingAddress } = useSelector(state => state.cart)
  if (!shippingAddress) {
    navigate('/shipping');
  }
  const { userInfo } = useSelector(state => state.userLogin)

  useEffect(() => {
    if (!userInfo) {
      navigate('/')
    }
  }, [userInfo])
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder')
  }

  const PaymentContainer = () => (
    <>
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler} id='payment-form'>
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>
          <Col>
            <Form.Check
              type='radio'
              label='PayPal or Credit Card'
              id='PayPal'
              name='paymentMethod'
              value='PayPal'
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <Form.Check
              type='radio'
              label='Stripe'
              id='Stripe'
              name='paymentMethod'
              value='Stripe'
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
      </Form>
    </>
  )

  const ButtonContainer = () => (
    <Button type='submit' className='btn-clock' form='payment-form' variant='primary'>
      Continue
    </Button>
  )
  return (
    <CartContainer container={<PaymentContainer />} button={ <ButtonContainer />} />
  )
}
