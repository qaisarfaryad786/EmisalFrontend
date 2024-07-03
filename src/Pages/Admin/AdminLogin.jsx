import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { adminLogin, reset } from '../../redux/auth/authSlice';
import logo from './../../assets/logo.png';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  
  const [serverErrorMessage, setServerErrorMessage] = useState("");

  const { username, password } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);
  
  useEffect(() => {
    
    if (isError) {
      // alert(message);
      toast.error(message);
      dispatch(reset());
    }

   
      if (isSuccess) {
        toast.success("Login successful!");
        navigate('/');
        dispatch(reset());
    }
    

    if (isLoading) {
      return "Loading...";
    }

  }, [user, isError, isSuccess,  message, dispatch]);

 

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      username,
      password
    };    
    dispatch(adminLogin(userData));
  };

  return (
    <div className='h-screen flex items-center justify-center bg-[#DCE8D3]'>
      <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pb-8 mb-4" onSubmit={onSubmit}>
          <img src={logo} className='h-auto w-[150px] ml-[55px] pt-4' alt="Logo" />
         
          <div className="mb-4">
          {serverErrorMessage && <div className="text-red-500 mb-4">{serverErrorMessage}</div>}

            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input className="shadow appearance-none border bg-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username" type="text" placeholder="Username" value={username} name='username' onChange={onChange}  required/>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input className="shadow rounded w-full py-2 px-3 text-gray-700 mb-3 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline"
              id="password" type="password" placeholder="******************" value={password} name='password' onChange={onChange} required/>
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-cyan-800 hover:bg-black text-white tracking-wider uppercase font-bold py-2 px-4 w-[20rem] rounded focus:outline-none focus:shadow-outline" type="submit">
              Login
            </button>
          </div>
          <div className='pt-2 text-blue-400 text-center hover:text-black'>
            <Link to="/login">UserLogin</Link>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminLogin;
