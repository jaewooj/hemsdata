import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './assets/css/reset.css'
import './assets/css/common.css'
import './assets/css/comRev.css'
import Layout from './components/Layout.jsx'
import Audit from './pages/Audit.jsx'
import Dashboard from './pages/Dashboard.jsx'
import DataView from './pages/DataView.jsx'
import Hems from './pages/Hems.jsx'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard/>}/>

            <Route path="/hems" element={<Hems/>}/>
            <Route path="/audit" element={<Audit/>}/>
            <Route path="/dataview" element={<DataView/>}/>
            
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
