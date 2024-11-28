import React, { useEffect, useState } from 'react';
import { Camera, ArrowUp, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.pageYOffset > 300);
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <footer className="relative bg-gradient-to-br from-indigo-950 via-indigo-900 to-indigo-800 text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 to-indigo-950/50">
        <div className="absolute top-10 left-20 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-16 w-40 h-40 bg-blue-500/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 sm:px-12 py-12 sm:py-16">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          {/* Left Column: Brand Section */}
          <div className="space-y-6 col-span-1 lg:col-span-2">
            {/* Brand Title */}
            <div className="flex items-center justify-start space-x-4">
              <Camera
                className="w-16 h-16 text-gradient-to-br from-blue-400 to-blue-600 animate-pulse drop-shadow-xl"
              />
              <h1 className="relative text-6xl font-extrabold tracking-wide uppercase text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                style={{
                  letterSpacing: '0.05em', // Reduced letter spacing
                  fontFamily: "'Roboto', sans-serif",
                  lineHeight: '1.1',
                }}
              >
                <span
                  className="text-7xl font-black text-blue-500 drop-shadow-xl animate-bounce transition-transform duration-300 hover:scale-110"
                  style={{
                    textTransform: 'uppercase',
                  }}
                >
                  I
                </span>
                nno<span className="text-blue-400">Tech</span>
              </h1>
            </div>

            {/* Brand Description */}
            <div className="space-y-6 text-blue-200 leading-loose">
              <p
                className="text-xl font-semibold"
                style={{
                  letterSpacing: '0.05em',
                  lineHeight: '1.6',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                  color: '#E0E0E0',
                }}
              >
                <span className="text-blue-400 font-bold text-2xl">InnoTech:</span> Pioneering the Future of Innovation.
              </p>
              <p
                className="text-lg font-light tracking-wide"
                style={{
                  lineHeight: '1.7',
                  color: '#B0B0B0',
                  fontWeight: '300',
                }}
              >
                Transforming industries with cutting-edge technology, empowering businesses worldwide. Our mission is to
                create solutions that challenge the norm and redefine digital possibilities.
              </p>
              <p
                className="text-lg"
                style={{
                  fontSize: '1.2rem',
                  fontWeight: '400',
                  letterSpacing: '0.02em',
                  lineHeight: '1.8',
                  color: '#A9A9A9',
                }}
              >
                At InnoTech, we are committed to building sustainable, intelligent solutions for the digital era. We
                believe in pushing the boundaries of innovation to deliver tangible value to businesses of all sizes.
              </p>
              <p
                className="text-lg font-medium"
                style={{
                  fontSize: '1.1rem',
                  fontWeight: '500',
                  letterSpacing: '0.03em',
                  color: '#91A7C2',
                }}
              >
                We are driven by the idea that technology has the power to change lives. Our work goes beyond development
                – it is about creating experiences that shape the future of industries.
              </p>
              <p
                className="text-lg font-bold"
                style={{
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#66BB6A',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                Innovation isn't just our mission, it's part of our DNA—shaping tomorrow’s technologies today.
              </p>
              <p
                className="text-lg"
                style={{
                  fontWeight: '400',
                  lineHeight: '1.9',
                  color: '#B0B0B0',
                  fontSize: '1.2rem',
                  letterSpacing: '0.02em',
                }}
              >
                Together, we are crafting a new digital reality—one solution at a time. Our approach is holistic, ensuring
                each project delivers long-term results with the highest standards.
              </p>
              <p
                className="text-lg font-semibold text-blue-500"
                style={{
                  fontWeight: '700',
                  lineHeight: '1.7',
                  fontSize: '1.2rem',
                }}
              >
                At InnoTech, our products are engineered for excellence, focused on delivering value, quality, and growth
                for our clients.
              </p>
              <p
                className="text-lg text-blue-400"
                style={{
                  fontSize: '1.2rem',
                  fontWeight: '600',
                  letterSpacing: '0.04em',
                  lineHeight: '1.8',
                }}
              >
                Join us as we unlock new frontiers and redefine the future of technology. InnoTech: Where visionary thinking
                meets world-class execution.
              </p>
            </div>
          </div>

          {/* Right Column: Quick Links */}
          <div className="space-y-6">
            <h4
              className="text-4xl font-extrabold tracking-wide uppercase text-blue-400 border-b-2 border-blue-500 pb-0"
              style={{
                fontSize: '2.5rem',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                fontFamily: "'Roboto', sans-serif",
                color: '#64B5F6',
              }}
            >
              Quick Links
            </h4>
            <ul className="grid grid-cols-2 gap-6 text-blue-200 text-lg">
              {[
                { text: 'Home', url: '/home2' },
                { text: 'About Us', url: '/about' },
                { text: 'Job Postings', url: '/job-postings' },
                { text: 'Profile', url: '/profile' },
                { text: 'Contact Us', url: '/contact' },
                { text: 'Privacy Policy', url: '/privacy' },
                { text: 'Terms & Conditions', url: '/terms' },
              ].map(({ text, url }) => (
                <li key={text}>
                  <Link
                    to={url}
                    className="flex items-center space-x-2 hover:text-blue-400 transition-transform duration-200 hover:translate-x-2"
                  >
                    <ChevronRight className="w-5 h-5 text-blue-400" />
                    <span className="font-semibold">{text}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Contact Section below Quick Links */}
            <div className="pt-12 border-t border-blue-800/50">
              <h4 className="text-3xl font-bold tracking-wide uppercase mb-6 text-blue-400">
                Contact Us
              </h4>
              <ul className="space-y-4 text-blue-200 text-lg leading-relaxed">
                <li className="flex items-center space-x-4">
                  <span>📍 123 Innovation Street, Tech City, TX 75001</span>
                </li>
                <li className="flex items-center space-x-4">
                  <span>📞 +1 (800) 123-4567</span>
                </li>
                <li className="flex items-center space-x-4">
                  <span>📧 contact@innotech.com</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center text-sm text-blue-400 py-6">
          <p>© 2024 InnoTech. All Rights Reserved.</p>
        </div>
      </div>

      {/* Scroll To Top Button */}
      {isVisible && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 p-4 bg-blue-500 text-white rounded-full shadow-2xl hover:bg-blue-600"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </footer>
  );
};

export default Footer;
