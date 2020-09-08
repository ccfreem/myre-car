import React, { useState, useEffect } from 'react'
import { gql, useMutation } from '@apollo/client'
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

const InputRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
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

const EDIT_CAR = gql`
  mutation updateCar($id: String!, $carInput: UpdateCarInput) {
    updateCar(id: $id, carInput: $carInput)
  }
`

const EditCars = ({ car, newCar }) => {
  const [id, setId] = useState(car?.id)
  const [year, setYear] = useState(car?.year ? car.year : null)
  const [make, setMake] = useState(car?.make)
  const [model, setModel] = useState(car?.model)
  const [vin, setVin] = useState(car?.vin)
  const [errors, setErrors] = useState({
    makeError: false,
    modelError: false,
    vinError: false
  })
  const [updateCar, { data, loading, error }] = useMutation(EDIT_CAR)
  const [carData, setCarData] = useState({
    id: '',
    make: '',
    model: '',
    year: '',
    vin: ''
  })

  useEffect(() => {
    if (car) {
      setCarData(car)
    }
  }, [car])

  const handleVin = vin => {
    // being that the oldest car for hyre according to
    // https://www.hyrecar.com/blog/state-rideshare-vehicle-requirements/
    // is 15 years (after 2005), the VIN needs to be 17 alpha-numeric characters
    const newVin = vin?.trim().replace(/[\W_]+/g, '')
    if (vin.length < 17) {
      setErrors({ ...errors, vinError: true })
    } else {
      setErrors({ ...errors, vinError: false })
    }
    if (vin.length <= 17) {
      setVin(newVin)
    }
  }
  const handleSave = () => {
    if (newCar) {
    } else {
      if (make && model && year) {
        updateCar({
          variables: {
            id: car.id,
            carInput: {
              make,
              model,
              year
            }
          }
        })
      }
    }
  }

  return (
    <OuterContainer>
      <InnerContainer>
        <Header>{make}</Header>
        <SubHeader>The Basics</SubHeader>
        <InputRow>
          <DatePicker year={year} setYear={setYear} width='250px' id={id} />
          <TextInput
            label='Make'
            type='text'
            required
            value={make || ''}
            handleChange={setMake}
            id={`make_input-${id}`}
            errorText='Please provide a make'
            width='250px'
            error={errors.makeError}
          />
        </InputRow>
        <InputRow>
          <TextInput
            label='Model'
            type='text'
            required
            value={model || ''}
            handleChange={setModel}
            id={`model_input-${id}`}
            errorText='Please provide a model'
            width='250px'
            error={errors.modelError}
          />
          <TextInput
            label='VIN'
            type='text'
            value={vin || ''}
            handleChange={value => handleVin(value)}
            id={`vin_input-${carData.id}`}
            errorText='Please provide a vin'
            width='250px'
            error={errors.vinError}
          />
        </InputRow>
        <SubmitButton
          type='submit'
          fullWidth
          variant='contained'
          color='primary'
          onClick={handleSave}
        >
          {loading ? <Spinner size={24} /> : 'Update'}
        </SubmitButton>
        <SubHeader>The Extras</SubHeader>
      </InnerContainer>
    </OuterContainer>
  )
}

export default EditCars
