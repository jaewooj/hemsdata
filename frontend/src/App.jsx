import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './assets/css/reset.css'
import './assets/css/common.css'
import Layout from './components/Layout'
import Audit from './pages/audit'
import Dashboard from './pages/dashboard'
import DataView from './pages/dataView'
import Hems from './pages/hems'
import Rems from './pages/rems'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard/>}/>

            <Route path="/hems" element={<Hems/>}/>
            <Route path="/rems" element={<Rems/>}/>
            <Route path="/audit" element={<Audit/>}/>
            <Route path="/dataview" element={<DataView/>}/>
            
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
