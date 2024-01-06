import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'
import About from './pages/About';
import Header from './components/Header';
import Footer from './components/Footer';
import Car from './components/Car';
import Login from './pages/Login';
import CarAdmin from './pages/admin/CarAdmin';
import CartDetail from './components/CartDetail';
import CarRental from './pages/CarRental';
import ChauffeurService from './pages/ChauffeurService';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Car />} />
        <Route path="/dang-nhap" element={<Login />} />
        <Route path="/chi-tiet-xe/:carId" element={<CartDetail />} />
        <Route path="/thue-xe-tu-lai" element={<CarRental />} />
        <Route path="/thue-xe-co-tai-xe" element={<ChauffeurService />} />

        <Route path="/admin/quan-ly-xe" element={<CarAdmin />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
