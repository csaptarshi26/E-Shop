import { Box } from '@mui/system'
import React from 'react'

const Img = ({ src, alt,...rest }) => {
  return (
    <Box
      component="img"
      sx={{
        height: '100%',
        width: '100%',
      }}

      alt={alt}
      src={src}
      {...rest}
    />
  )
}

export default Img
