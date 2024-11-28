import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "aos/dist/aos.css";
import AOS from "aos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";

const JobPosting = () => {
  const { id } = useParams();  // Get the id from the URL
  const navigate = useNavigate();
  const [updateStatus, setUpdateStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    companyName: "",
    location: "",
    salary: "",
    category: "",
  });
  const [jobViewData, setJobViewData] = useState(null);  // For viewing job post details
  const [loading, setLoading] = useState(false);

  const isEditing = window.location.pathname.includes("/edit/");  // Detect if it's editing mode
  const isCreating = window.location.pathname.includes("/create");  // Detect if it's creating mode
  const isViewing = !isEditing && !isCreating;  // Viewing mode (when no edit or create path)

  useEffect(() => {
    AOS.init({ duration: 1000 });

    if (isEditing || isViewing) {
      setLoading(true);
      axios
        .get(`http://localhost:8080/job-postings/${id}`, { withCredentials: true })
        .then((response) => {
          const data = response.data.data;
          setFormData({ ...formData, ...data });
          setJobViewData(data);  // Set data for viewing job post
        })
        .catch(() => {
          setErrors((prev) => ({ ...prev, general: "Failed to load job posting." }));
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id, isEditing, isViewing]);

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

    const payload = { ...formData, live: false }; // Ensure the job is not live for now

    try {
      if (isEditing) {
        // Update job posting
        await axios.put(`http://localhost:8080/job-postings/${id}`, payload, {
          withCredentials: true,
        });
        setUpdateStatus("Job posting updated successfully.");
      } else {
        // Create a new job posting
        await axios.post("http://localhost:8080/job-postings/user/create", payload, {
          withCredentials: true,
        });
        setUpdateStatus("Job posting created successfully, but it is not live.");
      }
      navigate("/job-postings");
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        general: "An error occurred while saving the job posting.",
      }));
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

  const renderJobView = () => {
    if (loading) return <p>Loading job details...</p>;
    if (!jobViewData) return <p>No job details available.</p>;

    return (
      <div className="p-6 bg-white shadow-md rounded-md mt-8">
        <h3 className="text-2xl font-semibold">{jobViewData.title}</h3>
        <p className="text-gray-700">
          <strong>Company:</strong> {jobViewData.companyName}
        </p>
        <p className="text-gray-700">
          <strong>Location:</strong> {jobViewData.location}
        </p>
        <p className="text-gray-700">
          <strong>Salary:</strong> {jobViewData.salary ? `₹${jobViewData.salary}` : "Not specified"}
        </p>
        <p className="text-gray-700">
          <strong>Category:</strong> {jobViewData.category || "Not specified"}
        </p>
        <p className="text-gray-700">
          <strong>Description:</strong> {jobViewData.description}
        </p>
      </div>
    );
  };

  return (
    <div
      className="container mx-auto px-6 py-10 bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg shadow-lg"
      data-aos="fade-up"
    >
      <h2 className="text-3xl font-bold text-center mb-6">
        {isEditing ? "Edit Job Posting" : isCreating ? "Create Job Posting" : "Job Posting Details"}
      </h2>

      {/* Conditionally render form or job post details based on mode */}
      {isEditing || isCreating ? (
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
      ) : (
        // Only show job post details if not in editing or creating mode
        renderJobView()
      )}

      {(isEditing || isCreating) && (
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            <FontAwesomeIcon icon={faSave} className="mr-2" />
            Save Job Posting
          </button>
        </div>
      )}

      {updateStatus && (
        <div className="mt-4 text-green-500 text-center">{updateStatus}</div>
      )}
    </div>
  );
};

export default JobPosting;
