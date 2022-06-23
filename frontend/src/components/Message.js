import { Alert, AlertTitle } from '@mui/material'
import React from 'react'

const Message = ({ variant, children }) => {
  return (
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      This is an error alert — <strong>check it out!</strong>
    </Alert>

  )
}
Message.defaultProps = {
  variant: 'info'
}

export default Message