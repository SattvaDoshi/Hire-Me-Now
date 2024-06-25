import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";
import { BASE_URL } from "../../Helpers/Config";

const Application = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState("");
  const [jobRole, setjobRole] = useState("");
  const [resume, setResume] = useState(null);

  const { isAuthorized, user } = useContext(Context);

  const navigateTo = useNavigate();

  // Function to handle file input changes
  const handleFileChange = (event) => {
    const resume = event.target.files[0];
    setResume(resume);
  };

  const { id } = useParams();
  const handleApplication = async (e) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("jobRole", jobRole);
    formData.append("coverLetter", coverLetter);
    formData.append("resume", resume);
    formData.append("jobId", id);

    try {
      const { data } = await axios.post(
        `${BASE_URL}/application/post`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setName("");
      setEmail("");
      setCoverLetter("");
      setPhone("");
      setjobRole("");
      setResume("");
      toast.success(data.message);
      navigateTo("/applications/me");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!isAuthorized || (user && user.role === "Employer")) {
    navigateTo("/");
  }


  return (
    <section className="bg-gray-100 py-16">
    <div className="container mx-auto max-w-3xl bg-white p-8 shadow-lg rounded-lg">
      <h3 className="text-3xl font-bold mb-8 text-center text-gray-800">Job Application</h3>
      <form onSubmit={handleApplication} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-md "
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-md "
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-md "
              required
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-gray-700 font-semibold mb-2">
              Role
            </label>
            <input
              id="address"
              type="text"
              placeholder="Role to apply"
              value={jobRole}
              onChange={(e) => setjobRole(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-md "
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="coverLetter" className="block text-gray-700 font-semibold mb-2">
            Cover Letter
          </label>
          <textarea
            id="coverLetter"
            placeholder="Enter your cover letter"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-md "
            rows="5"
            required
          />
        </div>
        <div>
          <label htmlFor="resume" className="block text-gray-700 font-semibold mb-2">
            Upload Resume
          </label>
          <input
            id="resume"
            type="file"
            accept=".jpg , .JPEG, .png"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-md "
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 font-semibold"
        >
          Submit Application
        </button>
      </form>
    </div>
  </section>
  );
};

export default Application;
