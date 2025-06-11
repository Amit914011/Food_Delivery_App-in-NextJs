'use client';
import Header from './_comonents/_customerComponents/Header';
import Footer from './_comonents/_customerComponents/Footer';
import { getRestaurantForHomePageAPI, getRestaurantLocationAPI } from './service/customerService/Foods';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [locations, setLocations] = useState([]);
  const [locationInput, setLocationInput] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [restaurant, setRestaurant] = useState([]);
  const router=useRouter()

  useEffect(() => {
    getRestaurantAllLocation();
    getRestaurantData();
  }, []);

  const getRestaurantAllLocation = () => {
    getRestaurantLocationAPI()
      .then((response) => {
        if (response) {
          setLocations(response?.result);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getRestaurantData = () => {
    getRestaurantForHomePageAPI()
      .then((res) => {
        setRestaurant(res?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocationInput(value);
    if (value.length > 0) {
      const filtered = locations.filter((loc) =>
        loc.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setLocationInput(suggestion);
    setShowSuggestions(false);
  };

  // Filtered restaurant list
  const filteredRestaurants = restaurant.filter((item) => {
    const matchLocation = locationInput
      ? item.city?.toLowerCase().includes(locationInput.toLowerCase())
      : true;

    const matchName = searchInput
      ? item.restaurant?.toLowerCase().includes(searchInput.toLowerCase()) ||
        item.name?.toLowerCase().includes(searchInput.toLowerCase())
      : true;

    return matchLocation && matchName;
  });

  return (
    <>
      <Header />

      {/* Hero Section */}
      <div
        className="relative h-screen bg-cover bg-center"
        style={{
          backgroundImage: `url('https://www.daysoftheyear.com/cdn-cgi/image/dpr=1%2Cf=auto%2Cfit=cover%2Ch=1335%2Cq=85%2Cw=2000/wp-content/uploads/national-fast-food-day.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-[#000000a4] flex items-center justify-center">
          <div className="text-center text-white px-4 w-full max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Find Your Favorite Restaurant
            </h1>
            <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded shadow-lg relative">
              {/* Location Input */}
              <div className="w-full relative">
                <input
                  type="text"
                  value={locationInput}
                  onChange={handleLocationChange}
                  placeholder="Enter Location"
                  className="w-full px-4 py-3 rounded-lg text-black focus:outline-none"
                />
                {showSuggestions && filteredSuggestions.length > 0 && (
                  <ul className="absolute z-10 left-0 right-0 bg-white text-black mt-1 rounded-lg border max-h-48 overflow-auto shadow">
                    {filteredSuggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Food/Restaurant Search Input */}
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Enter Food Name or Restaurant"
                className="w-full px-4 py-3 rounded-lg text-black focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Restaurant Cards Section */}
      <div className="px-4 md:px-20 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 bg-gray-100">
        {filteredRestaurants.length > 0 ? (
          filteredRestaurants.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow-lg rounded-xl overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
              onClick={()=>router.push(`/food-details/${item.restaurant}?id=${item._id}`)}
            >
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {item.restaurant}
                </h2>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Address:</span> {item.city}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Phone:</span> {item.contact}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Owner:</span> {item.name}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No restaurants found.
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
