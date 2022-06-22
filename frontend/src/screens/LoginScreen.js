import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { login } from '../store/actions/userActions';
import { InputField } from '../components/form/InputField';
import { Loader } from '../components/Loader';
import Message from '../components/Message';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import Button from '@mui/material/Button';
const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.search ? location.search.split('=')[1] : '/'


  const { loading, error, userInfo } = useSelector(state => state.userLogin)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [userInfo, redirect, navigate])
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  }

  return (
    <Container component="main" maxWidth="sm">
      <Box sx={{ marginTop: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {error && <Message variant='danger'>{error} </Message>}
        {loading && <Loader />}
        <Box component="form" onSubmit={submitHandler} sx={{ mt: 1 }}>
          <InputField
            type={"email"}
            value={email}
            onChange={setEmail}
            label={"Email Address"}
            name={"email"}
            autoFocus
          />

          <InputField
            type={"password"}
            value={password}
            onChange={setPassword}
            label={"Password"}
            name={"password"}
          />
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              New Custome? {' '}
              <Link href="#" variant="body2"
                onClick={() => {
                  navigate(redirect ? `/register?redirect=${redirect}` : '/register')
                }}>
                Register
              </Link>
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            style={{ bgcolor: 'secondary.main' }}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>

      </Box>
    </Container >
  )
}

export default LoginScreen





