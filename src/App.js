import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'
<<<<<<< HEAD
=======
import About from './pages/About';
>>>>>>> 2abd1e41da6c9107b0ec7e89440f63d493ebd474
import Header from './components/Header';
import Footer from './components/Footer';
import Car from './components/Car';
import Login from './pages/Login';
import CarAdmin from './pages/admin/CarAdmin';
<<<<<<< HEAD
import CartDetail from './pages/CartDetail';
import CarRental from './pages/CarRental';
import ChauffeurService from './pages/ChauffeurService';
import Driver from './pages/Driver';
import ChauffeurServiceList from './pages/ChauffeurServiceList';
import UserAdmin from './pages/admin/UserAdmin';
import DriverAdmin from './pages/admin/DriverAdmin';
import CarRentalAdmin from './pages/admin/CarRentalAdmin';
import ChauffeurServiceAdmin from './pages/admin/ChauffeurServiceAdmin';
import FeedBack from './pages/Feedback';
import FeedBackAdmin from './pages/admin/FeedBackAdmin';
import Register from './pages/Register';
=======
import CartDetail from './components/CartDetail';
import CarRental from './pages/CarRental';
import ChauffeurService from './pages/ChauffeurService';

>>>>>>> 2abd1e41da6c9107b0ec7e89440f63d493ebd474
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Car />} />
        <Route path="/dang-nhap" element={<Login />} />
        <Route path="/chi-tiet-xe/:carId" element={<CartDetail />} />
<<<<<<< HEAD
        <Route path="/lich-su-thue-xe-tu-lai" element={<CarRental />} />
        <Route path="/lich-su-thue-xe-co-tai" element={<ChauffeurServiceList />} />
        <Route path="/lich-su-thue-xe-co-tai" element={<ChauffeurServiceList />} />
        <Route path="/thue-xe-co-tai-xe/:carId" element={<ChauffeurService />} />
        <Route path="/thong-tin-tai-xe" element={<Driver />} />
        <Route path="/lien-he" element={<FeedBack />} />
        <Route path="/dang-ky" element={<Register />} />

        <Route path="/admin/quan-ly-xe" element={<CarAdmin />} />
        <Route path="/admin/quan-ly-nguoi-dung" element={<UserAdmin />} />
        <Route path="/admin/quan-ly-tai-xe" element={<DriverAdmin />} />
        <Route path="/admin/dich-vu-tu-lai" element={<CarRentalAdmin />} />
        <Route path="/admin/dich-vu-co-tai-xe" element={<ChauffeurServiceAdmin />} />
        <Route path="/admin/feed-back" element={<FeedBackAdmin />} />
        
=======
        <Route path="/thue-xe-tu-lai" element={<CarRental />} />
        <Route path="/thue-xe-co-tai-xe" element={<ChauffeurService />} />

        <Route path="/admin/quan-ly-xe" element={<CarAdmin />} />
>>>>>>> 2abd1e41da6c9107b0ec7e89440f63d493ebd474
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
