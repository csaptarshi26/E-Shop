import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import { Grid, useMediaQuery } from '@mui/material';
import { useTheme } from '@emotion/react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Login from './Login';
import Register from './Register';
import { setModalStatus } from '../../../store/actions/appActions';
import { useDispatch } from 'react-redux';

export default function LoginDialog({open }) {
  const dispatch = useDispatch();
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('md');
  const [modalType, setModalType] = React.useState('login');

  
  const handleClose = () => {
    dispatch(setModalStatus(false))
    setModalType('login')
  };
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));



  return (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        PaperProps={!fullScreen && {
          style: {
            minHeight: '85vh',
            maxHeight: '85vh',
            minWidth: '50vw',
            maxWidth: '70vw'
          }
        }}
        open={open}
        onClose={handleClose}
      >
        <DialogContent style={{overflowY:'hidden'}} >
          { modalType === 'login' ? (
            <Login setModalType={setModalType}/>
          ) :(
            <Register setModalType={setModalType} />
          )}

        </DialogContent>

      </Dialog>
    </React.Fragment>
  );
}
