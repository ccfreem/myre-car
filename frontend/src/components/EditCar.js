import React, { useState } from 'react'
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

const CREATE_CAR = gql`
  mutation createCar($carInput: CreateCarInput) {
    createCar(carInput: $carInput)
  }
`

// This component is a little lenghty, I would probably split this up into a couple components
// for create/edit, but I kept these here for the demo
const EditCars = ({ car, newCar, refetch, setWantsToEdit, setAlert }) => {
  const [year, setYear] = useState(car?.year)
  const [make, setMake] = useState(car?.make)
  const [model, setModel] = useState(car?.model)
  const [vin, setVin] = useState(car?.vin)
  const [errors, setErrors] = useState({
    year: false,
    make: false,
    model: false,
    vin: false
  })

  const [updateCar, { loading: updateLoading }] = useMutation(EDIT_CAR, {
    onCompleted() {
      // Let the user know that things went well
      setAlert({
        message: 'Car updated!',
        open: true
      })
      // Refetch the cars just in case
      refetch()
    }
  })
  const [createCar, { loading: createLoading }] = useMutation(CREATE_CAR, {
    onCompleted() {
      // Let the user know that things went well
      setAlert({
        message: 'Car created! Now make some money!',
        open: true
      })
      // Refetch the cars then send them to the edit page
      refetch().then(() => setWantsToEdit(true))
    }
  })

  const handleVin = vin => {
    // being that the oldest car for hyre according to
    // https://www.hyrecar.com/blog/state-rideshare-vehicle-requirements/
    // is 15 years (after 2005), the VIN needs to be 17 alpha-numeric characters
    const newVin = vin
      ?.trim()
      .replace(/[\W_]+/g, '')
      .toUpperCase()

    if (vin.length < 17) {
      setErrors({ ...errors, vin: true })
    } else {
      setErrors({ ...errors, vin: false })
    }
    if (vin.length <= 17) {
      setVin(newVin)
    }
  }

  const checkForEmpty = () => {
    const newErrors = {}
    if (!make) {
      newErrors['make'] = true
    }
    if (!model) {
      newErrors['model'] = true
    }
    if (!year) {
      newErrors['year'] = true
    }
    if (!vin) {
      newErrors['vin'] = true
    }
    // Set the errors back in state, with the new errors
    // overriding the previous
    setErrors({
      ...errors,
      ...newErrors
    })
  }

  const handleBlur = e => {
    // As we have the id's set up like nameOfField_id
    // we can split by _ and take the first element of that
    // array to identify the field
    const input = e.target.id.split('_')[0]
    const inputValueLength = e.target.value.length
    // If there is nothing in the field, set the error
    // so the user knows
    if (inputValueLength < 1 || !e.target.value.trim()) {
      handleFormErrors(input, true)
    } else {
      handleFormErrors(input, false)
    }
  }

  // Handle the form error state based on input
  const handleFormErrors = (input, hasError) => {
    const newFormErrors = { ...errors }
    newFormErrors[input] = hasError
    setErrors(newFormErrors)
  }

  const handleSave = () => {
    // If there are any errors, stop the process
    if (Object.values(errors).some(error => error)) {
      return
    }
    if (newCar) {
      // Create
      if (make && model && vin && year) {
        createCar({
          variables: {
            carInput: {
              make,
              model,
              year,
              vin
            }
          }
        }).catch(err => {
          // Maybe we want to write something to the console for a
          // bug-handling dev?
          console.error(err)
          // Definitely alert the user
          setAlert({
            message: 'Uh oh! Something went wrong!',
            open: true
          })
        })
      } else {
        checkForEmpty()
      }
    } else {
      if (make && model && year) {
        updateCar({
          variables: {
            id: car.id,
            carInput: {
              make,
              model,
              year,
              vin
            }
          }
        }).catch(err => {
          // Maybe we want to write something to the console for a
          // bug-handling dev?
          console.error(err)
          // Definitely alert the user
          setAlert({
            message: 'Uh oh! Something went wrong!',
            open: true
          })
        })
      } else {
        checkForEmpty()
      }
    }
  }

  const buttonText = newCar ? 'Create Car' : 'Update Car'
  return (
    <OuterContainer>
      <InnerContainer>
        <Header>{make}</Header>
        <SubHeader>The Basics</SubHeader>
        <InputRow>
          <DatePicker
            year={year}
            setYear={setYear}
            width='250px'
            id={car?.id}
          />
          <TextInput
            label='Make'
            type='text'
            required
            value={make || ''}
            handleChange={setMake}
            id={`make_input-${car?.id}`}
            errorText='Please provide a make'
            width='250px'
            onBlur={e => handleBlur(e)}
            error={errors.make}
          />
        </InputRow>
        <InputRow>
          <TextInput
            label='Model'
            type='text'
            required
            value={model || ''}
            handleChange={setModel}
            id={`model_input-${car?.id}`}
            errorText='Please provide a model'
            width='250px'
            onBlur={e => handleBlur(e)}
            error={errors.model}
          />
          <TextInput
            label='VIN'
            type='text'
            disabled={!newCar}
            value={vin || ''}
            handleChange={value => handleVin(value)}
            onBlur={e => handleBlur(e)}
            id={`vin_input-${car?.id}`}
            errorText='Please provide a valid 17 digit VIN'
            width='250px'
            error={errors.vin}
          />
        </InputRow>
        <SubmitButton
          type='submit'
          fullWidth
          variant='contained'
          color='primary'
          onClick={handleSave}
        >
          {updateLoading || createLoading ? <Spinner size={24} /> : buttonText}
        </SubmitButton>
      </InnerContainer>
    </OuterContainer>
  )
}

export default EditCars
