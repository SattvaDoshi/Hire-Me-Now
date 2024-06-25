import React from "react";
import { FaMicrosoft, FaApple } from "react-icons/fa";
import { SiTesla } from "react-icons/si";

const PopularCompanies = () => {
  const companies = [
    {
      id: 1,
      title: "Microsoft",
      location: "Street 10 Karachi, Pakistan",
      openPositions: 10,
      icon: <FaMicrosoft />,
    },
    {
      id: 2,
      title: "Tesla",
      location: "Street 10 Karachi, Pakistan",
      openPositions: 5,
      icon: <SiTesla />,
    },
    {
      id: 3,
      title: "Apple",
      location: "Street 10 Karachi, Pakistan",
      openPositions: 20,
      icon: <FaApple />,
    },
  ];
  return (
    <div className="bg-gray-100 py-20">
    <div className="max-w-7xl mx-auto px-4">
      <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">TOP COMPANIES</h3>
      <div className="flex flex-wrap justify-center">
        {companies.map((element) => (
          <div
            key={element.id}
            className="bg-white rounded-lg shadow-md p-6 m-4 max-w-md flex flex-col hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 text-blue-500 rounded-full p-3 mr-4">{element.icon}</div>
              <div>
                <p className="text-lg font-bold">{element.title}</p>
                <p className="text-gray-600">{element.location}</p>
              </div>
            </div>
            <button className="bg-blue-100 text-blue-500 font-bold py-2 px-4 rounded-md self-start mt-auto">
              Open Positions {element.openPositions}
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};

export default PopularCompanies;
