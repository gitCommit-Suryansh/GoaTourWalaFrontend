import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import axios from 'axios';

const Header = () => {
  const [menuItems, setMenuItems] = useState([]);
  const REACT_APP_BACKEND_URL=process.env.REACT_APP_BACKEND_URL


  useEffect(() => {
    // Fetch all categories with subcategories
    axios.get(`${REACT_APP_BACKEND_URL}/api/categories/all-with-subcategories`)
      .then((res) => setMenuItems(res.data))
      .catch((err) => console.error('Error loading categories:', err));
  }, []);

  return (
    <header className="w-full fixed top-0 z-50 bg-gradient-to-b from-black to-transparent text-white">
      <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <div onClick={() => window.location.href = '/'}>
          <img src={logo} alt="GoaTourWala Logo" className="h-16 w-auto cursor-pointer" />
        </div>

        {/* Menu Items */}
        <nav>
          <ul className="flex space-x-8  md:text-base font-medium border-b-2 border-red-500 pb-5 pt-2">
            {menuItems.map((cat) => (
              <li key={cat._id} className="relative group cursor-pointer">
                <span>{cat.name}</span>

                {/* Underline on hover */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full" />

                {/* Subcategory Dropdown */}
                {cat.subcategories && cat.subcategories.length > 0 && (
                  <ul className="absolute top-full left-0 bg-white text-black mt-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition duration-300 z-50 min-w-max">
                    {cat.subcategories.map((sub) => (
                      <li key={sub._id}>
                        <Link
                          to={`/${cat.slug}/${sub.slug}`}
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          {sub.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
