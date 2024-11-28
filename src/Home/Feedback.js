import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import axios from 'axios';

const FeedbackSection = () => {
  const [feedback, setFeedback] = useState([]);
  const [error, setError] = useState(null);

  // Fetch feedback from API
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get('http://localhost:8080/interaction/feedback/all', { withCredentials: true });
        setFeedback(response.data);
      } catch (err) {
        setError('Failed to load feedback.');
        console.error(err);
      }
    };

    fetchFeedback();
  }, []);

  // Limit feedback to first 3 items (Optional)
  const limitedFeedback = feedback.slice(0, 3);

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Users Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Success stories from professionals who found their perfect career match
          </p>
        </motion.div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          className="pb-12"
        >
          {limitedFeedback.map((item, index) => (
            <SwiperSlide key={item.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-8 h-full"
              >
                <Quote className="w-10 h-10 text-blue-600 mb-6 " />
                <p className="text-gray-900 font-medium text-lg md:text-xl leading-relaxed tracking-wide mb-8 ml-8">
  {item.message}
</p>

                <div className="flex items-center gap-4">
                  <img
                    src={item.user.profilePicture || "https://via.placeholder.com/50"}
                    alt={item.user.username}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                  <div>
  <h3 className="font-extrabold text-indigo-700 text-xl md:text-xl leading-snug tracking-wider">
    {item.user.username}
  </h3>
</div>

                    {/* Add user role or company if needed */}
                    {/* <p className="text-sm text-gray-500">{item.user.role}</p> */}
                  </div>
                </div>
              
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default FeedbackSection;
