import { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { Loader } from '../components/Loader';
import Message from '../components/Message';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const { loading, error, user } = useSelector(state => state.userDetails)
  const { userInfo } = useSelector(state => state.userLogin)
  const { success } = useSelector(state => state.userUpdateProfile)


  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'))
      } else {
        setName(user.name);
        setEmail(user.email)
      }
    }
  }, [userInfo, user, navigate, dispatch])
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password doesn't match")
    } else {
      dispatch(updateUserProfile({ name, email, password }));
    }
  }

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {error && <Message variant='danger'>{error} </Message>}
        {message && <Message variant='danger'>{message} </Message>}
        {success && <Message variant='success'>Profile Updated </Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='email'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}>

            </Form.Control>
          </Form.Group>

          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}>

            </Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}>
            </Form.Control>
          </Form.Group>


          <Button type='submit' variant='primary'>
            Update
          </Button>
        </Form>

      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
      </Col>
    </Row>
  )
}

export default ProfileScreen

