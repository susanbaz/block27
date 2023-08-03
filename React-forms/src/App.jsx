import { useState } from 'react'
import React from 'react'

import './App.css'
import SignUpForm from './components/SignUpForm.jsx'
import Authenitcate from './components/Authenitcate.jsx'


function App() {
  const [token, setToken] = useState(null)

  return (
    <div className="App">
      <SignUpForm token={token} setToken={setToken} />
      <Authenitcate token={token} setToken={setToken}/>
    </div>
  )

}






export default App
