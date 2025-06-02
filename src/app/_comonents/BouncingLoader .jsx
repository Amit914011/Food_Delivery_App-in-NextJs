// components/BouncingLoader.jsx
import React from 'react';

const BouncingLoader = () => {
  return (
    <div className="flex items-center justify-center space-x-2 h-20">
      <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce"></div>
    </div>
  );
};

export default BouncingLoader;
