import { useTheme } from '@emotion/react';
import CloseIcon from "@mui/icons-material/Close";
import { AppBar, Box, Button, DialogTitle, Grid, IconButton, Toolbar, Typography, useMediaQuery } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAddressModalStatus, setSignUpModalStatus } from '../../../store/actions/appActions';
import { addMyAddress, getMyAddressList } from '../../../store/actions/addressActions';
import { InputField } from '../../form/InputField';
import React from 'react'

export default function AddressDialog({ open, type }) {
  const dispatch = useDispatch();
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('md');

  const [name, setName] = useState('');
  const [mobileNum, setMobileNum] = useState('');
  const [address, setAddress] = useState('');
  const [locality, setLocality] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [landmark, setLandmark] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');


  const handleClose = () => {
    dispatch(setAddressModalStatus(false))
  };
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addMyAddress({
      name,
      mobileNum,
      address,
      locality,
      city,
      state,
      landmark,
      postalCode,
      country
    }))
    dispatch(getMyAddressList())
    handleClose();
  }

  return (
    <React.Fragment>
      <Dialog fullScreen={fullScreen}
        PaperProps={fullScreen ? {} : ({
          style: { height: 'auto', width: '65vw' }
        })}
        open={open} onClose={handleClose}
      >

        <DialogTitle>
          {type === "create" ? "Add New Address" : "Edit Address"}
          <IconButton style={{ position: "absolute", top: "0", right: "0", padding: '15px' }}
            onClick={() => handleClose()}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent >


          <Box component="form" onSubmit={submitHandler} sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                <InputField type={"text"} value={name} onChange={setName} label={"Name"} autoFocus />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <InputField type={"text"} value={mobileNum} onChange={setMobileNum} label={"Mobile No."} />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <InputField type={"text"} value={postalCode} onChange={setPostalCode} label={"Pincode"} />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <InputField type={"text"} value={locality} onChange={setLocality} label={"Locality"} />
              </Grid>

              <Grid item xs={12} sm={12} md={12}>
                <InputField type={"text"} value={address} onChange={setAddress} label={"Address"} multiline rows={2} />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <InputField type={"text"} value={city} onChange={setCity} label={"City"} />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <InputField type={"text"} value={state} onChange={setState} label={"State"} />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <InputField type={"text"} value={landmark} onChange={setLandmark} label={"Landmark"} />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <InputField type={"text"} value={country} onChange={setCountry} label={"Country"} />
              </Grid>


              <Grid item xs={12} sm={12} md={12}>
                <Button
                  type="submit"
                  fullWidth
                  style={{ bgcolor: 'secondary.main' }}
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {type === "create" ? "Add Address" : "Edit Address"}
                </Button>

              </Grid>

            </Grid>
          </Box>

        </DialogContent>

      </Dialog>
    </React.Fragment>
  );
}
