import { StrictMode } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { createRoot } from 'react-dom/client'

import Console from './pages/Console.jsx'

import './defaultStyles.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Console />}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
