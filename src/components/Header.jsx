import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { getAuthToken } from '../utils/authToken';
import { logout } from '../utils/logout';


const Header = () => {

    const [isOpen, setIsOpen] = useState(false); 
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen); 
  };

  const onLogout = () => {
    logout();
    navigate('/adminLogin');
  };
  return (
    <div>
      <div className="h-20 flex justify-between items-center bg-[#2F3645]">
        <img src={logo} className="h-auto w-[150px] ml-20" alt="" />
        <div className="flex gap-2 justify-center items-center mr-20">
          <div className="relative font-[sans-serif] w-max mx-auto">
            <button
              type="button"
              onClick={toggleDropdown}
              className="px-4 py-2 flex items-center rounded-sm text-[#333] text-sm border border-gray-300 outline-none"
            >
              <img
                src="https://readymadeui.com/profile_6.webp"
                className="w-7 h-7 mr-3 rounded-full shrink-0"
                alt="Profile"
              />
              <span className="text-white tracking-wider">ADMIN</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 fill-gray-400 inline ml-3"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {isOpen && (
              <ul className="absolute shadow-lg bg-white py-2 z-[1000] min-w-full w-max rounded-lg max-h-96 overflow-auto">
                <li className="py-2.5 px-5 flex items-center hover:bg-gray-100 text-[#333] text-sm cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="w-4 h-4 mr-3"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M197.332 170.668h-160C16.746 170.668 0 153.922 0 133.332v-96C0 16.746 16.746 0 37.332 0h160c20.59 0 37.336 16.746 37.336 37.332v96c0 20.59-16.746 37.336-37.336 37.336zM37.332 32A5.336 5.336 0 0 0 32 37.332v96a5.337 5.337 0 0 0 5.332 5.336h160a5.338 5.338 0 0 0 5.336-5.336v-96A5.337 5.337 0 0 0 197.332 32zm160 480h-160C16.746 512 0 495.254 0 474.668v-224c0-20.59 16.746-37.336 37.332-37.336h160c20.59 0 37.336 16.746 37.336 37.336v224c0 20.586-16.746 37.332-37.336 37.332zm-160-266.668A5.337 5.337 0 0 0 32 250.668v224A5.336 5.336 0 0 0 37.332 480h160a5.337 5.337 0 0 0 5.336-5.332v-224a5.338 5.338 0 0 0-5.336-5.336zM474.668 512h-160c-20.59 0-37.336-16.746-37.336-37.332v-96c0-20.59 16.746-37.336 37.336-37.336h160c20.586 0 37.332 16.746 37.332 37.336v96C512 495.254 495.254 512 474.668 512zm-160-138.668a5.338 5.338 0 0 0-5.336 5.336v96a5.337 5.337 0 0 0 5.336 5.332h160a5.336 5.336 0 0 0 5.332-5.332v-96a5.337 5.337 0 0 0-5.332-5.336zm160-74.664h-160c-20.59 0-37.336-16.746-37.336-37.336v-224C277.332 16.746 294.078 0 314.668 0h160C495.254 0 512 16.746 512 37.332v224c0 20.59-16.746 37.336-37.332 37.336zM314.668 32a5.337 5.337 0 0 0-5.336 5.332v224a5.338 5.338 0 0 0 5.336 5.336h160a5.337 5.337 0 0 0 5.332-5.336v-224A5.336 5.336 0 0 0 474.668 32zm0 0"
                    />
                  </svg>
                  Change Password
                </li>
                <li
                  className="py-2.5 px-5 flex items-center hover:bg-gray-100 text-[#333] text-sm cursor-pointer"
                  onClick={onLogout}
                >
                  <svg
                    xmlns={logo}
                    fill="currentColor"
                    className="w-4 h-4 mr-3"
                    viewBox="0 0 6.35 6.35"
                  >
                    <path
                      d="M3.172.53a.265.266 0 0 0-.262.268v2.127a.265.266 0 0 0 .53 0V.798A.265.266 0 0 0 3.172.53zm1.544.532a.265.266 0 0 0-.026 0 .265.266 0 0 0-.147.47c.459.391.749.973.749 1.626 0 1.18-.944 2.131-2.116 2.131A2.12 2.12 0 0 1 1.06 3.16c0-.65.286-1.228.74-1.62a.265.266 0 1 0-.344-.404A2.667 2.667 0 0 0 .53 3.158a2.66 2.66 0 0 0 2.647 2.663 2.657 2.657 0 0 0 2.645-2.663c0-.812-.363-1.542-.936-2.03a.265.266 0 0 0-.17-.066z"
                    />
                  </svg>
                  Logout
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
