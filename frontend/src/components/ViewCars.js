import React, { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import EditIcon from '@material-ui/icons/Edit'
import AddIcon from '@material-ui/icons/Add'
import CircularProgress from '@material-ui/core/CircularProgress'
import EditCar from './EditCar'

const GET_CARS = gql`
  query getCars($id: Int!) {
    getCars(id: $id) {
      id
      make
      model
      year
      vin
    }
  }
`

// This is an example of styling using MUI's makeStyles,
// I don't use this day-to-day, but wanted to show that I'm familiar
const drawerWidth = 240
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  progress: {
    display: 'flex',
    justifyContent: 'center',
    height: '100vh',
    alignItems: 'center'
  },
  toolbar: {
    justifyContent: 'space-between'
  },
  drawer: {
    width: drawerWidth
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}))

const ViewCars = () => {
  const history = useHistory()
  const classes = useStyles()
  const [wantsToEdit, setWantsToEdit] = useState(true)
  const [alert, setAlert] = useState('')
  const { loading, error, data, refetch } = useQuery(GET_CARS, {
    // Simulate the user having an id of 1
    variables: { id: 1 }
  })

  if (error) {
    // Given the severity of this error, would most likely need to
    // redirect to a support page, but for the demo, open the alert
    setAlert('Something went wrong! Call help!')
  }

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setAlert('')
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant='h6'>MyreCar... get it?</Typography>
          <Button color='inherit' onClick={() => history.push('/')}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant='permanent'
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <Toolbar />
        <List>
          <ListItem button onClick={() => setWantsToEdit(true)}>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText primary={'Edit Cars'} />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button onClick={() => setWantsToEdit(false)}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary={'Add Cars'} />
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        {wantsToEdit ? (
          <>
            {loading && (
              <div className={classes.progress}>
                <CircularProgress />
              </div>
            )}
            {data
              ? data.getCars?.map(car => (
                  <EditCar
                    car={car}
                    key={car.id}
                    newCar={false}
                    refetch={refetch}
                    setAlert={setAlert}
                  />
                ))
              : null}
          </>
        ) : (
          <EditCar
            newCar={true}
            refetch={refetch}
            setWantsToEdit={setWantsToEdit}
            setAlert={setAlert}
          />
        )}
      </main>
      <Snackbar
        open={Boolean(alert)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        autoHideDuration={1000}
        onClose={handleClose}
        message={alert}
      ></Snackbar>
    </div>
  )
}
export default ViewCars
