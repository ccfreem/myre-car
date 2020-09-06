import React from 'react'
import { gql, useQuery } from '@apollo/client'
import EditCar from './EditCar'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const GET_CARS = gql`
  query getCars($id: Int!) {
    getCars(id: $id) {
      id
    }
  }
`

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}))

const ViewCars = ({ setIsLoggedIn }) => {
  const classes = useStyles()
  const { loading, error, data } = useQuery(GET_CARS, {
    variables: { id: 1 },
    fetchPolicy: 'network-only'
  })

  if (error) return <p>ooooops</p>
  return (
    <>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            MyreCar... get it?
          </Typography>
          <Button color='inherit' onClick={() => setIsLoggedIn(false)}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      {loading && <div>lodaaaigngn....</div>}
      {data?.getCars?.map(car => (
        <EditCar car={car} />
      ))}
    </>
  )
}
export default ViewCars
