// models/Restaurant.js

import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Owner name is required"],
    trim: true,
    minlength: [2, "Name must be at least 2 characters long"]
  },
  restaurant: {
    type: String,
    required: [true, "Restaurant name is required"],
    trim: true
  },
  city: {
    type: String,
    required: [true, "City is required"],
    trim: true
  },
  contact: {
    type: String,
    required: [true, "Phone number is required"],
    match: [/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    unique: true,
    lowercase: true,
    match: [
      /^\w+([\.+-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email"
    ]
  },
  type: {
    type: String,
    required: [true, "Restaurant type is required"],
    enum: ["Veg", "Non-Veg", "Both", "Café", "Bakery", "Fast Food"]
  },
  address: {
    type: String,
    required: [true, "Full address is required"],
    minlength: [10, "Address must be at least 10 characters long"]
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters long"],
    match: [
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
    ]
  }
}, {
  timestamps: true
});

export default mongoose.models.RestaurantUser || mongoose.model("RestaurantUser", restaurantSchema);
