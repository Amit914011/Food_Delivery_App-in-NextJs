"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getFoodDataByIdAPI, updateFoodItemAPI } from "../../../../service/Foods";
import BouncingLoader from "../../../../_comonents/BouncingLoader ";
import { toast } from "react-toastify";
import Loader from '../../../../_comonents/Loader'

function EditItems() {
  const router = useRouter();
  const { id } = useParams();
  const [foodData, setFoodData] = useState();
  const [isLoading,setIsLoading]=useState(false)

  useEffect(() => {
    if (id) {
      getFoodData(id);
    }
  }, [id]);

  const getFoodData = async (id) => {
    await getFoodDataByIdAPI(id)
      .then((res) => {
        setFoodData(res?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (foodData) {
      reset({
        foodname: foodData?.foodname,
        category: foodData?.category,
        price: foodData?.price,
        description: foodData?.description,
        imageurl: foodData?.imageurl,
      });
    }
  }, [foodData, reset]);

const onSubmit = async (data) => {
  try {
    setIsLoading(true)
    const response = await updateFoodItemAPI(id, data);
    console.log("Updated successfully:", response);
    toast.success(response?.message)
    router.push("/restaurant/dashboard/all-foods");
  } catch (error) {
    toast.error(error?.message)
  }
  setIsLoading(false)
};
  return (
    <div>
      {!foodData ? (
        <div className="flex items-center justify-center h-screen">
          <BouncingLoader />
        </div>
      ) : (
        <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Add New Food
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Food Name */}
            <div>
              <label
                className="block mb-1 font-medium text-gray-700"
                htmlFor="foodName"
              >
                Food Name
              </label>
              <input
                id="foodname"
                type="text"
                placeholder="Enter food name"
                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${
                  errors.foodname
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                {...register("foodname", { required: "Food name is required" })}
              />
              {errors.foodname && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.foodname.message}
                </p>
              )}
            </div>

            {/* Category */}
            <div>
              <label
                className="block mb-1 font-medium text-gray-700"
                htmlFor="category"
              >
                Category
              </label>
              <select
                id="category"
                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${
                  errors.category
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                {...register("category", { required: "Category is required" })}
                defaultValue=""
              >
                <option value="" disabled>
                  Select category
                </option>
                <option value="Burger">Burger</option>
                <option value="Pizza">Pizza</option>
                <option value="Dessert">Dessert</option>
                <option value="Drinks">Drinks</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* Price */}
            <div>
              <label
                className="block mb-1 font-medium text-gray-700"
                htmlFor="price"
              >
                Price ($)
              </label>
              <input
                id="price"
                type="number"
                step="0.01"
                placeholder="Enter price"
                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${
                  errors.price
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                {...register("price", {
                  required: "Price is required",
                  min: {
                    value: 0.01,
                    message: "Price must be greater than zero",
                  },
                })}
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label
                className="block mb-1 font-medium text-gray-700"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                id="description"
                rows="3"
                placeholder="Describe the food"
                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${
                  errors.description
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                {...register("description", {
                  required: "Description is required",
                })}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Image Upload */}
            <div>
              <label
                className="block mb-1 font-medium text-gray-700"
                htmlFor="image"
              >
                Image URL
              </label>
              <input
                id="imageurl"
                type="text"
                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${
                  errors.imageurl
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                {...register("imageurl", { required: "Image URL is required" })}
              />
              {errors.image && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.image.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex gap-5">
              <button
                type="button"
                className={`w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition cursor-pointer`}
                onClick={() => router.push("/restaurant/dashboard/all-foods")}
              >
                Go to Back
              </button>
              <button
                type="submit"
                className={`w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition ${
                  isLoading ? "cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                {isLoading ? <Loader title="Submitting..."/> : "Update Food"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default EditItems;
