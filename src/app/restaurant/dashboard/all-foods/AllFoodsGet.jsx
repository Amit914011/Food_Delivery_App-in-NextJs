"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { deleteFoodDataAPI, getAllFoodDataAPI } from "../../../service/Foods";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BouncingLoader from "../../../_comonents/BouncingLoader ";

const AllFoodsGet = () => {
  const [foods, setFoods] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedFoodId, setSelectedFoodId] = useState(null);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [viewModal, setViewModal] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const handleView = (food) => {
    setSelectedFood(food);
    setViewModal(true);
  };

  useEffect(() => {
    const restaurantUser = JSON.parse(localStorage.getItem("restaurantUser"));
    const resto_id = restaurantUser?._id;
    if (!resto_id) return;
    getAllFoodDataAPI(resto_id)
      .then((res) => {
        const newData = [...res?.data].reverse(); // last item first
        setFoods(newData);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false); // ✅ Hide loader
      });
  }, []);

  const deleteHandle = async (food_id) => {
    console.log("Deleting:", food_id);
    // Here you would call your DELETE API
    try {
      const response = await deleteFoodDataAPI(food_id);
      // console.log(response?.message)
      toast.success(response?.message);
      setFoods((prevFoods) => prevFoods.filter((food) => food._id !== food_id));
      setShowModal(false);
      setSelectedFoodId(null);
    } catch (error) {
      console.log(error);
    }
  };

  const confirmDelete = (id) => {
    setSelectedFoodId(id);
    setShowModal(true);
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <BouncingLoader />
        </div>
      ) : (
        <>
          <div className="p-6 min-h-screen bg-gray-50">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-10">
              <h2 className="text-4xl sm:text-5xl font-extrabold text-center sm:text-left text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 drop-shadow-md">
                Explore Delicious Food Items
              </h2>
              <Link
                href="/restaurant/dashboard/add-food"
                className="mt-4 sm:mt-0 px-5 py-2 text-white bg-blue-950 hover:bg-blue-800 rounded-lg shadow transition duration-300"
              >
                + Add Food Item
              </Link>
            </div>

            {/* Modal */}
            {showModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full">
                  <h3 className="text-lg font-bold mb-4 text-gray-800">
                    Are you sure you want to delete this food item?
                  </h3>
                  <div className="flex justify-end gap-4">
                    <button
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => deleteHandle(selectedFoodId)}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
                    >
                      Yes, Delete
                    </button>
                  </div>
                </div>
              </div>
            )}

            {viewModal && selectedFood && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-4">
                <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full relative">
                  <button
                    onClick={() => setViewModal(false)}
                    className="absolute top-3 right-3 text-gray-500 hover:text-black cursor-pointer"
                  >
                    ✕
                  </button>
                  <h2 className="text-2xl font-bold mb-4 text-center text-blue-900">
                    Food Details
                  </h2>
                  <img
                    src={selectedFood.imageurl}
                    alt={selectedFood.foodname}
                    className="w-full h-40 object-cover rounded mb-4"
                  />
                  <div className="space-y-2 text-sm text-gray-800">
                    <p>
                      <strong>Name:</strong> {selectedFood.foodname}
                    </p>
                    <p>
                      <strong>Category:</strong> {selectedFood.category}
                    </p>
                    <p>
                      <strong>Price:</strong> ₹{selectedFood.price}
                    </p>
                    <p>
                      <strong>Description:</strong> {selectedFood.description}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Food Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {foods.map((food, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl shadow-md overflow-hidden"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <img
                    src={food.imageurl}
                    alt={food.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">
                      {food.foodname}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {food.description?.slice(0, 60)}...
                    </p>
                    <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full mb-3">
                      {food.category}
                    </span>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-green-600">
                        ₹{food.price}
                      </span>
                      <div className="flex items-center gap-2">
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() =>
                            router.push(
                              `/restaurant/dashboard/edit-item/${food._id}`
                            )
                          }
                          className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 cursor-pointer"
                          title="Edit"
                        >
                          <FaEdit size={16} />
                        </motion.button>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleView(food)}
                          className="p-2 rounded-full bg-purple-100 hover:bg-purple-200 text-purple-600 cursor-pointer"
                          title="View"
                        >
                          <FaEye size={16} />
                        </motion.button>
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => confirmDelete(food._id)}
                          className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600 cursor-pointer"
                          title="Delete"
                        >
                          <FaTrash size={16} />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AllFoodsGet;
