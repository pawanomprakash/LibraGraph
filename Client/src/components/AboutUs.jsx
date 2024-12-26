import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-gray-900 text-white py-16 px-8 md:px-24">
      <div className="container mx-auto">
        {/* Section Title */}
        <h1 className="text-5xl font-extrabold text-center mb-16 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600">
          About Us
        </h1>

        {/* Vision Section */}
        
        <section className="mb-20">
          <h2 className="text-4xl font-semibold mb-6 text-gray-400">Our Vision</h2>
          <p className="text-lg leading-relaxed text-gray-300 max-w-2xl mx-auto">
            
            At <span className="font-semibold text-white">LibraGraphAI</span>, we aim to revolutionize library management and knowledge sharing using cutting-edge technologies like knowledge graphs and AI. Our mission is to empower institutions and individuals to unlock the potential of organized knowledge in ways never imagined before.
          </p>
        </section>

        {/* Mentor Section */}
        <section className="mb-20">
          <h2 className="text-4xl font-semibold mb-8 text-gray-400">Our Mentor: RK Sir</h2>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
            <img
              src="https://media.licdn.com/dms/image/v2/D5603AQEtgQ-znX5GcA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1730376242183?e=1740614400&v=beta&t=0dDFop2dp7cCBJPMyXrVw-BP23Y1S2vZ2pihjnGbjIc"
              alt="RK Sir"
              className="w-48 h-48 rounded-full shadow-xl"
            />
            <div className="text-center md:text-left">
              <p className="text-lg leading-relaxed text-gray-300 mb-4">
                Ramarao Kadiyala, the visionary founder of <span className="font-semibold text-white">Broadrange AI</span>, has been an unwavering source of inspiration for our team. With a deep passion for artificial intelligence and decades of expertise in fostering innovative ideas, he has guided us through every challenge and milestone.
              </p>
              <p className="text-lg leading-relaxed text-gray-300">
                Under his mentorship, we’ve learned to think beyond the ordinary, embrace challenges as opportunities, and stay committed to our goals. His pioneering work in AI, coupled with his dedication to nurturing young talent, continues to drive us forward.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section>
          <h2 className="text-4xl font-semibold mb-8 text-gray-400">Meet the Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Team Member: Vidhvath */}
            <div className="text-center bg-gray-800 p-6 rounded-lg shadow-xl hover:scale-105 transition-all duration-300">
              <img
                src="https://media.licdn.com/dms/image/v2/D5603AQEBZ_jnJ0gYnA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1721583429964?e=1740614400&v=beta&t=J2dLu-agjDo_F8jxETCdpkwFF-LCj_WhZZ88p5ilEfk"
                alt="Vidhvath"
                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-gray-500"
              />
              <h3 className="text-2xl font-bold text-white">Vidhvath (You)</h3>
              <p className="text-gray-300 mt-2">
                Frontend developer and Gitflow manager, responsible for building the entire user interface and ensuring seamless collaboration through effective Git workflows.
              </p>
            </div>

            {/* Team Member: Jatin */}
            <div className="text-center bg-gray-800 p-6 rounded-lg shadow-xl hover:scale-105 transition-all duration-300">
              <img
                src="https://media.licdn.com/dms/image/v2/D5603AQHbKiUdLk0PHQ/profile-displayphoto-shrink_400_400/B56ZOcuGBiHYAk-/0/1733501150537?e=1740614400&v=beta&t=KHSzJMQ-oZAfv5y5iExeahyCRKBXxBIEtfD0HN5mVWg"
                alt="Jatin"
                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-gray-500"
              />
              <h3 className="text-2xl font-bold text-white">Jatin</h3>
              <p className="text-gray-300 mt-2">
                Designed the AI-powered chatbot, worked on implementing restrictions, and managed the database to ensure efficient operations.
              </p>
            </div>

            {/* Team Member: Prabhas Varma */}
            <div className="text-center bg-gray-800 p-6 rounded-lg shadow-xl hover:scale-105 transition-all duration-300">
              <img
                src="https://media.licdn.com/dms/image/v2/D4E03AQG4RGaHc8ojjw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1701773948139?e=1740614400&v=beta&t=KX1BKpbYBJYTlQtvWnLJ6tMJag2WXPRgF9QqIcaziiA"
                alt="Prabhas Varma"
                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-gray-500"
              />
              <h3 className="text-2xl font-bold text-white">Prabhas Varma</h3>
              <p className="text-gray-300 mt-2">
                Backend specialist, spearheading the development of backend systems and recommendation engines, ensuring robust and scalable solutions.
              </p>
            </div>

            {/* Team Member: Pawan */}
            <div className="text-center bg-gray-800 p-6 rounded-lg shadow-xl hover:scale-105 transition-all duration-300">
              <img
                src="https://i.pinimg.com/originals/77/a6/65/77a6657040df52fb7c998a6cf6ed10d4.jpg"
                alt="Pawan"
                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-gray-500"
              />
              <h3 className="text-2xl font-bold text-white">Pawan</h3>
              <p className="text-gray-300 mt-2">
                Developed authentication systems, routing, and the AI voice assistant, ensuring seamless user experiences across all features.
              </p>
            </div>

            {/* Team Member: Raniya */}
            <div className="text-center bg-gray-800 p-6 rounded-lg shadow-xl hover:scale-105 transition-all duration-300">
              <img
                src="https://th.bing.com/th/id/R.54814a6f7afded1aabf758a4ffdfadde?rik=2%2b4byFKKxZzXcA&riu=http%3a%2f%2fpm1.narvii.com%2f5903%2f3239c3f8dd727d6c3c2564f318bb8d040af529e8_00.jpg&ehk=VKkj3u532uO%2bV8o4NrnfIp6UVwPqUFA4f3WsrAEUA7w%3d&risl=&pid=ImgRaw&r=0"
                alt="Raniya"
                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-gray-500"
              />
              <h3 className="text-2xl font-bold text-white">Raniya</h3>
              <p className="text-gray-300 mt-2">
                A crucial contributor to the backend, focusing on categories and overall system architecture, ensuring functionality and efficiency.
              </p>
            </div>

            
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
