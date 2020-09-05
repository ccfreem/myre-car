import React, { useState } from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
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
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleFormSubmit = e => {
    e.preventDefault()

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setIsLoggedIn(true)
    }, 500)
  }

  return (
    <MainContainer>
      <OuterContainer>
        <InnerContainer>
          <Typography component='h1' variant='h5'>
            Login with email
          </Typography>
          <FormContainer>
            <TextField
              label='Email'
              margin='normal'
              fullWidth
              required
              onChange={e => setUsername(e.target.value)}
              id='username_input'
              error={emailError}
            />
            <TextField
              label='Password'
              margin='normal'
              fullWidth
              required
              type='password'
              onChange={e => setPassword(e.target.value)}
              autoComplete='current-password'
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
