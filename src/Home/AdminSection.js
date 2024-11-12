import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Calendar, Award, BookOpen } from 'lucide-react';

const AdminProfile = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div
              className="absolute inset-0 bg-blue-500 rounded-3xl rotate-6 opacity-10"
              style={{ width: '520px', height: '500px' }}  // Adjusted background overlay size
            ></div>
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800"
              alt="Admin Profile"
              className="relative rounded-3xl shadow-2xl"
              style={{ width: '500px', height: '500px' }} // Adjusted image size
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Meet Our Director
              <span className="block text-blue-400 mt-2">John Anderson</span>
            </h2>

            <p className="text-gray-300 text-lg mb-8">
              With over 15 years of experience in talent acquisition and HR management,
              John leads our mission to transform how companies and talent connect in
              the digital age.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {[
                { icon: Award, text: "15+ Years Experience" },
                { icon: BookOpen, text: "Harvard Business School" },
                { icon: Calendar, text: "Available for Consultation" },
                { icon: MapPin, text: "San Francisco, CA" }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 text-gray-300">
                  <item.icon className="w-5 h-5 text-blue-400" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-full transition-all">
                <Mail className="w-5 h-5" />
                Contact Now
              </button>
              <button className="flex items-center gap-2 border border-blue-400 hover:bg-blue-400/10 px-6 py-3 rounded-full transition-all">
                <Phone className="w-5 h-5" />
                Schedule Call
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AdminProfile;
