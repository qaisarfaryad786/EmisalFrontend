import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaKey, FaSignOutAlt } from 'react-icons/fa';
import logo from '../assets/logo.png';
import { logout } from '../utils/logout';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const onLogout = () => {
    logout();
    navigate('/adminLogin');
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className="h-20 flex justify-between items-center bg-[#000000]">
        <img src={logo} className="h-auto w-[150px] ml-20" alt="Logo" />
        <div className="flex gap-2 justify-center items-center mr-20">
          <div ref={dropdownRef} className="relative font-[sans-serif] w-max mx-auto">
            <button
              type="button"
              onClick={toggleDropdown}
              className="px-4 py-2 flex items-center rounded-sm text-[#333] text-sm border-b"
            >
              <img
                src="https://readymadeui.com/profile_6.webp"
                className="w-7 h-7 mr-3 rounded-full shrink-0"
                alt="Profile"
              />
              <span className="text-white tracking-wider">ADMIN</span>
            </button>
            {isOpen && (
              <ul className="absolute shadow-lg bg-white py-1 z-[1000] min-w-full w-max rounded-sm max-h-96 overflow-auto">
                <li className="py-2.5 px-5 flex items-center hover:bg-gray-200 text-[#333] text-sm cursor-pointer">
                  <FaKey className="w-4 h-4 mr-3" />
                  Change Password
                </li>
                <li
                  className="py-2.5 px-5 flex items-center hover:bg-gray-100 text-[#333] text-sm cursor-pointer"
                  onClick={onLogout}
                >
                  <FaSignOutAlt className="w-4 h-4 mr-3" />
                  Logout
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
