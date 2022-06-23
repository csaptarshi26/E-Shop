import { Alert, AlertTitle } from '@mui/material'
import React from 'react'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';

const Message = ({ variant, children }) => {

  const initUpperCase = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
  return (
    <Alert severity={variant}
      iconMapping={{
        success: <CheckCircleOutlineIcon fontSize="inherit" />,
        error: <ErrorIcon fontSize='inherit' />,
        info: <InfoIcon fontSize='inherit' />,
      }}>
      <AlertTitle>{initUpperCase(variant)}</AlertTitle>
      {children}
    </Alert>

  )
}
Message.defaultProps = {
  variant: 'error'
}

export default Message