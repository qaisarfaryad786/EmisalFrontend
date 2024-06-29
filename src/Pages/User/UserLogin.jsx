import React from 'react';
import logo from '../../assets/logo.png';



const UserLogin = () => {
  return (
    <div>
      <div className='h-screen flex items-center justify-center bg-[#DCE8D3]'>
      <div class="w-full max-w-xs">
  <form class="bg-white shadow-md rounded px-8 pb-8 mb-4">
  <img src={logo} className='h-auto w-[150px] ml-[55px]' alt="" />
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
        Username
      </label>
      <input class="shadow appearance-none border bg-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
        Password
      </label>
      <input class="shadow  rounded w-full py-2 px-3 text-gray-700 mb-3 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
      
    </div>
    <div class="flex items-center justify-between">
      <button class="bg-cyan-800 hover:bg-black text-white tracking-wider uppercase font-bold py-2 px-4 w-[20rem] rounded focus:outline-none focus:shadow-outline" type="button">
        Login
      </button>
    </div>
  </form>
</div>
    </div>
    </div>
  )
}

export default UserLogin
