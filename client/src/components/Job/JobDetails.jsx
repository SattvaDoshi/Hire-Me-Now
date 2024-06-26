import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
import { BASE_URL } from "../../Helpers/Config";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigateTo = useNavigate();
  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/job/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setJob(res.data.job);
      })
      .catch((error) => {
        navigateTo("/notfound");
      });
  }, []);

  if (!isAuthorized) {
    navigateTo("/login");
  }

  return (
    <section className="py-8 min-h-screen mt-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:p-8">
            <div className="border-2 border-gray-300 rounded-lg p-6">
              <h4 className="text-2xl font-semibold mb-4 text-center">
                Job Information
              </h4>
              <div className="space-y-2">
                <p className="text-gray-600 font-semibold">
                  Title: <span className="font-normal">{job.title}</span>
                </p>
                <p className="text-gray-600 font-semibold">
                  Company: <span className="font-normal">{job.company}</span>
                </p>
                <p className="text-gray-600 font-semibold">
                  Country: <span className="font-normal">{job.country}</span>
                </p>
                <p className="text-gray-600 font-semibold">
                  City: <span className="font-normal">{job.city}</span>
                </p>
                <p className="text-gray-600 font-semibold">
                  Location: <span className="font-normal">{job.location}</span>
                </p>
                <p className="text-gray-600 font-semibold">
                  Job Posted On:{" "}
                  <span className="font-normal">{job.jobPostedOn}</span>
                </p>
              </div>
            </div>
            <div className="border-2 border-gray-300 rounded-lg p-6">
              <h4 className="text-2xl font-semibold mb-4 text-center">
                Job Details
              </h4>
              <div className="space-y-4">
                <p className="text-gray-600 font-semibold">
                  Description:{" "}
                  <span className="font-normal">{job.description}</span>
                </p>
                <p className="text-gray-600 font-semibold">
                  Salary:{" "}
                  <span className="font-normal">
                    {job.fixedSalary
                      ? job.fixedSalary
                      : `${job.salaryFrom} - ${job.salaryTo}`}
                  </span>
                </p>
                {user && user.role === "Employer" ? (
                  <></>
                ) : (
                  <Link
                    to={`/application/${job._id}`}
                    className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
                  >
                    Apply Now
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobDetails;