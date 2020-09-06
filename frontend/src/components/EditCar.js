import React, { useState } from 'react'
import styled from 'styled-components'
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

const EditCars = ({ car: { id } }) => {
  const [year, setYear] = useState(new Date())
  const [make, setMake] = useState(null)
  const [makeError, setMakeError] = useState(null)
  const [model, setModel] = useState(null)
  const [modelError, setModelError] = useState(null)
  const [vin, setVin] = useState(null)
  const [vinError, setVinError] = useState(null)

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

  return (
    <OuterContainer>
      <InnerContainer>
        <Header>Test</Header>
        <SubHeader>The Basics</SubHeader>
        <DatePicker year={year} setYear={setYear} />
        <TextInput
          label='Make'
          type='text'
          required
          value={make ? make : ''}
          handleChange={setMake}
          id={`make_input-${id}`}
          errorText='Please provide a make'
          error={makeError}
        />
        <TextInput
          label='Model'
          type='text'
          required
          value={model ? model : ''}
          handleChange={setModel}
          id={`model_input-${id}`}
          errorText='Please provide a model'
          error={modelError}
        />
        <TextInput
          label='VIN'
          type='text'
          required
          value={vin ? vin : ''}
          handleChange={handleVin}
          id={`vin_input-${id}`}
          errorText='Please provide a vin'
          error={vinError}
        />
        <SubHeader>The Extras</SubHeader>
      </InnerContainer>
    </OuterContainer>
  )
}

export default EditCars
