'use client'
import React from 'react';
import { useForm } from 'react-hook-form';

export default function AddFood() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log('Form Data:', data);
    alert('Food added successfully!');
    reset();
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add New Food</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Food Name */}
        <div>
          <label className="block mb-1 font-medium text-gray-700" htmlFor="foodName">
            Food Name
          </label>
          <input
            id="foodName"
            type="text"
            placeholder="Enter food name"
            className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.foodName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
            }`}
            {...register('foodName', { required: 'Food name is required' })}
          />
          {errors.foodName && (
            <p className="text-red-500 text-sm mt-1">{errors.foodName.message}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 font-medium text-gray-700" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.category ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
            }`}
            {...register('category', { required: 'Category is required' })}
            defaultValue=""
          >
            <option value="" disabled>
              Select category
            </option>
            <option value="burger">Burger</option>
            <option value="pizza">Pizza</option>
            <option value="dessert">Dessert</option>
            <option value="drinks">Drinks</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
          )}
        </div>

        {/* Price */}
        <div>
          <label className="block mb-1 font-medium text-gray-700" htmlFor="price">
            Price ($)
          </label>
          <input
            id="price"
            type="number"
            step="0.01"
            placeholder="Enter price"
            className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.price ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
            }`}
            {...register('price', {
              required: 'Price is required',
              min: { value: 0.01, message: 'Price must be greater than zero' },
            })}
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium text-gray-700" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            rows="3"
            placeholder="Describe the food"
            className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.description ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
            }`}
            {...register('description', { required: 'Description is required' })}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-1 font-medium text-gray-700" htmlFor="image">
            Upload Image
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            className="w-full"
            {...register('image', { required: 'Image is required' })}
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition"
        >
          Add Food
        </button>
      </form>
    </div>
  );
}
