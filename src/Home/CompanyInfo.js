import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Building2, Users, Globe2 } from 'lucide-react';
import './tailwind.css';

const CompanyInfo = () => {
  const features = [
    "Global network of industry partners",
    "AI-powered job matching technology",
    "24/7 dedicated support team",
    "Comprehensive career development resources",
    "Regular industry insights and reports",
    "Exclusive hiring events and webinars"
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center bg-blue-100 text-blue-600 px-4 py-2 rounded-full mb-6">
              <Building2 className="w-5 h-5 mr-2" />
              About Our Company
            </div>

            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Transforming the Future
              <span className="block text-blue-600">of Talent Acquisition</span>
            </h2>

            <p className="text-xl text-gray-600 mb-8">
              Founded in 2010, we've revolutionized how companies and talent connect.
              Our platform combines cutting-edge technology with human expertise to
              create meaningful career opportunities.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
              {[
                { icon: Users, title: "Expert Team", desc: "Industry veterans" },
                { icon: Globe2, title: "Global Reach", desc: "100+ countries" }
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <item.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-600">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600"
                alt="Office"
                className="rounded-2xl shadow-lg"
              />
              <img
                src="https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&q=80&w=600"
                alt="Team"
                className="rounded-2xl shadow-lg mt-8"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CompanyInfo;