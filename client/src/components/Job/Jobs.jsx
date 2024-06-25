import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";
import { BASE_URL } from "../../Helpers/Config";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    try {
      axios
        .get(`${BASE_URL}/job/get-all`, {
          withCredentials: true,
        })
        .then((res) => {
          setJobs(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (!isAuthorized) {
    navigateTo("/");
  }

  const filteredJobs = jobs.jobs?.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (

    <section className="p-6 min-h-screen bg-gray-50">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">All Available Jobs</h1>
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search by job title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-5 py-3 border border-gray-300 rounded-lg w-full max-w-md shadow-sm "
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-6">
          {filteredJobs?.map((job) => (

            <div
              key={job._id}
              className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300"
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">{job.title}</h3>
              <div className="mb-4">
                <span className="block text-sm font-medium text-gray-500">Company</span>
                <p className="text-gray-700">{job.company}</p>
              </div>
              <div className="mb-4">
                <span className="block text-sm font-medium text-gray-500">Salary</span>
                <p className="text-gray-600"> {job.fixedSalary
                      ? job.fixedSalary
                      : `${job.salaryFrom} - ${job.salaryTo}`}</p>
              </div>
              <Link
                to={`/job/${job._id}`}
                className="inline-block text-white bg-blue-600 hover:bg-blue-700 font-medium 
                rounded-lg px-4 py-2 transition-colors duration-300"
              >
                Job Details
              </Link>
            </div>
            
          ))}
        </div>
      </div>
    </section>
    
  );
};

export default Jobs;