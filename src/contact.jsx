import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageSquare } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', mobileNumber: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submissionMessage, setSubmissionMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      newErrors.email = 'Valid email is required';
      isValid = false;
    }
    
    if (!formData.mobileNumber || formData.mobileNumber.length < 10) {
      newErrors.mobileNumber = 'Valid mobile number is required';
      isValid = false;
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:8080/interaction/contact/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setSubmissionMessage('Form submitted successfully!');
          setFormData({ name: '', email: '', mobileNumber: '', message: '' });
          setErrors({});
        } else {
          setSubmissionMessage('Failed to submit the form. Please try again.');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        setSubmissionMessage('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Contact Us
              <span className="block text-blue-600">We're Here to Help</span>
            </h2>
            <p className="text-xl text-gray-600 mb-12">
              Have questions? Our team is ready to assist you.
            </p>

            <div className="space-y-8">
              {[
                { icon: Phone, title: "Call Us", content: "+1 (555) 123-4567" },
                { icon: Mail, title: "Email Us", content: "support@jobportal.com" },
                { icon: MapPin, title: "Visit Us", content: "123 Business Avenue" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <item.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-blue-600">{item.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gray-50 rounded-2xl p-8 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-8">
              <MessageSquare className="w-6 h-6 text-blue-600" />
              <h3 className="text-2xl font-bold text-gray-900">Send a Message</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                <input
                  type="text"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                />
                {errors.mobileNumber && <p className="text-red-600 text-sm">{errors.mobileNumber}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                ></textarea>
                {errors.message && <p className="text-red-600 text-sm">{errors.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
              >
                Submit
              </button>
            </form>

            {submissionMessage && <p className="mt-4 text-blue-600">{submissionMessage}</p>}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
