import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const HowItWorks = () => {
  return (
    <div className="bg-gray-100 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h3 className="text-4xl font-semibold text-gray-800 mb-16 text-center">
          How It Works
        </h3>
        <div className="flex flex-wrap justify-center">
          <div className="bg-white rounded-lg shadow-lg p-10 m-4 max-w-sm flex flex-col items-center text-center md:w-[30vw]">
            <FaUserPlus className="text-6xl text-blue-600 mb-6" />
            <h4 className="text-2xl font-semibold mb-4">Create Account</h4>
            <p className="text-gray-700 text-lg">
              Create your account in just a few minutes and start applying.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-10 m-4 max-w-sm flex flex-col items-center text-center md:w-[30vw]">
            <MdFindInPage className="text-6xl text-blue-600 mb-6" />
            <h4 className="text-2xl font-semibold mb-4">Find a Job/Post a Job</h4>
            <p className="text-gray-700 text-lg">
              Find a job or post a job for free and get the best opportunities.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-10 m-4 max-w-sm flex flex-col items-center text-center md:w-[30vw]">
            <IoMdSend className="text-6xl text-blue-600 mb-6" />
            <h4 className="text-2xl font-semibold mb-4">
              Apply For Job/Recruit Suitable Candidates
            </h4>
            <p className="text-gray-700 text-lg">
              Apply for a job or recruit suitable candidates for your openings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
