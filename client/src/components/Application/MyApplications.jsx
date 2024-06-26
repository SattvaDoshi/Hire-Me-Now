import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";
import { BASE_URL } from "../../Helpers/Config";

const MyApplications = () => {
  const { user } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");

  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/");
      return;
    }

    const fetchApplications = async () => {
      try {
        let response;
        if (user && user.role === "Employer") {
          response = await axios.get(
           `${BASE_URL}/application/employer/getall`,
            { withCredentials: true }
          );
          console.log(response);
        } else {
          response = await axios.get(
            `${BASE_URL}/application/jobseeker/getall`,
            { withCredentials: true }
          );
          console.log(response);
        }
        setApplications(response.data.applications);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    fetchApplications();
  }, [isAuthorized, navigateTo, user]);

  const deleteApplication = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/application/delete/${id}`, {
        withCredentials: true,
      });
      setApplications((prevApplications) =>
        prevApplications.filter((application) => application._id !== id)
      );
      toast.success("Application deleted successfully.");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className="my_applications page min-h-screen bg-gray-100">
    <div>
      {applications.length === 0 ? (
        <h4>No Applications Found</h4>
      ) : (
        <div className="my-6 mt-6 md:mt-2">
          {applications.map((element) => (
            <div className="px-2 md:px-4" key={element._id}>
              <ApplicationCard
                element={element}
                deleteApplication={deleteApplication}
                openModal={openModal}
              />
            </div>
          ))}
        </div>
      )}
    </div>
    {modalOpen && <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />}
  </section>
  
  );
};

const ApplicationCard = ({ element, deleteApplication, openModal }) => {
  return (
    <div className="flex items-center justify-center mt-6  bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg my-6 overflow-hidden max-w-4xl w-full">
        <div className="flex items-center justify-between bg-black p-6">
          <h2 className="text-2xl font-bold text-white">{element.name}</h2>
          <button
            onClick={() => deleteApplication(element._id)}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
          >
            Delete Application
          </button>
        </div>
        <div className="p-6 md:flex">
          <div className="md:flex-1 mb-4 md:mb-0">
            <div className="mb-4">
              <p className="text-gray-700 font-semibold">Email</p>
              <p className="text-gray-600 flex items-center">
                <svg className="w-5 h-5 mr-2 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 8V7l-8 5-8-5v1l8 5 8-5z" />
                  <path d="M3 6v12h18V6H3zm18-2c1.104 0 2 .896 2 2v12c0 1.104-.896 2-2 2H3c-1.104 0-2-.896-2-2V6c0-1.104.896-2 2-2h18z" />
                </svg>
                {element.email}
              </p>
            </div>
            <div className="mb-4">
              <p className="text-gray-700 font-semibold">Phone</p>
              <p className="text-gray-600 flex items-center">
                <svg className="w-5 h-5 mr-2 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79a15.564 15.564 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.58 3.57.58.55 0 1 .45 1 1v3.5c0 .55-.45 1-1 1C9.85 21 3 14.15 3 6c0-.55.45-1 1-1H7.5c.55 0 1 .45 1 1 0 1.24.21 2.45.58 3.57.11.35.02.74-.25 1.02l-2.2 2.2z" />
                </svg>
                {element.phone}
              </p>
            </div>
            <div className="mb-4">
              <p className="text-gray-700 font-semibold">Role</p>
              <p className="text-gray-600">{element.jobRole}</p>
            </div>
            <div className="mb-4">
              <p className="text-gray-700 font-semibold">Cover Letter</p>
              <p className="text-gray-600">{element.coverLetter}</p>
            </div>
            
          </div>
          <div className="md:w-1/3 flex flex-col items-center justify-center">
            <div className="w-full mb-4">
              <img
                src={element.resume.url}
                alt="resume"
                className="w-full h-auto rounded-lg cursor-pointer border border-gray-200"
                onClick={() => openModal(element.resume.url)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyApplications;
