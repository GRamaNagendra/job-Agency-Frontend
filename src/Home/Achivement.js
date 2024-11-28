import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Trophy, Target, Users, Briefcase, Award, TrendingUp } from 'lucide-react';
import { gsap } from 'gsap';

const Achievements = () => {
  const counterRef = useRef(null);
  const isInView = useInView(counterRef);

  const stats = [

    { icon: Users, value: '1M+', label: 'Active Users', color: 'from-blue-500 to-blue-600' },
    { icon: Briefcase, value: '500K+', label: 'Jobs Posted', color: 'from-purple-500 to-purple-600' },
    { icon: Trophy, value: '95%', label: 'Success Rate', color: 'from-green-500 to-green-600' },
    { icon: Target, value: '50+', label: 'Employees', color: 'from-red-500 to-red-600' }

  ];

  const awards = [
    {
      icon: Award,
      title: "Best Job Platform 2024",
      description: "Recognized for innovative job matching technology"
    },
    {
      icon: TrendingUp,
      title: "Fastest Growing Platform",
      description: "500% user growth in the last year"
    }
  ];

  useEffect(() => {
    if (isInView) {
      const counters = counterRef.current.querySelectorAll('.counter-value');
      counters.forEach(counter => {
        const value = counter.getAttribute('data-value');
        gsap.fromTo(counter, 
          { textContent: '0' },
          {
            duration: 2,
            textContent: value,
            snap: { textContent: 1 },
            ease: 'power1.inOut'
          }
        );
      });
    }
  }, [isInView]);

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            Our Achievements
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Leading the industry with innovative solutions and exceptional results
          </p>
        </motion.div>

        <div ref={counterRef} className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-gradient-to-r ${stat.color} rounded-2xl p-6 text-center transform hover:scale-105 transition-all`}
            >
              <stat.icon className="w-10 h-10 mx-auto mb-4" />
              <h3 className="counter-value text-4xl font-bold mb-2" data-value={stat.value}>
                {stat.value}
              </h3>
              <p className="text-gray-200">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {awards.map((award, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gray-800 rounded-2xl p-8 flex items-start gap-6"
            >
              <div className="bg-blue-600/20 p-4 rounded-xl">
                <award.icon className="w-8 h-8 text-blue-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">{award.title}</h3>
                <p className="text-gray-400">{award.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
