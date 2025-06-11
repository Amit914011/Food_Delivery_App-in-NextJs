"use client";
import { useState } from "react";
import Login from "../_comonents/Login";
import Signup from "../_comonents/Signup";
import RestaurantHeader from "../_comonents/RestaurantHeader";
import RestaurantFooter from "../_comonents/RestaurantFooter";
import ScrollToTop from '../_comonents/ScrollToTop'
const Loginpage = () => {
  const [showLogin, setShowLogin] = useState(true);
  

  return (
    <div className=" flex flex-col items-center min-h-screen justify-center">
      <ScrollToTop/>
      {/* <RestaurantHeader/> */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-indigo-700 mb-10 drop-shadow-md">
        Restaurant Login / Signup
      </h1>

      {showLogin ? <Login /> : <Signup />}

      <p className="mt-4 text-center text-gray-700 pb-5">
        {showLogin ? (
          <>
            Don't have an account?{" "}
            <span
              onClick={() => setShowLogin(false)}
              className="text-blue-600 cursor-pointer underline"
            >
              Signup
            </span>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <span
              onClick={() => setShowLogin(true)}
              className="text-blue-600 cursor-pointer underline"
            >
              Login
            </span>
          </>
        )}
      </p>
      {/* <RestaurantFooter/> */}
    </div>
  );
};

export default Loginpage;
