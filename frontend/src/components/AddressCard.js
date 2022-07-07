
import { Avatar, Box, Button, Card, CardContent, CardHeader, CardMedia, Container, Grid, IconButton, Typography } from '@mui/material';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setAddressModalStatus } from '../store/actions/appActions';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { Image } from 'react-bootstrap';
import { Loader } from './Loader'
import { printAddress } from './utils/App.utils';


export const AddressCard = ({ selectedAddress, setSelectedAddress }) => {
  const dispatch = useDispatch();

  const { loading, error, addressList } = useSelector(state => state.addressList)

  return (
    <>
      {loading ? <Loader /> : (
        addressList.length !== 0 ? (
          <>
            <Button
              type="submit"
              style={{ bgcolor: 'secondary.main' }}
              variant="outlined"
              onClick={() => {
                dispatch(setAddressModalStatus(true, 'create'))
              }}
              sx={{ mt: 3, mb: 2 }}
            >
              New Address
            </Button>
            <Grid container >

              {addressList.map(address => (
                <Grid item sx={12} sm={12} md={6} key={address._id}>
                  <Card
                    sx={{ marginTop: 1, marginBottom: 1, height: '200px',marginRight:1,marginLeft:1 }}
                    onClick={() => setSelectedAddress(address._id)}
                    style={{ border: selectedAddress === address._id ? '1px solid black' : '' }}
                  >
                    <CardHeader
                      avatar={<Avatar sx={{ bgcolor: 'grey' }} aria-label="recipe">{address.name[0]}</Avatar>}
                      action={<IconButton aria-label="settings"><MoreVertIcon /></IconButton>}
                      title={address.name}
                      subheader={address.mobileNum}
                    />
                    <CardContent style={{ paddingTop: 3 }}>
                      <Typography variant="p" color="text.secondary">
                        {printAddress(address)}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
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
        )
      )}
    </>
  )
}
