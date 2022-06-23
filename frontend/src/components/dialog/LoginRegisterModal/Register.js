import { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { register } from '../../../store/actions/userActions';
import { FormContainer } from '../../FormContainer';
import Message from '../../Message';
import { Loader } from '../../Loader';
import { InputField } from '../../form/InputField'
import { setModalStatus } from '../../../store/actions/appActions';


const Register = ({ setModalType }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.search ? location.search.split('=')[1] : '/'


  const { loading, error, userInfo } = useSelector(state => state.userRegister)
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (userInfo) {
      dispatch(setModalStatus(false))
      navigate(redirect)
    }
  }, [userInfo, redirect, navigate])
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password doesn't match")
    } else {
      dispatch(register(name, email, password));
    }
  }

  return (
    <Container component="main" maxWidth="md">

      <Grid container spacing={2}>
        <Grid item xs={5}>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
        </Grid>

        <Grid item xs={7}>
          {error && <Message variant='danger'>{error} </Message>}
          {message && <Message variant='danger'>{message} </Message>}
          {loading && <Loader />}

          <Box component="form" onSubmit={submitHandler} sx={{ mt: 1 }}>

            <InputField type={"text"} value={name} onChange={setName} label={"Enter name"} autoFocus />

            <InputField type={"email"} value={email} onChange={setEmail} label={"Enter Email"} />

            <InputField type={"password"} value={password} onChange={setPassword} label={"Enter Password"} />

            <InputField type={"password"} value={confirmPassword} onChange={setConfirmPassword} label={"Confirm Password"}/>

            <Button type="submit" fullWidth style={{ bgcolor: 'secondary.main' }} variant="contained" sx={{ mt: 3, mb: 2 }}>
              Register
            </Button>

          </Box>

          <Row className='py-3'>
            <Col onClick={() => setModalType('login')} >
              Have an Account? {' '}Login
            </Col>
          </Row>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Register