import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getUserDetails, updateUser } from '../actions/userActions';
import { FormContainer } from '../components/FormContainer';
import { Loader } from '../components/Loader';
import Message from '../components/Message';
import { USER_UPDATE_RESET } from '../constants/userConstants';

const UserEditScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = useParams();
  const userId = params.id;


  const { loading, error, user } = useSelector(state => state.userDetails)
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = useSelector(state => state.userUpdate)

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isAdmin, setisAdmin] = useState(false);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      navigate("/admin/userlist");
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setisAdmin(user.isAdmin);
      }
    }
  }, [user, dispatch, userId, successUpdate,navigate])
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({
      _id: userId,
      name,
      email,
      isAdmin
    }))
  }

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>Go Back</Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='email'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                required
                onChange={(e) => setName(e.target.value)}>

              </Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter Email'
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}>

              </Form.Control>
            </Form.Group>

            <Form.Group controlId='isadmin'>
              <Form.Check
                type='checkbox'
                label='Is Admin'
                required
                checked={isAdmin}
                onChange={(e) => setisAdmin(e.target.checked)}>
              </Form.Check>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}


      </FormContainer>
    </>

  )
}

export default UserEditScreen