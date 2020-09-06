import React, { useState } from 'react'
import DatePicker from '../common/DatePicker'

const EditCars = ({ car }) => {
  const [year, setYear] = useState(new Date())
  console.log(car)
  return <DatePicker year={year} setYear={setYear} />
}

export default EditCars
