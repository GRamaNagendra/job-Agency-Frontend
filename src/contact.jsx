// import React, { useState } from 'react';

// const ContactUs = () => {
//     const [formData, setFormData] = useState({ name: '', email: '', mobileNumber: '', message: '' });
//     const [errors, setErrors] = useState({ name: '', email: '', message: '', mobileNumber: '' });
//     const [submissionMessage, setSubmissionMessage] = useState('');

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const validateForm = () => {
//         const newErrors = { name: '', email: '', message: '', mobileNumber: '' };
//         let valid = true;

//         // Validate name
//         if (!formData.name.trim()) {
//             newErrors.name = 'Name is required';
//             valid = false;
//         }

//         // Validate email
//         const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailPattern.test(formData.email)) {
//             newErrors.email = 'Valid email is required';
//             valid = false;
//         }

//         // Validate mobileNumber (optional validation if required)
//         if (!formData.mobileNumber || formData.mobileNumber.length < 10) {
//             newErrors.mobileNumber = 'Valid mobile number is required';
//             valid = false;
//         }

//         // Validate message
//         if (!formData.message.trim()) {
//             newErrors.message = 'Message is required';
//             valid = false;
//         }

//         setErrors(newErrors);
//         return valid;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (validateForm()) {
//             try {
//                 const response = await fetch('http://localhost:8080/interaction/contact/submit', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify(formData),
//                 });

//                 if (response.ok) {
//                     setSubmissionMessage('Form submitted successfully!');
//                     setFormData({ name: '', email: '', mobileNumber: '', message: '' });
//                 } else {
//                     setSubmissionMessage('Failed to submit the form. Please try again.');
//                 }
//             } catch (error) {
//                 console.error('Error submitting form:', error);
//                 setSubmissionMessage('An error occurred. Please try again later.');
//             }
//         }
//     };

//     return (
//         <div style={styles.body}>
//             <header style={styles.hero}>
//                 <h1>Contact Us</h1>
//                 <p>We'd love to hear from you! Reach out to us anytime.</p>
//             </header>
//             <div style={styles.container}>
//                 <h2 style={styles.sectionTitle}>Get In Touch</h2>
//                 <form style={styles.form} onSubmit={handleSubmit}>
//                     <div style={styles.formGroup}>
//                         <label style={styles.label} htmlFor="name">Name:</label>
//                         <input
//                             style={styles.input}
//                             type="text"
//                             id="name"
//                             name="name"
//                             value={formData.name}
//                             onChange={handleChange}
//                         />
//                         {errors.name && <span style={styles.errorMessage}>{errors.name}</span>}
//                     </div>
//                     <div style={styles.formGroup}>
//                         <label style={styles.label} htmlFor="email">Email:</label>
//                         <input
//                             style={styles.input}
//                             type="email"
//                             id="email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                         />
//                         {errors.email && <span style={styles.errorMessage}>{errors.email}</span>}
//                     </div>
//                     <div style={styles.formGroup}>
//                         <label style={styles.label} htmlFor="mobileNumber">Mobile Number:</label>
//                         <input
//                             style={styles.input}
//                             type="text"
//                             id="mobileNumber"
//                             name="mobileNumber"
//                             value={formData.mobileNumber}
//                             onChange={handleChange}
//                         />
//                         {errors.mobileNumber && <span style={styles.errorMessage}>{errors.mobileNumber}</span>}
//                     </div>
//                     <div style={styles.formGroup}>
//                         <label style={styles.label} htmlFor="message">Message:</label>
//                         <textarea
//                             style={styles.textarea}
//                             id="message"
//                             name="message"
//                             rows="5"
//                             value={formData.message}
//                             onChange={handleChange}
//                         />
//                         {errors.message && <span style={styles.errorMessage}>{errors.message}</span>}
//                     </div>
//                     <button style={styles.button} type="submit">Submit</button>
//                 </form>

//                 {submissionMessage && <p>{submissionMessage}</p>}
//             </div>
//         </div>
//     );
// };

// const styles = {
//     body: { /* Your styles here */ },
//     hero: { /* Your styles here */ },
//     container: { /* Your styles here */ },
//     sectionTitle: { /* Your styles here */ },
//     form: { /* Your styles here */ },
//     formGroup: { /* Your styles here */ },
//     label: { /* Your styles here */ },
//     input: { /* Your styles here */ },
//     textarea: { /* Your styles here */ },
//     button: { /* Your styles here */ },
//     errorMessage: { color: 'red' }
// };

// export default ContactUs;
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageSquare } from 'lucide-react';

const ContactForm = () => {
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
              Get in Touch
              <span className="block text-blue-600">We're Here to Help</span>
            </h2>

            <p className="text-xl text-gray-600 mb-12">
              Have questions about our platform? Need assistance with your job search?
              Our team is ready to help you succeed.
            </p>

            <div className="space-y-8">
              {[
                {
                  icon: Phone,
                  title: "Call Us",
                  content: "+1 (555) 123-4567",
                  subtitle: "Monday to Friday, 9am - 6pm"
                },
                {
                  icon: Mail,
                  title: "Email Us",
                  content: "support@jobportal.com",
                  subtitle: "We'll respond within 24 hours"
                },
                {
                  icon: MapPin,
                  title: "Visit Us",
                  content: "123 Business Avenue",
                  subtitle: "San Francisco, CA 94107"
                }
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
                    <p className="text-sm text-gray-500">{item.subtitle}</p>
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
              <h3 className="text-2xl font-bold text-gray-900">Send Message</h3>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="How can we help you?"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;