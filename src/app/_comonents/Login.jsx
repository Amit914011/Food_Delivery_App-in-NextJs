import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";
import { loginRestaurantUserAPI } from "../service/RestaurantUser";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Loader from "./Loader";


function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading,setIsLoading]=useState(false)
  const router=useRouter()

  const onSubmit =async (data) => {
    try {
      setIsLoading(true)
     const response=await loginRestaurantUserAPI(data)
     toast.success(response?.data?.message)
    //  console.log(response?.data?.message)
    //  console.log(response?.data?.user)
      localStorage.setItem('restaurantUser',JSON.stringify(response?.data?.user))
      router.push('/restaurant/dashboard')
    } catch (error) {
      console.log('Server Error',error?.response?.data?.error)
      toast.error(error?.response?.data?.error)
    }
    setIsLoading(false)
  };

  return (
    <div className="flex items-center justify-center px-4">
      <div className="w-full min-w-lg p-8 bg-white rounded-2xl shadow-2xl">
      
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Field with Icon */}
          <div className="relative">
            <span className="absolute left-3 top-3.5 text-indigo-600">
              <FaEnvelope />
            </span>
            <input
              type="email"
              placeholder="Email Address"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Enter a valid email address",
                },
              })}
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field with Icon and Toggle */}
          <div className="relative">
            <span className="absolute left-3 top-3.5 text-indigo-600">
              <FaLock />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
              })}
              className="w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3.5 text-gray-600 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition duration-300 shadow-md ${isLoading?"cursor-not-allowed":"cursor-pointer"}`}
            disabled={isLoading}
          >
           {
            isLoading?<Loader title=" Verifying your credentials..."/>:"Login"
           }
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
