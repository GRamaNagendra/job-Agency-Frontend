import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "aos/dist/aos.css";
import AOS from "aos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";

const AdminJobPosting = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    companyName: "",
    location: "",
    salary: "",
    category: "",
  });
  const [errors, setErrors] = useState({});
  const [updateStatus, setUpdateStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  // Initialize AOS animations
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const validateFields = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Title is required.";
    if (!formData.description) newErrors.description = "Description is required.";
    if (!formData.companyName) newErrors.companyName = "Company name is required.";
    if (!formData.category) newErrors.category = "Category is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateFields()) return;

    const payload = { ...formData, live: false }; // Job will be saved as not live initially

    try {
      setLoading(true);
      await axios.post("http://localhost:8080/job-postings/admin/create", payload, {
        withCredentials: true,
      });
      setUpdateStatus("Job posting created successfully, but it is not live.");
      setFormData({
        title: "",
        description: "",
        companyName: "",
        location: "",
        salary: "",
        category: "",
      });
      navigate("/job-postings");
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        general: "An error occurred while creating the job posting.",
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const inputClass = (field) =>
    errors[field] ? "border-red-500" : "border-gray-300";

  return (
    <div
      className="container mx-auto px-6 py-10 bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg shadow-lg"
      data-aos="fade-up"
    >
      <h2 className="text-3xl font-bold text-center mb-6">Create Job Posting</h2>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {errors.general && (
          <div className="col-span-2 text-red-500 text-center">{errors.general}</div>
        )}

        <label>
          Job Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full p-3 rounded-md border focus:ring focus:ring-blue-300 ${inputClass(
              "title"
            )}`}
            placeholder="Enter job title"
          />
        </label>

        <label>
          Company Name:
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className={`w-full p-3 rounded-md border focus:ring focus:ring-blue-300 ${inputClass(
              "companyName"
            )}`}
            placeholder="Enter company name"
          />
        </label>

        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={`w-full p-3 rounded-md border focus:ring focus:ring-blue-300 ${inputClass(
              "description"
            )}`}
            placeholder="Enter job description"
          />
        </label>

        <label>
          Location:
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-3 rounded-md border focus:ring focus:ring-blue-300"
            placeholder="Enter location"
          />
        </label>

        <label>
          Salary:
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            className="w-full p-3 rounded-md border focus:ring focus:ring-blue-300"
            placeholder="Enter salary"
          />
        </label>

        <label>
          Category:
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`w-full p-3 rounded-md border focus:ring focus:ring-blue-300 ${inputClass(
              "category"
            )}`}
          >
            <option value="">Select category</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Internship">Internship</option>
            <option value="IT">IT</option>
            <option value="Finance">Finance</option>
            <option value="Marketing">Marketing</option>
            <option value="HR">HR</option>
          </select>
        </label>
      </form>

      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={handleSave}
          disabled={loading}
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          <FontAwesomeIcon icon={faSave} className="mr-2" />
          {loading ? "Saving..." : "Save Job Posting"}
        </button>
      </div>

      {updateStatus && (
        <div className="mt-4 text-green-500 text-center">{updateStatus}</div>
      )}
    </div>
  );
};

export default AdminJobPosting;
