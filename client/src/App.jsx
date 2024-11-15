import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'
import { Navbar } from './components/navbar/Navbar'
import { Home } from "./components/home/Home";
import { Signin } from "./components/user/Signin";
import { Signup } from "./components/user/Signup";
import ProtectedRoute from "./components/navbar/ProtectedRoute";
import { ProductDetail } from "./components/product/ProductDetail";
import { Product } from "./components/product/Product";
import { AdminDashboard } from "./components/admin/AdminDashboard";
import { UserDashboard } from "./components/user/UserDashboard";

function App() {
  const isAdmin = window.localStorage.getItem("isAdmin") === "true";


  return (
    <>
      <div className='app'>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/login' element={<Signin />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/product' element={<Product />} />
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/admin-dashboard" element={
              <ProtectedRoute isAllowed={isAdmin} redirectPath="/">
                <AdminDashboard />
              </ProtectedRoute>
            }
            />
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
