import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { FaKey, FaSignOutAlt, FaCaretDown } from 'react-icons/fa';
import logo from '../assets/logo.png';
import { logout } from '../utils/logout';

const HomeHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isNavDropdownOpen, setIsNavDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navDropdownRef = useRef(null);
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const tokenObj = localStorage.getItem('token'); // Assuming the token is stored as a JSON string
    if (tokenObj) {
      const parsedTokenObj = JSON.parse(tokenObj);
      setUserName(parsedTokenObj.name);
    }
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleNavDropdown = () => {
    setIsNavDropdownOpen(!isNavDropdownOpen);
  };

  const onLogout = () => {
    logout();
    navigate('/login');
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
    if (navDropdownRef.current && !navDropdownRef.current.contains(event.target)) {
      setIsNavDropdownOpen(false);
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
      <div className="h-20 flex justify-between items-center bg-[#092635]">
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
              <span className="text-white tracking-wider uppercase">{userName ? userName : '...'}</span>
              <FaCaretDown className='ml-2 text-white' />
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
      {/* NAVBAR */}
      <div id='navbar' className='bg-[#07212e] h-14 flex justify-end items-center'>
        <div className='mx-10'>
          <div ref={navDropdownRef} className='relative '>
            <button
              type='button'
              onClick={toggleNavDropdown}
              className='text-white font-urdu font-bold text-lg flex items-center font-urdufont'
            >
              <span>ایف آئی آر</span>
              <FaCaretDown className='ml-2' />
            </button>
            {isNavDropdownOpen && (
              <ul className='absolute right-0 mt-2 bg-white text-black rounded shadow-lg w-40'>
                <li className='px-4 py-2 hover:bg-gray-200 font-urdufont'>
                  <NavLink to="/addNewFir">ایف آئی آر</NavLink>
                </li>
                <li className='px-4 py-2 hover:bg-gray-200 font-urdufont'>
                  <NavLink to="/addNewFir">نئی ایف آئی آر</NavLink>
                </li>
                <li className='px-4 py-2 hover:bg-gray-200 font-urdufont'>
                  <NavLink to="/path2">ایف آئی آر فہرست</NavLink>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
