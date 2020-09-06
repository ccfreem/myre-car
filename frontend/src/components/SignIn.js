import React, { useState } from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import { isEmail } from 'validator'
import TextField from '@material-ui/core/TextField'
import TextInput from '../common/TextInput'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
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
  @media (min-width: 448px) {
    width: 400px;
    margin-left: auto;
    margin-right: auto;
  }
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

const SignIn = ({ setIsLoggedIn }) => {
  const [loading, setLoading] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleFormSubmit = e => {
    e.preventDefault()

    if (!email || !isEmail(email)) {
      setEmailError(true)
    }
    if (!password) {
      setPasswordError(true)
    }
    // simulate a login request
    if (email && password) {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        setIsLoggedIn(true)
      }, 500)
    }
  }

  const handleEmail = email => {
    if (isEmail(email) && emailError) {
      setEmailError(false)
    }
    setEmail(email)
  }

  const handlePassword = password => {
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
