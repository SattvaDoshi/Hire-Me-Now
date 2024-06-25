import React from "react";
import {
  MdOutlineDesignServices,
  MdOutlineWebhook,
  MdAccountBalance,
  MdOutlineAnimation,
} from "react-icons/md";
import { TbAppsFilled } from "react-icons/tb";
import { FaReact } from "react-icons/fa";
import { GiArtificialIntelligence } from "react-icons/gi";
import { IoGameController } from "react-icons/io5";

const PopularCategories = () => {
  const categories = [
    {
      id: 1,
      title: "Graphics & Design",
      subTitle: "305 Open Positions",
      icon: <MdOutlineDesignServices />,
    },
    {
      id: 2,
      title: "Mobile App Development",
      subTitle: "500 Open Positions",
      icon: <TbAppsFilled />,
    },
    {
      id: 3,
      title: "Frontend Web Development",
      subTitle: "200 Open Positions",
      icon: <MdOutlineWebhook />,
    },
    {
      id: 4,
      title: "MERN STACK Development",
      subTitle: "1000+ Open Postions",
      icon: <FaReact />,
    },
    {
      id: 5,
      title: "Account & Finance",
      subTitle: "150 Open Positions",
      icon: <MdAccountBalance />,
    },
    {
      id: 6,
      title: "Artificial Intelligence",
      subTitle: "867 Open Positions",
      icon: <GiArtificialIntelligence />,
    },
    {
      id: 7,
      title: "Video Animation",
      subTitle: "50 Open Positions",
      icon: <MdOutlineAnimation />,
    },
    {
      id: 8,
      title: "Game Development",
      subTitle: "80 Open Positions",
      icon: <IoGameController />,
    },
  ];
  return (
    <div className="py-20">
    <div className="max-w-7xl mx-auto px-4">
      <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">POPULAR CATEGORIES</h3>
      <div className="flex flex-wrap justify-center">
        {categories.map((element) => (
          <div
            key={element.id}
            className="bg-gray-100 rounded-lg shadow-md p-4 m-4 md:h-[15vh] md:w-[35vw] w-[85vw]
            flex items-center max-w-xs hover:shadow-lg transition-shadow duration-300"
          >
            <div className="bg-blue-100 text-blue-500 rounded-full p-3 mr-4">
              {element.icon}
            </div>
            <div>
              <p className="text-lg font-bold">{element.title}</p>
              <p className="text-gray-600 text-base font-light">{element.subTitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};

export default PopularCategories;
