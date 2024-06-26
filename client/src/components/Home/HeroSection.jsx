import React from "react";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const details = [
    {
      id: 1,
      title: "1,23,441",
      subTitle: "Live Job",
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      title: "91220",
      subTitle: "Companies",
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: "2,34,200",
      subTitle: "Job Seekers",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "1,03,761",
      subTitle: "Employers",
      icon: <FaUserPlus />,
    },
  ];
  return (
    <>
<section className="md:py-20 bg-gray-100">
  <div className="max-w-7xl mt-44 md:mt-6 mx-auto px-4">
    <div className="flex flex-col md:flex-row items-center mb-16">
      <div className="md:w-1/2 mb-8 md:mb-0">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Find Job in your</h1>
        <h1 className="text-4xl md:text-6xl font-bold mb-6"> Dream Company</h1>
        <p className="text-lg text-gray-600 mb-0">
          Find your job which suits you and your Profession , get parterned 
          with big Companies and grow your Skills
        </p>
        <button className="bg-blue-500 text-white px-8 py-2 rounded text-lg mt-6">
          <Link to='/login'>
          Get Startrd
          </Link>
        </button>
      </div>
      <div className="md:w-1/2">
        <img src="/Hero.png" alt="hero" className="mx-auto" />
      </div>
    </div>
    <div className="flex flex-wrap justify-center md:justify-between -mx-4">
      {details.map((element) => (
        <div
          key={element.id}
          className="bg-gray-100 rounded-lg shadow-md p-6 mx-4 mb-8 flex items-center max-w-xs hover:shadow-lg transition-shadow duration-300"
        >
          <div className="bg-blue-100 text-blue-500 rounded-full p-3 mr-4">
            {element.icon}
          </div>
          <div>
            <p className="font-bold">{element.title}</p>
            <p className="text-gray-600">{element.subTitle}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
    </>
  );
};

export default HeroSection;
