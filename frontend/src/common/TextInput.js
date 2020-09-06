import React from 'react'
import TextField from '@material-ui/core/TextField'

const TextInput = ({
  handleChange,
  value,
  label,
  required = false,
  type,
  id,
  error,
  errorText
}) => {
  return (
    <TextField
      label={label}
      margin='normal'
      fullWidth
      type={type}
      required={required}
      value={value}
      onChange={e => handleChange(e.target.value)}
      id={id}
      error={error}
      helperText={error ? errorText : null}
    />
  )
}

export default TextInput
