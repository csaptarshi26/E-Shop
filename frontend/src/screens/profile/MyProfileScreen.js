import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import Message from '../../components/Message';
import { listMyOrders } from '../../store/actions/orderActions';
import { getUserDetails, updateUserProfile } from '../../store/actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../../store/constants/userConstants';

import { Box, Button, Grid, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { InputField } from '../../components/form/InputField';
import { ProfileContainer } from './ProfileContainer';

export const MyProfileScreen = () => {
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
      navigate('/')
    } else {
      if (!user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails('profile'))
      } else {
        setName(user.name);
        setEmail(user.email)
      }
    }
  }, [userInfo, user, navigate, dispatch, success])
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password doesn't match")
    } else {
      dispatch(updateUserProfile({ name, email, password }));
    }
  }

  return (
    <ProfileContainer>
      <Typography component="h1" variant="h5">
        Profile
      </Typography>

      {error && <Message>{error} </Message>}
      {message && <Message>{message} </Message>}
      {success && <Message variant='success'>Profile Updated </Message>}
      {loading && <Loader />}
      <Box component="form" onSubmit={submitHandler} sx={{ mt: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6}>
            <InputField type={"text"} value={name} onChange={setName} label={"Name"} autoFocus />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <InputField type={"email"} value={email} onChange={setEmail} label={"Email"} />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <InputField type={"password"} value={password} onChange={setPassword} label={"Password"} />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <InputField type={"password"} value={confirmPassword} onChange={setConfirmPassword} label={"Confirm Password"} />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Button
              type="submit"
              fullWidth
              style={{ bgcolor: 'secondary.main' }}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update
            </Button>
           
          </Grid>

        </Grid>
      </Box>

    </ProfileContainer>
  )
}


