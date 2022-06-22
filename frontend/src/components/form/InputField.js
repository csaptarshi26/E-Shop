import React from 'react'
import TextField from '@mui/material/TextField';


export const InputField = ({ value,type, onChange, label, name, autoFocus }) => {
  return (

    <TextField
      margin="normal"
      type={type ? type : 'text'}
      fullWidth
      value={value}
      onChange={(e) => onChange(e.target.value)}
      variant='filled'
      label={label}
      name={name}
      autoComplete="off"
      InputLabelProps={{
        shrink: true,
      }}
      autoFocus={autoFocus}
    />
  )
}