import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
import { BASE_URL } from "../../Helpers/Config";


const PostJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [company, setcompany] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [fixedSalary, setFixedSalary] = useState("");
  const [salaryType, setSalaryType] = useState("default");

  const { isAuthorized, user } = useContext(Context);

  const handleJobPost = async (e) => {
    e.preventDefault();

    if (salaryType === "Fixed Salary") {
      setSalaryFrom("");
      setSalaryFrom("");
    } else if (salaryType === "Ranged Salary") {
      setFixedSalary("");
    } else {
      setSalaryFrom("");
      setSalaryTo("");
      setFixedSalary("");
    }
    await axios
      .post(
        `${BASE_URL}/job/create-job`,
        fixedSalary.length >= 4
          ? {
            title,
            description,
            company,
            country,
            city,
            location,
            fixedSalary,
          }
          : {
            title,
            description,
            company,
            country,
            city,
            location,
            salaryFrom,
            salaryTo,
          },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const navigateTo = useNavigate();
  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

  return (
    <div className="job_post min-h-screen page bg-gray-100 py-10">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">POST NEW JOB</h3>
    <form onSubmit={handleJobPost} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="flex flex-wrap -mx-3 mb-4">
        <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
          <input
            className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight "
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Job Title"
          />
        </div>
        <div className="w-full md:w-1/2 px-3">
          <input
            className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight "
            type="text"
            value={company}
            onChange={(e) => setcompany(e.target.value)}
            placeholder="Company Name"
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-4">
        <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
          <input
            className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight"
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Country"
          />
        </div>
        <div className="w-full md:w-1/2 px-3">
          <input
            className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight "
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
          />
        </div>
      </div>
      <div className="mb-4">
        <input
          className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight "
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
        />
      </div>
      <div className="salary_wrapper mb-4 md:w-[25vw]">
        <select
          className="shadow appearance-none border rounded w-full py-3 px-6
           text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={salaryType}
          onChange={(e) => setSalaryType(e.target.value)}
        >
          <option className="px-6" value="default">Select Salary Type </option>
          <option value="Fixed Salary">Fixed Salary</option>
          <option value="Ranged Salary">Ranged Salary</option>
        </select>

        <div>
          {salaryType === "default" ? (
            <p className="text-red-500 mt-2 text-sm">Please provide Salary Type *</p>
          ) : salaryType === "Fixed Salary" ? (
            <input
              className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight mt-2"
              type="number"
              placeholder="Enter Fixed Salary"
              value={fixedSalary}
              onChange={(e) => setFixedSalary(e.target.value)}
            />
          ) : (
            <div className="ranged_salary flex mt-2">
              <input
                className="shadow appearance-none border rounded w-1/2 py-3 px-3 text-gray-700 leading-tight mr-2"
                type="number"
                placeholder="Salary From"
                value={salaryFrom}
                onChange={(e) => setSalaryFrom(e.target.value)}
              />
              <input
                className="shadow appearance-none border rounded w-1/2 py-3 px-3 text-gray-700 leading-tight "
                type="number"
                placeholder="Salary To"
                value={salaryTo}
                onChange={(e) => setSalaryTo(e.target.value)}
              />
            </div>
          )}
        </div>
      </div>
      <div className="mb-4">
        <textarea
          className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          rows="10"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Job Description"
        />
      </div>
      <div className="flex justify-end">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Create Job
        </button>
      </div>
    </form>
  </div>
</div>
      
  );
};

export default PostJob;
