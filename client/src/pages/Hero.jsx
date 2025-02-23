import React from 'react';
import {
  Github,
  Twitter,
  MessageSquare,
  Code2,
  Calendar,
  Users,
  ArrowRight,
  Mail
} from 'lucide-react';

// Banner Component
const Banner = () => {
  return (
    <section id="home" className="bg-gradient-to-br from-blue-950 via-blue-900 to-purple-900 text-white">
      <div className="container mx-auto px-6 py-20 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 flex flex-col items-start mb-16 md:mb-0">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
            Welcome to <span className="text-blue-400">DevXHub</span>
          </h1>
          <p className="text-xl mb-8">
            A thriving community of developers, innovators, and tech enthusiasts
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="group bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center">
              Join Community 
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-transparent hover:bg-white/10 text-white font-bold py-3 px-6 border-2 border-white rounded-lg transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img
            src="/logo.png"
            alt="Community Collaboration"
            className="w-3/4 md:w-2/3 lg:w-1/2 max-w-xs rounded-full shadow-2xl transform hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>

      <div className="wave-divider">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,224C672,213,768,171,864,149.3C960,128,1056,128,1152,149.3C1248,171,1344,213,1392,234.7L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
};

// About Component
const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">About DevXHub</h2>
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-10 mb-10 md:mb-0 mr-10">
            <img 
              src="/community.png" 
              alt="About DevXHub" 
              className="rounded-lg" 
            />
          </div>
          <div className="md:w-1/2">
            <p className="text-lg mb-6">
              DevXHub is a vibrant community dedicated to fostering growth, collaboration,
              and innovation in the tech world. We believe in the power of shared knowledge
              and collective learning.
            </p>
            <p className="text-lg mb-8">
              Our mission is to create an inclusive space where developers of all levels
              can connect, learn, and build together. Whether you're a seasoned professional
              or just starting your journey, there's a place for you here.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start group">
                <div className="bg-blue-100 p-3 rounded-full mr-4 group-hover:bg-blue-200 transition-colors duration-300">
                  <Code2 className="text-blue-600 w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Skill Development</h3>
                  <p>Workshops, hackathons, and mentorship programs</p>
                </div>
              </div>
              <div className="flex items-start group">
                <div className="bg-purple-100 p-3 rounded-full mr-4 group-hover:bg-purple-200 transition-colors duration-300">
                  <Users className="text-purple-600 w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Community Support</h3>
                  <p>A network of peers to help you grow and succeed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Events Component
const Events = () => {
  const events = [
    {
      title: "Web Development Workshop",
      date: "March 15, 2025",
      description: "Learn modern web development techniques with React and Node.js",
      image: "/workshop.png"
    },
    {
      title: "Tech Talk: AI Innovations",
      date: "April 5, 2025",
      description: "Exploring the latest advancements in artificial intelligence",
      image: "/techtalk.png"
    },
    {
      title: "Annual Hackathon",
      date: "May 20-22, 2025",
      description: "48-hour coding challenge with amazing prizes and networking",
      image: "/hackathon.png"
    }
  ];

  return (
    <section id="events" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <div key={index} className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
              <div className="relative h-72 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="p-8">
                <div className="flex items-center mb-4">
                  <Calendar className="text-blue-500 w-5 h-5 mr-2" />
                  <span className="text-sm text-gray-600">{event.date}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors duration-300">{event.title}</h3>
                <p className="text-gray-600 mb-6 line-clamp-2">{event.description}</p>
                <button className="group/btn text-blue-500 font-medium hover:text-blue-700 transition-colors flex items-center">
                  Learn more 
                  <ArrowRight className="ml-1 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300">
            View All Events
          </button>
        </div>
      </div>
    </section>
  );
};

// Team Component
const Team = () => {
  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "Founder & Lead Developer",
      image: "/member1.png",
      social: { github: "#", twitter: "#" }
    },
    {
      name: "Sarah Kim",
      role: "Community Manager",
      image: "/member2.png",
      social: { github: "#", twitter: "#" }
    },
    {
      name: "Dave Rodriguez",
      role: "Technical Mentor",
      image: "/member3.png",
      social: { github: "#", twitter: "#" }
    },
    {
      name: "Michelle Chen",
      role: "Event Coordinator",
      image: "/member4.png",
      social: { github: "#", twitter: "#" }
    }
  ];

  return (
    <section id="team" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative w-48 h-48 mx-auto mb-6">
                <img
                  src={member.image}
                  alt={member.name}
                  className="rounded-full object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl font-bold mb-1">{member.name}</h3>
              <p className="text-gray-600 mb-4">{member.role}</p>
              <div className="flex justify-center space-x-4">
                <a href={member.social.github} className="text-gray-600 hover:text-blue-500 transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href={member.social.twitter} className="text-gray-600 hover:text-blue-500 transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Join Us Component
const JoinUs = () => {
  return (
    <section id="join" className="py-20 bg-gradient-to-br from-blue-950 via-blue-900 to-purple-900 text-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Join Our Community</h2>
          <p className="text-xl mb-10">
            Be part of a growing network of developers pushing the boundaries of technology.
            Connect, learn, and grow with us!
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
            <a href="#" className="group flex items-center justify-center bg-white text-blue-900 hover:bg-gray-100 font-bold py-3 px-6 rounded-lg transition-colors duration-300">
              <MessageSquare className="mr-2 w-5 h-5" /> Join Discord
            </a>
            <a href="#" className="group flex items-center justify-center bg-transparent hover:bg-white/10 text-white font-bold py-3 px-6 border-2 border-white rounded-lg transition-colors duration-300">
              <Github className="mr-2 w-5 h-5" /> Follow on GitHub
            </a>
          </div>
          <div className="mt-8">
            <a href="mailto:contact@devxhub.com" className="inline-flex items-center text-white hover:text-blue-200 transition-colors">
              <Mail className="w-5 h-5 mr-2" /> contact@devxhub.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const Hero = () => {
  return (
    <div className="bg-white">
      <Banner />
      <About />
      <Events />
      <Team />
      <JoinUs />
    </div>
  );
};

export default Hero;