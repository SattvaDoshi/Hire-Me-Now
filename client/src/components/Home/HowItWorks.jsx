import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const HowItWorks = () => {
  return (
    <>
      <div className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-4xl font-bold text-black mb-12 text-center">How it Works</h3>
          <div className="flex flex-wrap justify-center">
            <div className="bg-white rounded-lg shadow-md p-8 m-4 max-w-sm flex 
            flex-col items-center text-center md:h-[50vh] md:w-[40vw] pt-6 justify-center">
              <FaUserPlus className="text-6xl text-blue-500 mb-4" />
              <h4 className="text-2xl font-bold mb-2">Create Account</h4>
              <p className="text-gray-600 text-lg">Create your Account it just take few minutes and start applying</p>
            </div>
            <div className=" bg-gray-900 rounded-lg shadow-md p-8 m-4 max-w-sm flex 
            flex-col items-center text-center text-white md:h-[50vh] md:w-[40vw] pt-6 justify-center">
              <MdFindInPage className="text-6xl text-white mb-4" />
              <h4 className="text-2xl font-bold mb-2">Find a Job/Post a Job</h4>
              <p className="text-lg">Find a job or post a job for free and get the best job in your</p>
            </div>
            <div className="bg-white rounded-lg shadow-md px-6 py-6 m-4 max-w-sm flex 
            flex-col items-center text-center md:h-[50vh] md:w-[40vw] pt-6 justify-center">
              <IoMdSend className="text-6xl text-blue-500 mb-4" />
              <h4 className="text-2xl font-bold mb-2">Apply For Job/Recruit Suitable Candidates</h4>
              <p className="text-gray-600 text-lg">Apply for a job or recruit suitable candidates for your job</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;
