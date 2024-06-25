import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../Helpers/Config";


const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const { isAuthorized, user } = useContext(Context);

  const navigateTo = useNavigate();
  //Fetching all jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(
          `${BASE_URL}/job/myJobs`,
          { withCredentials: true }
        );
        setMyJobs(data.myJobs);
      } catch (error) {
        toast.error(error.response.data.message);
        setMyJobs([]);
      }
    };
    fetchJobs();
  }, []);
  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

  //Function For Enabling Editing Mode
  const handleEnableEdit = (jobId) => {
    //Here We Are Giving Id in setEditingMode because We want to enable only that job whose ID has been send.
    setEditingMode(jobId);
  };

  //Function For Disabling Editing Mode
  const handleDisableEdit = () => {
    setEditingMode(null);
  };

  //Function For Updating The Job
  const handleUpdateJob = async (jobId) => {
    const updatedJob = myJobs.find((job) => job._id === jobId);
    await axios
      .put(`${BASE_URL}/job/update-job/${jobId}`, updatedJob, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setEditingMode(null);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  //Function For Deleting Job
  const handleDeleteJob = async (jobId) => {
    await axios
      .delete(`${BASE_URL}/job/delete/${jobId}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleInputChange = (jobId, field, value) => {
    // Update the job object in the jobs state with the new value
    setMyJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId ? { ...job, [field]: value } : job
      )
    );
  };

  return (
    
    <>
      <div className="myJobs mt-16 md:mt-1 page bg-gray-50 min-h-screen py-12">
        <div className=" mx-auto px-2 md:px-6">
          {myJobs.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {myJobs.map((element) => (
                  <div
                    className="card bg-white border border-gray-200 rounded-lg shadow-lg 
                    hover:shadow-xl transition-shadow duration-300"
                    key={element._id}
                  >
                    <div className="content p-6">
                      <div className="short_fields space-y-4">
                        <div className="flex items-center space-x-2">
                          <span className="block w-24 font-medium">Title:</span>
                          <input
                            type="text"
                            className="w-full border border-gray-300 rounded-md p-2"
                            disabled={editingMode !== element._id}
                            value={element.title}
                            onChange={(e) =>
                              handleInputChange(element._id, 'title', e.target.value)
                            }
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="block w-24 font-medium">Country:</span>
                          <input
                            type="text"
                            className="w-full border border-gray-300 rounded-md p-2"
                            disabled={editingMode !== element._id}
                            value={element.country}
                            onChange={(e) =>
                              handleInputChange(element._id, 'country', e.target.value)
                            }
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="block w-24 font-medium">City:</span>
                          <input
                            type="text"
                            className="w-full border border-gray-300 rounded-md p-2"
                            disabled={editingMode !== element._id}
                            value={element.city}
                            onChange={(e) =>
                              handleInputChange(element._id, 'city', e.target.value)
                            }
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="block w-24 font-medium">Company:</span>
                          <input
                            type="text"
                            className="w-full border border-gray-300 rounded-md p-2"
                            disabled={editingMode !== element._id}
                            value={element.company}
                            onChange={(e) =>
                              handleInputChange(element._id, 'company', e.target.value)
                            }
                          />
                        </div>
                        <div>
                          <span className="block font-medium">Salary:</span>
                          {element.fixedSalary ? (
                            <input
                              type="number"
                              className="w-full border border-gray-300 rounded-md p-2"
                              disabled={editingMode !== element._id}
                              value={element.fixedSalary}
                              onChange={(e) =>
                                handleInputChange(element._id, 'fixedSalary', e.target.value)
                              }
                            />
                          ) : (
                            <div className="flex space-x-2">
                              <input
                                type="number"
                                className="w-1/2 border border-gray-300 rounded-md p-2"
                                disabled={editingMode !== element._id}
                                value={element.salaryFrom}
                                onChange={(e) =>
                                  handleInputChange(element._id, 'salaryFrom', e.target.value)
                                }
                              />
                              <input
                                type="number"
                                className="w-1/2 border border-gray-300 rounded-md p-2"
                                disabled={editingMode !== element._id}
                                value={element.salaryTo}
                                onChange={(e) =>
                                  handleInputChange(element._id, 'salaryTo', e.target.value)
                                }
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="long_field space-y-4 mt-6">
                        <div>
                          <span className="block font-medium">Description:</span>
                          <textarea
                            rows={5}
                            className="w-full border border-gray-300 rounded-md p-2"
                            value={element.description}
                            disabled={editingMode !== element._id}
                            onChange={(e) =>
                              handleInputChange(element._id, 'description', e.target.value)
                            }
                          />
                        </div>
                        <div>
                          <span className="block font-medium">Location:</span>
                          <textarea
                            rows={5}
                            className="w-full border border-gray-300 rounded-md p-2"
                            value={element.location}
                            disabled={editingMode !== element._id}
                            onChange={(e) =>
                              handleInputChange(element._id, 'location', e.target.value)
                            }
                          />
                        </div>
                        <div>
                          <span className="block font-medium">Expired:</span>
                          <select
                            className="w-full border border-gray-300 rounded-md p-2"
                            value={element.expired}
                            onChange={(e) =>
                              handleInputChange(element._id, 'expired', e.target.value)
                            }
                            disabled={editingMode !== element._id}
                          >
                            <option value={true}>TRUE</option>
                            <option value={false}>FALSE</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="button_wrapper flex justify-between items-center p-4
                     bg-gray-50 border-t border-gray-200 py-6">
                      <div className="edit_btn_wrapper flex space-x-2">
                        {editingMode === element._id ? (
                          <>
                            <button
                              onClick={() => handleUpdateJob(element._id)}
                              className="check_btn px-6 bg-green-600 text-white rounded-full p-2
                               hover:bg-green-700 transition duration-300"
                            >
                              Done
                            </button>
                            <button
                              onClick={() => handleDisableEdit()}
                              className="cross_btn px-6 bg-red-600 text-white rounded-full p-2 hover:bg-red-700 transition duration-300"
                            >
                             Cancel
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleEnableEdit(element._id)}
                            className="edit_btn px-8 bg-blue-600 text-white rounded-full p-2 
                            hover:bg-blue-700 transition duration-300"
                          >
                            Edit
                          </button>
                        )}
                      </div>
                      <button
                        onClick={() => handleDeleteJob(element._id)}
                        className="delete_btn px-8 bg-red-600 text-white rounded-full p-2
                         hover:bg-red-700 transition duration-300"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-center text-gray-500">
              You've not posted any job or may have deleted all of your jobs!
            </p>
          )}
        </div>
      </div>
    </>
    
    
  );
};

export default MyJobs;
