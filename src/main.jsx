import { StrictMode } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { createRoot } from 'react-dom/client'



import Login from './pages/Login.jsx';

import ProductionSite from './pages/ProductionSite.jsx';
import LaunchSite from './pages/LaunchSite.jsx';
import Pad from './pages/Pad.jsx';
import TankFarm from './pages/TankFarm.jsx';
import Massey from './pages/Massey.jsx';

import InventoryLabel1 from './components/InventoryLabel1.jsx';

import TrackingLabelModal from './components/TrackingLabelModal.jsx';



import './defaultStyles.css'




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />


        <Route path="/" element={<Navigate to="/prod" replace />} />

        <Route path="/prod" element={<ProductionSite />}></Route>
        <Route path="/lc" element={<LaunchSite />}></Route>
        <Route path="/pad" element={<Pad />}></Route>
        <Route path="/otf" element={<TankFarm />}></Route>
        <Route path="/massey" element={<Massey />}></Route>


        <Route path="/labelmaker" element={<InventoryLabel1 />}></Route>

        <Route path="/tracking-label" element={<TrackingLabelModal />}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
