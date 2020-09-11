import React, { useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { isEmail } from 'validator'

import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'

import TextInput from '../common/TextInput'
import background from '../media/login-background.jpg'

const MainContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${background});
  display: flex;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  justify-content: center;
  align-items: center;
`

const OuterContainer = styled.div`
  margin-left: 24px;
  margin-right: 24px;
  display: block;
`

const InnerContainer = styled(Paper)`
  margin-top: 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 24px 24px;
`

const FormContainer = styled.form`
  width: 100%;
  margin-top: 8px;
`

const SubmitButton = styled(Button)`
  && {
    margin-top: 24px;
  }
`
const Spinner = styled(CircularProgress)`
  && {
    color: #fff;
  }
`

const SignIn = () => {
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleFormSubmit = e => {
    e.preventDefault()

    // Check for email existence and validity
    if (!email || !isEmail(email)) {
      setEmailError(true)
    }
    // Check for password existence, no validation
    if (!password) {
      setPasswordError(true)
    }

    // Simulate a login request if all values present and
    // valid
    if (email && password && isEmail(email)) {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        history.push('/view')
      }, 500)
    }
  }

  const handleEmail = email => {
    // If the email is valid, and there is an error
    // clear out the error
    if (isEmail(email) && emailError) {
      setEmailError(false)
    }
    setEmail(email)
  }

  const handlePassword = password => {
    // If the user enters a password after a failed
    // attempt to login without one, clear out the error
    if (passwordError) {
      setPasswordError(false)
    }
    setPassword(password)
  }

  return (
    <MainContainer>
      <OuterContainer>
        <InnerContainer>
          <Typography component='h1' variant='h5'>
            Login with email
          </Typography>
          <FormContainer>
            <TextInput
              label='Email'
              type='email'
              required
              value={email}
              handleChange={handleEmail}
              fullWidth
              id='username_input'
              errorText='Please provide a valid email'
              error={emailError}
            />
            <TextInput
              label='Password'
              type='password'
              required
              value={password}
              handleChange={handlePassword}
              fullWidth
              error={passwordError}
              errorText='Password required'
              id='pwd_input'
            />
            <SubmitButton
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              onClick={handleFormSubmit}
            >
              {loading ? <Spinner size={24} /> : 'Sign In'}
            </SubmitButton>
          </FormContainer>
        </InnerContainer>
      </OuterContainer>
    </MainContainer>
  )
}

export default SignIn
