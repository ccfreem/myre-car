import React from 'react'
import SignIn from './components/SignIn'
import ViewCars from './components/ViewCars'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <SignIn />
        </Route>
        <Route path='/view'>
          <ViewCars />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
