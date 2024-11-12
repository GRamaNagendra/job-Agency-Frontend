import React from 'react';
import { Link } from 'react-router-dom';
//import { Search, Users, Briefcase, Star, ChevronRight, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import './App2.css';

const App2 = () => {
  const services = [
    //{ icon: <Search />, title: 'Job Search', description: 'Find your dream job' },
    //{ icon: <Users />, title: 'Networking', description: 'Connect with professionals' },
   // { icon: <Briefcase />, title: 'Career Advice', description: 'Expert guidance for your career' },
   // { icon: <Star />, title: 'Skill Development', description: 'Enhance your skillset' },
    // Add more services here
  ];

  const testimonials = [
    { name: 'John Doe', role: 'Software Engineer', content: 'JobHub helped me land my dream job!' },
    { name: 'Jane Smith', role: 'Marketing Manager', content: 'The career advice I received was invaluable.' },
    { name: 'Mike Johnson', role: 'Data Analyst', content: 'I found great networking opportunities through JobHub.' },
    // Add more testimonials here
  ];

  const terms = [
    { title: 'Acceptance of Terms', content: 'By accessing or using JobHub, you agree to be bound by these Terms and Conditions.' },
    { title: 'User Accounts', content: 'You are responsible for maintaining the confidentiality of your account and password.' },
    // Add more terms here
  ];

  const jobListings = [
    { id: 1, title: 'Software Engineer', company: 'Tech Co', type: 'Full-time', location: 'New York, NY', level: 'Experienced' },
    { id: 2, title: 'Marketing Specialist', company: 'Brand Inc', type: 'Part-time', location: 'Remote', level: 'Entry-level' },
    // Add more job listings here
  ];

  return (
    <div className="app2">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <h1>Find Your Dream Job Today</h1>
          <p>Connecting talented professionals with amazing opportunities</p>
          <Link to="/jobs">Explore Jobs</Link>
        </div>
      </section>

      {/* About Us Section */}
      <section className="about-section">
        <div className="container">
          <h2>About Us</h2>
          <div className="grid">
            <div>
              <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Team working together" />
            </div>
            <div>
              <p>JobHub is dedicated to revolutionizing the job search experience. We connect talented professionals with exciting opportunities across various industries.</p>
              <p>Our mission is to empower job seekers and employers alike, creating meaningful connections that drive careers and businesses forward.</p>

            </div>
          </div>
        </div>
      </section>

      {/* CEO Message */}
      <section className="ceo-section">
        <div className="container">
          <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" alt="CEO" />
          <h3>Message from Our CEO</h3>
          <p>"At JobHub, we believe in the power of connecting talent with opportunity. Our platform is designed to make the job search process seamless and rewarding for both job seekers and employers. We're committed to innovation and excellence in everything we do."</p>
          <p>- Sarah Johnson, CEO of JobHub</p>
        </div>
      </section>

      {/* Our Services */}
      <section className="services-section">
        <div className="container">
          <h2>Our Services</h2>
          <div className="grid">
            {services.map((service, index) => (
              <div key={index}>
                <div>{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="container">
          <h2>What Our Users Say</h2>
          <div className="grid">
            {testimonials.map((testimonial, index) => (
              <div key={index}>
                <p>"{testimonial.content}"</p>
                <div>{testimonial.name}</div>
                <div>{testimonial.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="call-to-action-section">
        <div className="container">
          <h2>Ready to Start Your Job Search?</h2>
          <p>Join thousands of professionals who have found their dream jobs through JobHub</p>
          <Link to="/jobs">Explore Jobs Now</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div>
            <h3>JobHub</h3>
            <p>Connecting talent with opportunities.</p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/jobs">Jobs</Link></li>
              <li><Link to="/terms">Terms & Conditions</Link></li>
            </ul>
          </div>
          <div>
            <h4>Contact Us</h4>
            <p>Email: info@jobhub.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
          <div>
            <h4>Follow Us</h4>
            <div>
             
            </div>
          </div>
        </div>
        <div>
          <p>&copy; 2024 JobHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App2;
