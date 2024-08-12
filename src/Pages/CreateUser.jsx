import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createUser, reset } from '../redux/user/createUserSlice';  // Ensure reset is imported
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    names: "",
    username: "",
    password: "",
    role: "user",  // Default to "user"
    isActive: true  // Default to true
  });

  const { newUser, isLoading, isError, message, isSuccess } = useSelector((state) => state.addUser);

  useEffect(() => {
    if (isError) {
      toast.error(message);
      setFormData({ names: "", username: '', password: '', role: "user", isActive: true });
      console.log(message);
    }

    if (isSuccess) {
      toast.success("User Created Successfully");
      navigate('/admin/dashboard');
      dispatch(reset());
    }

    if (isLoading) {
      return "Loading...";
    }
  }, [newUser, isError, isSuccess, message, dispatch, navigate]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === 'isActive' ? (value === 'true') : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSubmit = {
      name: formData.names,
      username: formData.username,
      password: formData.password,
      role: formData.role,
      isActive: formData.isActive
    };
    console.log(dataToSubmit);
    dispatch(createUser(dataToSubmit));
  };

  return (
    <div className='container mx-auto bg-[#DCE8D3] shadow-lg'>
      <div className='flex justify-center items-center p-4' id='form-container'>
        <form
          onSubmit={handleSubmit}
          id='form'
          className='flex flex-col justify-center gap-2 bg-slate-50 p-6 px-20'
        >
          <h1 className='uppercase bg-cyan-600 p-2 text-white text-center font-bold tracking-wider'>
            Create User
          </h1>
          <label htmlFor="names">Name</label>
          <input
            type="text"
            name="names"
            placeholder='Name'
            onChange={handleOnChange}
            value={formData.names}
            required
            className="shadow appearance-none border bg-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight"
          />
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            placeholder='Username'
            onChange={handleOnChange}
            value={formData.username}
            required
            className="shadow appearance-none border bg-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight"
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder='Password'
            onChange={handleOnChange}
            value={formData.password}
            required
            className="shadow appearance-none border bg-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight"
          />
          <label htmlFor="role">Role</label>
          <select
            name="role"
            onChange={handleOnChange}
            value={formData.role}
            required
            className="shadow border bg-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight"
          >
            <option value="user">User</option>
            {/* Add more roles if needed */}
          </select>
          <label htmlFor="isActive">IsActive</label>
          <select
            name="isActive"
            onChange={handleOnChange}
            value={formData.isActive ? 'true' : 'false'}
            required
            className="shadow border bg-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight"
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
          <button
            type='submit'
            className='bg-cyan-800 hover:bg-black text-white tracking-wider uppercase font-bold py-2 px-4 w-[20rem] rounded focus:outline-none focus:shadow-outline'
          >
            Create
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreateUser;
