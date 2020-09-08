import React, { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import EditCar from './EditCar'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

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

// This is an example of styling using MUI's makeStyles helper,
// I don't use this day-to-day, but wanted to show that I'm familiar
// The styling was taken from https://material-ui.com/components/drawers/
// but customized to fit my minimal needs
const drawerWidth = 240
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
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

const ViewCars = ({ setIsLoggedIn }) => {
  const classes = useStyles()
  const [wantsToEdit, setWantsToEdit] = useState(true)
  const { loading, error, data } = useQuery(GET_CARS, {
    variables: { id: 1 },
    fetchPolicy: 'network-only',
    skip: !wantsToEdit
  })

  if (error) console.log(error)
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant='h6'>MyreCar... get it?</Typography>
          <Button color='inherit' onClick={() => setIsLoggedIn(false)}>
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
            {loading && <div>lodaaaigngn....</div>}
            {data?.getCars?.map(car => (
              <EditCar car={car} key={car.id} newCar={false} />
            ))}
          </>
        ) : (
          <EditCar />
        )}
      </main>
    </div>
  )
}
export default ViewCars
