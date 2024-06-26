import React, { useContext } from 'react'
import { Context } from '../../main'
import { Link, Navigate } from 'react-router-dom';

const Landing = () => {
    const {isAuthorized , user} = useContext(Context);
    if(!isAuthorized)
        return <Navigate to={'/login'}/>

        
  return (
    <div className="bg-gray-200 lg:min-h-screen md:h-[60vh] min-h-screen flex flex-col items-center pt-8 md:py-0">
    <div className="container mx-auto flex flex-col-reverse md:flex-row items-center
     justify-center px-4 md:px-8">
        <div className="md:w-1/2 lg:w-2/3 text-center mt-[15vh]">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-6">
               Hey  <span className='text-blue-500'> {user.name}</span> nice to see you
              </h1>
            <p className="text-lg md:text-xl lg:text-xl text-gray-700 mb-10">
                Amazing Oppertunities are waiting for you kick start your <br />
                career in your dream companies and achieve your goals.
            </p>

            <div className="mt-4 flex flex-wrap justify-center p-6 gap-4">
            <button className="bg-blue-500 text-white px-8 py-2 rounded text-lg">
                    <Link to='/job/getall'>
                     Browse Jobs
                    </Link>
                  </button>

                  <button className=" text-blue-500 border-blue-500 shadow px-8 py-2 rounded text-lg">
                    <Link to='/applications/me'>
                      My Applications
                    </Link>
                  </button>
            </div>

        </div>

    </div>
</div>
  )
}

export default Landing