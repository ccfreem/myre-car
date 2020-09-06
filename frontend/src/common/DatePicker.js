import React from 'react'
import DateFnsUtils from '@date-io/date-fns'
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers'

const DatePicker = ({ year, setYear }) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableFuture
        label='Year'
        views={['year']}
        value={year}
        inputVariant='outlined'
        maxDateMessage='The year of the car cannot be in the future'
        onChange={setYear}
      />
    </MuiPickersUtilsProvider>
  )
}

export default DatePicker
