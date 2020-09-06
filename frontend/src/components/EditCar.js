import React, { useState } from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Paper from '@material-ui/core/Paper'
import TextInput from '../common/TextInput'
import DatePicker from '../common/DatePicker'

const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const InnerContainer = styled(Paper)`
  margin-top: 64px;
  display: flex;
  flex-direction: column;
  width: 70vw;
  padding: 16px 24px 24px;
`

const Header = styled.div`
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 20px;
`

const SubHeader = styled.div`
  font-size: 18px;
  color: #767676;
  margin-bottom: 20px;
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

const EditCars = ({ car }) => {
  const [year, setYear] = useState(new Date())
  const [make, setMake] = useState(car.make)
  const [makeError, setMakeError] = useState(null)
  const [model, setModel] = useState(car.model)
  const [modelError, setModelError] = useState(null)
  const [vin, setVin] = useState(car.vin)
  const [vinError, setVinError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleVin = vin => {
    // being that the oldest car for hyre according to
    // https://www.hyrecar.com/blog/state-rideshare-vehicle-requirements/
    // is 15 years (after 2005), the VIN needs to be 17 alpha-numeric characters
    const newVin = vin?.trim().replace(/[\W_]+/g, '')
    if (vin.length < 17) {
      setVinError(true)
    } else {
      setVinError(false)
    }
    if (vin.length <= 17) {
      setVin(newVin)
    }
  }
  const handleSave = () => {
    if (make && model && vin && year) {
      setLoading(true)
      console.log('this')
      setTimeout(() => {
        setLoading(false)
      }, 500)
    }
  }

  return (
    <OuterContainer>
      <InnerContainer>
        <Header>{make}</Header>
        <SubHeader>The Basics</SubHeader>
        <DatePicker year={year} setYear={setYear} />
        <TextInput
          label='Make'
          type='text'
          required
          value={make ? make : ''}
          handleChange={setMake}
          id={`make_input-${car.id}`}
          errorText='Please provide a make'
          error={makeError}
        />
        <TextInput
          label='Model'
          type='text'
          required
          value={model ? model : ''}
          handleChange={setModel}
          id={`model_input-${car.id}`}
          errorText='Please provide a model'
          error={modelError}
        />
        <TextInput
          label='VIN'
          type='text'
          required
          value={vin ? vin : ''}
          handleChange={handleVin}
          id={`vin_input-${car.id}`}
          errorText='Please provide a vin'
          error={vinError}
        />
        <SubmitButton
          type='submit'
          fullWidth
          variant='contained'
          color='primary'
          onClick={handleSave}
        >
          {loading ? <Spinner size={24} /> : 'Update'}
        </SubmitButton>
        {/* <SubHeader>The Extras</SubHeader> */}
      </InnerContainer>
    </OuterContainer>
  )
}

export default EditCars
