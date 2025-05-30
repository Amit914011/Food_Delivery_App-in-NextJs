'use client';

import React from 'react';
import RestaurantHeader from '../../_comonents/RestaurantHeader';
import RestaurantFooter from '../../_comonents/RestaurantFooter';
import SidebarComponent from './SidebarComponent';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className='fixed w-full z-50'>
        <RestaurantHeader />
      </div>

      {/* Main Content with Sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
       <SidebarComponent/>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 md:ml-20 pt-20 bg-gray-50 ">
          {children}
        </main>
      </div>

      {/* Footer */}
     <div className='z-50'>
         <RestaurantFooter />
     </div>
    </div>
  );
}
