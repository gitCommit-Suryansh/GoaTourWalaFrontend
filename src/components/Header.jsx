import React from 'react';
import logo from '../assets/image.png'; // Replace with actual logo path

const Header = () => {
  const menuItems = [
    'Cruises in Goa',
    'SightSeen',
    'AdventureSports',
    'Scuba with Watersports',
    'Tour Packages',
    'Hotel Booking',
  ];

  return (
    <header className="w-full fixed top-0 z-50 bg-gradient-to-b from-black to-transparent text-white">
      <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div>
          <img src={logo} alt="GoaTourWala Logo" className="h-14 w-auto" />
        </div>

        {/* Menu Items */}
        <nav>
          <ul className="flex space-x-8 text-sm md:text-base font-medium  border-b-2 border-red-500 pb-5">
            {menuItems.map((item, index) => (
              <li key={index} className="relative group cursor-pointer">
                <span>{item}</span>
                {/* Underline on hover */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full" />
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
