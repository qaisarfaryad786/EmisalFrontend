import React from 'react'
import { useRouteError } from 'react-router-dom'

const ErrorPage = () => {
    const error = useRouteError();
    console.log(error);
  return (
    <div>
      <h1 className='text-3xl text-red-600 m-3'>OOPS! 404</h1>
      <p className='ml-4 text-gray-400 text-2xl'>Sorry, unexpected Error has occured!</p>  
     
    </div>
  )
}

export default ErrorPage
