import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home.jsx'
import Coin from './components/Coin.jsx'
import Header from './components/Header.jsx'

function App() {
  return (
    <BrowserRouter>
      <div className="p-3 mb-2 bg-black text-white min-vh-100">
        <Header /> {/* ✅ This goes outside Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="coins/:id" element={<Coin />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
