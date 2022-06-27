import { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
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
import { setSignUpModalStatus } from '../../../store/actions/appActions';

import Link from '@mui/material/Link';

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
      dispatch(setSignUpModalStatus(false))
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
      <Box sx={{ marginTop: 5, display: 'column', flexDirection: 'column', alignItems: 'center', }}>
        <Grid container spacing={2}>

          <Grid item md={5}>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
          </Grid>

          <Grid item md={7}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} style={{ margin: 'auto', marginBottom: 10 }}>
              <LockOutlinedIcon />
            </Avatar>

            {error && <Message >{error} </Message>}
            {message && <Message>{message} </Message>}
            {loading && <Loader />}

            <Box component="form" onSubmit={submitHandler} sx={{ mt: 1 }}>

              <InputField type={"text"} value={name} onChange={setName} label={"Enter name"} autoFocus />

              <InputField type={"email"} value={email} onChange={setEmail} label={"Enter Email"} />

              <InputField type={"password"} value={password} onChange={setPassword} label={"Enter Password"} />

              <InputField type={"password"} value={confirmPassword} onChange={setConfirmPassword} label={"Confirm Password"} />

              <Button type="submit" fullWidth style={{ bgcolor: 'secondary.main' }} variant="contained" sx={{ mt: 3, mb: 2 }}>
                Register
              </Button>

              <Grid container>
                <Grid item md>
                  Have an Account? {' '}
                  <Link href="#" onClick={() => { setModalType('login') }}>
                  Login
                  </Link>
                </Grid>
              </Grid>

            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container >
  )
}

export default Register