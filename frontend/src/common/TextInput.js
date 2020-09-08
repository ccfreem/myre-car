import React from 'react'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'

const StyledTextField = styled(TextField)`
  && {
    width: ${p => p.width};
    min-width: 200px;
  }
`

const TextInput = ({
  handleChange,
  value,
  label,
  required = false,
  fullWidth = false,
  width = null,
  type,
  id,
  error,
  errorText,

  ...additionalProps
}) => {
  return (
    <StyledTextField
      label={label}
      margin='normal'
      fullWidth={fullWidth}
      width={width}
      type={type}
      required={required}
      value={value}
      onChange={e => handleChange(e.target.value)}
      id={id}
      variant='filled'
      error={error}
      helperText={error ? errorText : null}
      {...additionalProps}
    />
  )
}

export default TextInput
