// import React from 'react';
// import './Herosection.css';

// const EnhancedJobPosting = () => {
//   return (
//     <div className="enhanced-container">
//       <div className="left-section">
//         <h2>100+</h2>
//         <p>Companies Hiring</p>
//         <h2>500+</h2>
//         <p>Job Openings</p>
//         <h2>90%</h2>
//         <p>Success Rate</p>
//       </div>
//       <div className="right-section">
//         <h1 className="hsh1">Find Your Dream Job Today 
//           <br/>Your Dream Job <span className="highlight-text">Awaits</span></h1>
//         <p>Discover countless opportunities in your desired field.</p>
//         <p>Explore exciting roles from top companies worldwide.</p>
//         <p><span className="highlight-text">Apply now</span> and take your career to the next level.</p>
//         <p>Find jobs that perfectly match your skills and aspirations.</p>
//         <a href="#" className="cta-button">Explore Jobs</a>
//       </div>
//       <div className="wave-shape"></div>
//     </div>
//   );
// }

// export default EnhancedJobPosting;



import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Star, Zap, Trophy } from 'lucide-react';

const Herosection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-20"
              animate={{
                x: [Math.random() * 1000, Math.random() * 1000],
                y: [Math.random() * 500, Math.random() * 500],
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Unlock Premium Features
              <span className="block text-yellow-300">Elevate Your Job Search</span>
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Get ahead of the competition with our premium features and exclusive job listings
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Sparkles,
                title: "Priority Listing",
                description: "Get your profile seen first by top employers"
              },
              {
                icon: Star,
                title: "Advanced Analytics",
                description: "Track your application performance"
              },
              {
                icon: Zap,
                title: "Instant Alerts",
                description: "Real-time notifications for perfect matches"
              },
              {
                icon: Trophy,
                title: "Premium Support",
                description: "24/7 dedicated career counseling"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/20 transition-all"
              >
                <feature.icon className="w-12 h-12 text-yellow-300 mb-6" />
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-blue-100">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mt-16"
          >
            <button className="bg-yellow-400 text-blue-900 px-12 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 transform hover:scale-105 transition-all shadow-lg">
              Upgrade to Premium
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Herosection;