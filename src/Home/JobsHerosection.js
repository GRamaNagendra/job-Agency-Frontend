import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  Globe,
  Rocket
} from 'lucide-react';

const JobsHeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    { icon: <Globe className="w-6 h-6" />, text: 'Global Opportunities' },
    { icon: <Rocket className="w-6 h-6" />, text: 'Fast-Growing Companies' },
    { icon: <Sparkles className="w-6 h-6" />, text: 'Top-Tier Benefits' }
  ];

  return (
    <div className="relative min-h-[70vh] h-auto bg-gray-950 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Particle Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#4f4f4f3b_1%,transparent_20%),radial-gradient(circle_at_top_left,#6b72803b_1%,transparent_20%)] bg-[size:16px_16px] [mask-image:radial-gradient(circle,rgba(0,0,0,0.8)_70%,transparent)]">
          <div className="absolute inset-0 pointer-events-none opacity-40 animate-[move-particles_10s_linear_infinite]"></div>
        </div>

        {/* Top Gradient Overlay */}
        <div className="absolute top-0 left-0 right-0 h-72 bg-gradient-to-br from-violet-500/40 via-transparent to-transparent animate-gradient-motion"></div>

        {/* Bottom Gradient Overlay */}
        <div className="absolute bottom-0 right-0 left-0 h-72 bg-gradient-to-tr from-blue-500/30 via-transparent to-transparent animate-gradient-motion delay-1000"></div>
      </div>

      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Main Content */}
          <div className={`space-y-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Hero Header */}
            <div className="text-center space-y-8">
              <h1 className="text-5xl md:text-6xl font-bold">
                <span className="inline-block bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                  Where Careers
                </span>
                <br />
                <span className="inline-block mt-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Take Flight
                </span>
              </h1>

              {/* Feature Tags */}
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center bg-white/5 rounded-full px-4 py-2 backdrop-blur-sm">
                    <span className="mr-2">{feature.icon}</span>
                    {feature.text}
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                <Link
                  to="/job-postings"
                  className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-blue-500/25"
                >
                  <span className="relative flex items-center">
                    Explore Opportunities
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                <Link
                  to="/profile"
                  className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden rounded-lg bg-white/10 backdrop-blur-sm text-white font-bold transition-all duration-300 hover:bg-white/20 hover:scale-105"
                >
                  <span className="relative flex items-center">
                    Create Profile
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Gradient */}
      </div>

      <style>{`
        @keyframes move-particles {
          0% { transform: translate(0, 0); }
          100% { transform: translate(-10px, -20px); }
        }

        @keyframes gradient-motion {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .animate-gradient-motion {
          animation: gradient-motion 8s ease infinite;
        }
      `}</style>
         <div className="absolute bottom-10 mb-10 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent mb-[10px]"></div>
  
    </div>
  );
};

export default JobsHeroSection;
