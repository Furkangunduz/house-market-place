import { Route, Routes } from "react-router-dom"

import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

import Explore from "./pages/Explore"
import ForgotPassword from "./pages/ForgotPassword"
import Offers from "./pages/Offers"
import Profile from "./pages/Profile"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Navbar from "./components/Navbar"
import PrivateRoute from "./components/PrivateRoute"
import Category from "./pages/Category";
import CreateListing from "./pages/CreateListing";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Explore />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/profile" element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/category/:categoryName" element={<Category />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route element={<div>404</div>} />
        <Route path="/create-listing" element={<CreateListing />} />
      </Routes>
      <Navbar />
      <ToastContainer />
    </>
  )
}

export default App;
