"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getRestaurantAndFoodAPI } from "../../service/customerService/Foods";
import { motion } from "framer-motion";

function FoodDetails({ params }) {
  const foodName = params.name;
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [restaurant, setRestaurant] = useState(null);
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    if (id) {
      fetchRestaurantData();
    }
  }, [id]);

  const fetchRestaurantData = async () => {
    try {
      const response = await getRestaurantAndFoodAPI(id);
      setRestaurant(response?.data?.restaurantData);
      setFoodItems(response?.data?.foodData || []);
    } catch (error) {
      console.error("Error loading data", error);
    }
  };

  return (
    <>
      {/* Top Banner */}
      <div
        className="relative h-64 flex items-center justify-center text-white"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 z-0"></div>
        <div className="relative z-10 text-center px-4">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-2"
          >
            {restaurant?.name || "Loading..."}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-lg text-gray-200"
          >
            You searched for:{" "}
            <span className="text-teal-400 font-semibold">
              {decodeURI(foodName)}
            </span>
          </motion.p>
        </div>
      </div>

      {/* Restaurant Info */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="max-w-4xl mx-auto p-6 mt-10 bg-white/80 backdrop-blur-md shadow-lg rounded-lg"
      >
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Restaurant Information
        </h3>
        <div className="flex space-y-2 text-gray-700 text-sm md:text-base gap-5">
          <p>
            <strong className="text-gray-800">Name:</strong>{" "}
            {restaurant?.restaurant}
          </p>
          <p>
            <strong className="text-gray-800">Type:</strong> {restaurant?.type}
          </p>
          <p>
            <strong className="text-gray-800">City:</strong> {restaurant?.city}
          </p>
          <p>
            <strong className="text-gray-800">Contact:</strong>{" "}
            {restaurant?.contact}
          </p>
          <p>
            <strong className="text-gray-800">Address:</strong>{" "}
            {restaurant?.address}
          </p>
        </div>
      </motion.div>

      {/* Food Items Section */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {foodItems.map((item, i) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i, duration: 0.5 }}
            whileHover={{ scale: 1.03 }}
            className="bg-white/90 backdrop-blur-md border border-gray-100 rounded-2xl shadow-md overflow-hidden transition-all duration-300"
          >
            <img
              src={item.imageurl}
              alt={item.foodname}
              className="w-full h-48 object-cover"
            />
            <div className="p-5 space-y-2">
              <h4 className="text-xl font-semibold text-gray-800">
                {item.foodname}
              </h4>
              <p className="text-sm text-gray-500">
                {item.category} - ₹{item.price}
              </p>
              <p className="text-sm text-gray-600 line-clamp-3">
                {item.description}
              </p>
              {/* Add to Cart Button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="mt-3 w-full bg-teal-500 hover:bg-teal-600 cursor-pointer text-white py-2 rounded-lg text-sm font-semibold"
                onClick={() => console.log("Added to cart:", item.foodname)}
              >
                Add to Cart
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}

export default FoodDetails;
