import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LinkedinIcon, 
  TwitterIcon, 
  GithubIcon, 
  Mail, 
  Briefcase, 
  Users, 
  Calendar, 
  MapPin, 
  Award, 
  GraduationCap, 
  ArrowRight, 
  ArrowLeft 
} from 'lucide-react';

const TeamSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const teamMembers = [
    {
      name: 'Jane Doe',
      role: 'Head of Recruitment',
      image: '/api/placeholder/400/400',
      bio: 'Expert in sourcing top talent, building strong employer branding, and optimizing recruitment pipelines.',
      experience: '12+ years',
      education: 'MBA, Human Resources Management',
      location: 'New York, NY',
      expertise: ['Talent Acquisition', 'Employer Branding', 'Diversity Hiring'],
      achievements: ['Best HR Leader 2022', 'Top 50 Recruiters Worldwide'],
      hiringStats: { jobsPosted: 3500, hires: 2500 },
      teamSize: 25,
      joinDate: 'April 2018',
      quote: 'Hiring great people makes a great company.',
      social: { linkedin: '#', twitter: '#', github: '#', email: 'jane@example.com' }
    },
    {
      name: 'John Smith',
      role: 'Senior HR Manager',
      image: '/api/placeholder/400/400',
      bio: 'Skilled in employee relations, recruitment strategies, and fostering a positive organizational culture.',
      experience: '10+ years',
      education: 'MSc, Human Resource Management',
      location: 'San Francisco, CA',
      expertise: ['Employee Relations', 'HR Strategy', 'Performance Management'],
      achievements: ['HR Excellence Award 2021', 'Top HR Professional'],
      hiringStats: { jobsPosted: 2800, hires: 2100 },
      teamSize: 18,
      joinDate: 'March 2019',
      quote: 'People are the key to success.',
      social: { linkedin: '#', twitter: '#', github: '#', email: 'john@example.com' }
    },
    {
      name: 'Alice Williams',
      role: 'Talent Acquisition Lead',
      image: '/api/placeholder/400/400',
      bio: 'Passionate about finding the best talent and aligning them with company values and mission.',
      experience: '8+ years',
      education: 'B.A. in Psychology, Stanford University',
      location: 'Chicago, IL',
      expertise: ['Recruiting', 'Interviewing', 'Onboarding'],
      achievements: ['Top Recruiter 2020', 'Innovative Hiring Practices'],
      hiringStats: { jobsPosted: 2200, hires: 1800 },
      teamSize: 12,
      joinDate: 'July 2020',
      quote: 'Hire for attitude, train for skill.',
      social: { linkedin: '#', twitter: '#', github: '#', email: 'alice@example.com' }
    }
  ];

  const handleSlideChange = (index) => {
    setActiveIndex(index);
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % teamMembers.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + teamMembers.length) % teamMembers.length);
  };

  const CardStats = ({ icon: Icon, label, value }) => (
    <div className="flex items-center gap-2">
      <Icon className="w-4 h-4 text-emerald-400" />
      <span className="text-zinc-400 text-sm">{label}:</span>
      <span className="text-white font-medium">{value}</span>
    </div>
  );

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-zinc-900 via-emerald-950 to-zinc-900 overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(4,120,87,0.15)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(4,120,87,0.1)_0%,transparent_60%)]" />
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="grid" width="4" height="4" patternUnits="userSpaceOnUse">
              <path d="M 4 0 L 0 0 0 4" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.2" />
            </pattern>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      {/* Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 py-24">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-emerald-950/50 border border-emerald-800/30 backdrop-blur-sm">
            <Award className="w-4 h-4 text-emerald-400 mr-2" />
            <span className="text-emerald-300 text-sm font-medium tracking-wider">Job Posting Experts</span>
          </div>
          
          <h2 className="text-6xl font-bold text-white mb-6 tracking-tight">
            Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Team</span>
          </h2>
          
          <p className="text-zinc-300 text-lg max-w-2xl mx-auto font-light">
            The experts behind creating great job opportunities and shaping exceptional careers.
          </p>
        </motion.div>

        {/* Carousel with Arrows */}
        <div className="relative px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="relative max-w-4xl mx-auto"
            >
              <div className="bg-gradient-to-b from-zinc-900/80 to-zinc-900/40 backdrop-blur-xl rounded-3xl p-8 border border-emerald-900/20">
                {/* Card Header */}
                <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
                  {/* Profile Image */}
                  <div className="relative">
                    <div className="w-32 h-32 relative">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 opacity-20 blur-xl" />
                      <img
                        src={teamMembers[activeIndex].image}
                        alt={teamMembers[activeIndex].name}
                        className="w-32 h-32 rounded-full object-cover border-2 border-emerald-800/30"
                      />
                    </div>
                  </div>

                  {/* Header Info */}
                  <div className="text-center md:text-left flex-1">
                    <h3 className="text-3xl font-bold text-white mb-2 tracking-wide">
                      {teamMembers[activeIndex].name}
                    </h3>
                    <p className="text-emerald-400 font-medium text-lg uppercase tracking-wider mb-3">
                      {teamMembers[activeIndex].role}
                    </p>
                    <p className="text-zinc-300 text-lg mb-4">
                      {teamMembers[activeIndex].bio}
                    </p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-2">
                      {teamMembers[activeIndex].expertise.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 rounded-full bg-emerald-900/30 text-emerald-300 text-sm border border-emerald-800/30"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Stats */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <CardStats icon={Users} label="Team Size" value={teamMembers[activeIndex].teamSize} />
                  <CardStats icon={Briefcase} label="Experience" value={teamMembers[activeIndex].experience} />
                  <CardStats icon={MapPin} label="Location" value={teamMembers[activeIndex].location} />
                  <CardStats icon={Calendar} label="Join Date" value={teamMembers[activeIndex].joinDate} />
                  <CardStats icon={GraduationCap} label="Education" value={teamMembers[activeIndex].education} />
                  <CardStats icon={Award} label="Achievements" value={teamMembers[activeIndex].achievements.join(', ')} />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 px-4">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full bg-emerald-800/50 text-white shadow-lg hover:bg-emerald-800"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
          </div>
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 px-4">
            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-emerald-800/50 text-white shadow-lg hover:bg-emerald-800"
            >
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamSection;
