import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import { LoginContext } from "./context/LoginContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./Components/Home";
import SignUp from "./Components/SignUp";
import Signin from "./Components/Signin";
import Navbar from "./Components/Navbar";
import Modal from "./Components/Modal";
import ProductFile from "./Components/ProductFile";
import AddToCart from "./Components/AddToCart";
import BuyNow from "./Components/BuyNow";
import AboutUs from "./Components/AboutUs";
import Shubh from "./Components/Shubh";
import Kuldeep from "./Components/Kuldeep";
import Mkop from "./Components/Mkop";
import Harsh from "./Components/Harsh";
import ContactUs from "./Components/ContactUs";

function App() {
  const [userLogin, setUserLogin] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <BrowserRouter >
      <div className="App">
        <LoginContext.Provider value ={{setUserLogin , setModalOpen}}>
        <Navbar login={userLogin} />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/addtocart" element={<AddToCart />}></Route>
          <Route path="/buynow/:productid" element={<BuyNow />}></Route>
          <Route path="/productpage/:productid" element={<ProductFile />}></Route>
          <Route path="aboutus" element={<AboutUs />}></Route>
          <Route path="shubh" element={<Shubh />}></Route>
          <Route path="mkop" element={<Mkop />}></Route>
          <Route path="kuldeep" element={<Kuldeep />}></Route>
          <Route path="harsh" element={<Harsh />}></Route>
          <Route path="contactus" element={<ContactUs />}></Route>
        </Routes>
        <ToastContainer theme="dark" />
        {modalOpen && <Modal setModalOpen={setModalOpen}></Modal>}
        </LoginContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
