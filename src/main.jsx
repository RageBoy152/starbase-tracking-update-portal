import { StrictMode } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { createRoot } from 'react-dom/client'


import { AuthProvider, AuthGuard } from './Authenticator.jsx';


import Login from './pages/Login.jsx';
import AuthCallback from './pages/AuthCallback.jsx';

import ProductionSite from './pages/ProductionSite.jsx';

import LaunchSite from './pages/LaunchSite.jsx';
import Pad from './pages/Pad.jsx';
import TankFarm from './pages/TankFarm.jsx';
import Chopstick from './pages/Chopstick.jsx';

import Massey from './pages/Massey.jsx';

import Users from './pages/Users.jsx';

import InventoryLabel1 from './components/InventoryLabel1.jsx';

import TrackingLogModal from './pages/TrackingLogModal.jsx';
import TrackingLabelModal from './components/TrackingLabelModal.jsx';
import ToObject from './pages/toObject.jsx';




import './defaultStyles.css'




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/auth/callback" element={<AuthCallback />} />


          <Route path="/" element={<Navigate to="/prod" replace />} />

          <Route path="/prod" element={<AuthGuard><ProductionSite /></AuthGuard>}></Route>

          <Route path="/lc" element={<AuthGuard><LaunchSite /></AuthGuard>}></Route>
          <Route path="/pad" element={<AuthGuard><Pad /></AuthGuard>}></Route>
          <Route path="/otf" element={<AuthGuard><TankFarm /></AuthGuard>}></Route>
          <Route path="/chopsticks" element={<AuthGuard><Chopstick /></AuthGuard>}></Route>

          <Route path="/massey" element={<AuthGuard><Massey /></AuthGuard>}></Route>

          <Route path="/users" element={<AuthGuard><Users /></AuthGuard>}></Route>


          <Route path="/labelmaker" element={<AuthGuard><InventoryLabel1 /></AuthGuard>}></Route>

          <Route path="/tracking-label" element={<AuthGuard><TrackingLabelModal /></AuthGuard>}></Route>
          <Route path="/tracking-log" element={<AuthGuard><TrackingLogModal /></AuthGuard>}></Route>
          <Route path="/to-object" element={<AuthGuard><ToObject /></AuthGuard>}></Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
)
