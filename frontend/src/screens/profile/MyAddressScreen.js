import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import Message from '../../components/Message';
import { listMyOrders } from '../../store/actions/orderActions';
import { getMyAddressList } from '../../store/actions/addressActions';
import { USER_UPDATE_PROFILE_RESET } from '../../store/constants/userConstants';

import { Avatar, Box, Button, Card, CardContent, CardHeader, CardMedia, Grid, IconButton, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { InputField } from '../../components/form/InputField';
import { ProfileContainer } from './ProfileContainer';
import { Image } from 'react-bootstrap';
import { setAddressModalStatus } from '../../store/actions/appActions';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export const printAddress = (address) => {
  return
}

export const MyAddressScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, addressList } = useSelector(state => state.addressList)

  useEffect(() => {
    dispatch(getMyAddressList())
  }, [dispatch])

  return (
    <ProfileContainer>
      <Typography component="h1" variant="h5">
        My Address
      </Typography>
      {addressList.length !== 0 ? (
        <>
          <Button
            type="submit"
            fullWidth
            style={{ bgcolor: 'secondary.main' }}
            variant="outlined"
            onClick={() => {
              dispatch(setAddressModalStatus(true, 'create'))
            }}
            sx={{ mt: 3, mb: 2 }}
          >
            + Create Address
          </Button>
          {addressList.map(address => (
            <Card sx={{ maxWidth: '100%',margin:3 }} key={address._id}>
              <CardHeader
                avatar={<Avatar sx={{ bgcolor: 'grey' }} aria-label="recipe">{address.name[0]}</Avatar>}
                action={<IconButton aria-label="settings"><MoreVertIcon /></IconButton>}
                title={address.name}
                subheader={address.mobileNum}
              />
              <CardContent style={{paddingTop:3}}>
                <Typography variant="p" color="text.secondary">
                  {address.address}{' , '} {address.locality}{'( '} {address.landmark} {'), '}{address.city}{' , '}{address.state}{' - '}{address.postalCode}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </>
      ) : (
        <>
          <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center"
            style={{ minHeight: '70vh', textAlign: 'center' }}>
            <Grid item xs={3}>
              <div><Image src='/images/empty_address.png' rounded /></div>
              <strong>No Addresses found in your account!</strong>
              <p>Add a delivery address.</p>
              <Button type="button"
                fullWidth style={{ bgcolor: 'secondary.main' }}
                onClick={() => {
                  dispatch(setAddressModalStatus(true, 'create'))
                }}
                variant="contained" sx={{ mt: 3, mb: 2 }}>
                Add Address
              </Button>
            </Grid>
          </Grid>
        </>
      )}


    </ProfileContainer>
  )
}
