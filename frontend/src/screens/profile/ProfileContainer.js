import { Box, Container } from '@mui/material'
import React from 'react'

export const ProfileContainer = ({ children }) => {
  return (
    <Container component="main" maxWidth="xm" style={{ background: 'white', height: 'auto' }}>
      <Box sx={{ display: 'column', flexDirection: 'column', alignItems: "center", justifyContent: "center" }}>
        {children}
      </Box>
    </Container>
  )
}
