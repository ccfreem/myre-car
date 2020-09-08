import React from 'react'
import DateFnsUtils from '@date-io/date-fns'
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers'
import styled from 'styled-components'

const StyledDatePicker = styled(KeyboardDatePicker)`
  & {
    width: ${p => p.width};
    margin: 16px 0 8px;
    min-width: 200px;
  }
`
const DatePicker = ({ year, setYear, width = null }) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <StyledDatePicker
        disableFuture
        label='Year'
        views={['year']}
        value={year}
        inputVariant='filled'
        width={width}
        maxDateMessage='The year of the car cannot be in the future'
        onChange={setYear}
      />
    </MuiPickersUtilsProvider>
  )
}

export default DatePicker
