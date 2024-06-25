import React, { useContext, useEffect, useState } from "react";
import './Navbar.css'
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import { BASE_URL } from "../../Helpers/Config";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

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
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message), setIsAuthorized(true);
    }
  };

  return (
    <nav className={isAuthorized ? "navbarShow" : "navbarHide"}>
      <div className="container">
        <div className="logo text-yellow-50 text-2xl">
          JobHunt
        </div>
        <ul className={!show ? "menu" : "show-menu menu"}>
          <li>
            <Link to={"/"} onClick={() => setShow(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to={"/job/getall"} onClick={() => setShow(false)}>
              All Jobs
            </Link>
          </li>
          <li>
            <Link to={"/applications/me"} onClick={() => setShow(false)}>
              {user && user.role === "Employer"
                ? "Applications"
                : "My Application"}
            </Link>
          </li>
          {user && user.role === "Employer" ? (
            <>
              <li>
                <Link to={"/job/post"} onClick={() => setShow(false)}>
                  Post Job
                </Link>
              </li>
              <li>
                <Link to={"/job/me"} onClick={() => setShow(false)}>
                  Your Jobs
                </Link>
              </li>
            </>
          ) : (
            <></>
          )}

          <button className=" hover:bg-white hover:text-black" onClick={handleLogout}>Logout</button>
        </ul>
        <div className="hamburger">
          <GiHamburgerMenu onClick={() => setShow(!show)} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
