import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import Button from '@mui/material/Button';
import { login } from '../../../store/actions/userActions';
import Message from '../../Message';
import { Loader } from '../../Loader';
import { InputField } from '../../form/InputField'
import { setModalStatus } from '../../../store/actions/appActions';

const Login = ({ setModalType }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.search ? location.search.split('=')[1] : '/'

  const { loading, error, userInfo } = useSelector(state => state.userLogin)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (userInfo) {
      dispatch(setModalStatus(false))
      navigate(redirect)
    }
  }, [userInfo, redirect, navigate])
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  }

  return (
    <Container component="main" maxWidth="md">
      <Box sx={{ marginTop: 5, display: 'column', flexDirection: 'row', alignItems: 'center', }}>
        <Grid container spacing={2}>

          <Grid item md={5}>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
          </Grid>

          <Grid item md={7}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} style={{ margin: 'auto', marginBottom: 10 }}>
              <LockOutlinedIcon />
            </Avatar>

            {error && <Message variant='danger'>{error} </Message>}
            {loading && <Loader />}
            <Box component="form" onSubmit={submitHandler} sx={{ mt: 1 }}>
              <InputField type={"email"} value={email} onChange={setEmail} label={"Email Address"} autoFocus/>

              <InputField type={"password"} value={password} onChange={setPassword} label={"Password"} />
              <Grid container>
                <Grid item md>
                  New Custome? {' '}
                  <Link href="#" variant="body2"
                    onClick={() => {
                      setModalType('register')
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
          </Grid>
        </Grid>
      </Box>
    </Container >
  )
}

export default Login





