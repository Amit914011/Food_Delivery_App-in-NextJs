// app/api/restaurant/route.js
import { NextResponse } from "next/server";
import dbconnection  from "../../lib/dbConnection"; // Create this if not present
import RestaurantUser  from "../../models/restaurantsUserModel";

export async function POST(request) {
  await dbconnection(); // Connect to MongoDB

  const body = await request.json();
  const { name, restaurant, city, contact, email, type, address, password } = body;

  // === Field Validations ===
  if (!name || name.trim().length < 2)
    return NextResponse.json({ error: "Owner name must be at least 2 characters" }, { status: 400 });

  if (!restaurant || restaurant.trim().length < 2)
    return NextResponse.json({ error: "Restaurant name must be at least 2 characters" }, { status: 400 });

  if (!city || city.trim() === "")
    return NextResponse.json({ error: "City is required" }, { status: 400 });

  const phoneRegex = /^[6-9]\d{9}$/;
  if (!contact || !phoneRegex.test(contact))
    return NextResponse.json({ error: "Enter valid 10-digit phone number starting with 6-9" }, { status: 400 });

  const emailRegex = /^\w+([\.+-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!email || !emailRegex.test(email))
    return NextResponse.json({ error: "Enter a valid email address" }, { status: 400 });

  const existing = await RestaurantUser.findOne({ email });
  if (existing) {
    return NextResponse.json({ error: "Email already exists" }, { status: 409 });
  }

  const validTypes = ["Veg", "Non-Veg", "Both", "Café", "Bakery", "Fast Food"];
  if (!type || !validTypes.includes(type))
    return NextResponse.json({ error: "Select a valid restaurant type" }, { status: 400 });

  if (!address || address.trim().length < 10)
    return NextResponse.json({ error: "Address must be at least 10 characters long" }, { status: 400 });

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  if (!password || !passwordRegex.test(password))
    return NextResponse.json({
      error: "Password must contain uppercase, lowercase, number & special character and be at least 8 characters"
    }, { status: 400 });

  // === Save to DB ===
  const newRestaurant = new RestaurantUser({ name, restaurant, city, contact, email, type, address, password });
  await newRestaurant.save();

  return NextResponse.json({
    message: "Registration successfully",
    restaurant: { name, restaurant, email }
  });
}
