import 'bootstrap/dist/css/bootstrap.min.css'
import Choice from './Choice.jsx'
import Signup from './Signup'
import Login from './Login'
import Card from './Card.jsx'
import Option from './Option.jsx'
import Amazon from './all-cards/amazon-card'
import Flipkart from './all-cards/flipkart-card'
import Starbucks from './all-cards/starbucks-card'
import Myntra from './all-cards/myntra-card'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BillingPage from './BillingPage.jsx'


function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Choice />}></Route>
          <Route path='/option' element={<Option />}></Route>
          <Route path='/register' element={<Signup />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/dashboard' element={<Card />}></Route>
          <Route path="/amazon" element={<Amazon />} />
          <Route path="/flipkart" element={<Flipkart />} />
          <Route path="/starbucks" element={<Starbucks />} />
          <Route path="/myntra" element={<Myntra />} />
          <Route path='/bill' element={<BillingPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
