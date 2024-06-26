import React, { useContext, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../../Helpers/Config";

const Navbar = () => {

  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/user/logout`,
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/");
    } catch (error) {
      toast.error(error.response.data.message), setIsAuthorized(true);
    }
  };

  return (
    <nav>
      <div className="max-w-7xl mx-auto">
        <div className="flex mx-auto justify-between w-5/6 m-6 ">
          <div className="flex items-center gap-16 ">
            <div>
              <a
                href="/"
                className="flex gap-2 items-center ">
                <img src="/logo.svg" height={35} width={40} alt="" />
                <span className='text-blue-500 font-extrabold md:text-xl text-lg'>Job Hunt</span>
              </a>
            </div>

            <div className="hidden lg:flex gap-8 ">
            <Link to={isAuthorized ? '/home' : '/'} className='hover:underline'>Home</Link>
              <Link to='/job/getall' className='hover:underline'>Jobs</Link>
              {
                user.role ==="Employer" ? 
                <div className="hidden lg:flex gap-8" >
                  <Link to='/job/post' className='hover:underline'>Create Job</Link>
                  <Link to='/job/me' className='hover:underline'>My Jobs</Link>
                </div> 
                :
                <></>
              } 
              <Link to='/applications/me' className='hover:underline'>Applications</Link>
            </div>
          </div>
          <div className="flex gap-6 justify-center items-center">
            <div>
              {
                isAuthorized ?
                  <button className="bg-blue-500 text-white px-8 py-2 rounded text-lg"
                    onClick={handleLogout}
                  >
                    Logout
                  </button> :
                  <button className="bg-blue-500 text-white px-8 py-2 rounded text-lg">
                    <Link to='/login'>
                      Get Startrd
                    </Link>
                  </button>
              }
            </div>

            <div className="lg:hidden flex items-center">
              <button onClick={() => setToggleMenu(!toggleMenu)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* mobile navigation */}
      <div
        className={`fixed z-40 w-full  bg-gray-100 overflow-hidden flex flex-col lg:hidden gap-12  origin-top duration-700 ${!toggleMenu ? "h-0" : "h-full"
          }`}
      >
        <div className="px-8">
          <div className="flex flex-col gap-8 font-bold tracking-wider">
          <Link onClick={() => setToggleMenu(!toggleMenu)}  to='/home' className='hover:underline'>Home</Link>
              <Link onClick={() => setToggleMenu(!toggleMenu)} to='/job/getall' className='hover:underline'>Jobs</Link>
              {
                user.role ==="Employer" ? 
                <div className=" flex flex-col gap-8 font-bold tracking-wider" >
                  <Link onClick={() => setToggleMenu(!toggleMenu)} to='/job/post' className='hover:underline'>Create Job</Link>
                  <Link onClick={() => setToggleMenu(!toggleMenu)} to='/job/me' className='hover:underline'>My Jobs</Link>
                </div> 
                :
                <></>
              } 
              <Link onClick={() => setToggleMenu(!toggleMenu)} to='/applications/me' className='hover:underline'>Applications</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
