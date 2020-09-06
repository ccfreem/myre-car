import React, { useState } from 'react'
import SignIn from './components/SignIn'
import ViewCars from './components/ViewCars'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  return (
    <>
      {isLoggedIn ? (
        <ViewCars setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <SignIn setIsLoggedIn={setIsLoggedIn} />
      )}
    </>
  )
}

export default App
