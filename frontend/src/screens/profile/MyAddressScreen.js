import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMyAddressList } from '../../store/actions/addressActions';

import { Typography } from '@mui/material';
import { AddressCard } from '../../components/AddressCard';
import { ProfileContainer } from './ProfileContainer';

export const MyAddressScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    dispatch(getMyAddressList())
  }, [dispatch])

  return (
    <ProfileContainer>
      <Typography component="h1" variant="h5">
        My Address
      </Typography>
      <AddressCard setSelectedAddress={setSelectedAddress}/>


    </ProfileContainer>
  )
}
