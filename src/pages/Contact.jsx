import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";
import Header from "../component/Header";
import Footer from "../component/footer";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ Message sent! We’ll get back to you soon.");
  };

  return (
    <>
      <Header />

      {/* Hero Section */}
      <div
        className="relative h-[70vh] flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1497493292307-31c376b6e479?auto=format&fit=crop&w=1920&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/50"></div>
        <div
          className="relative z-10 text-center max-w-2xl px-6"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 leading-tight">
            Contact <span className="text-blue-400">Us</span>
          </h1>
          <p
            className="text-lg md:text-2xl text-gray-200"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            Have questions or feedback? We’d love to hear from you.
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="min-h-screen contact px-8 py-20 con-card">
        <div
          className="container mx-auto max-w-5xl p-10 md:p-16 rounded-2xl shadow-xl backdrop-blur-md hover:shadow-2xl transition-all duration-300"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-center text-indigo-900 mb-12">
            Get in Touch
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    required
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  ></textarea>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="inline-block px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-indigo-600 to-blue-500 rounded-lg shadow-lg hover:from-indigo-700 hover:to-blue-600 transform hover:scale-105 transition-all duration-300"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>

            {/* Contact Details & Social Media */}
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-semibold text-indigo-800 mb-4">
                  Contact Information
                </h3>
                <div className="flex items-center space-x-4 text-lg text-gray-600 mb-3">
                  <Mail size={24} className="text-indigo-600" />
                  <span>rachealoluwapelumi77@gmail.com</span>
                </div>
                <div className="flex items-center space-x-4 text-lg text-gray-600 mb-3">
                  <Phone size={24} className="text-indigo-600" />
                  <span>+234 813 9188 264</span>
                </div>
                <div className="flex items-center space-x-4 text-lg text-gray-600">
                  <MapPin size={24} className="text-indigo-600" />
                  <span>123 Quiz Street, Knowledge City, QZ 12345</span>
                </div>
              </div>

              <div>
                <h3 className="text-3xl font-semibold text-indigo-800 mb-4">
                  Follow Us
                </h3>
                <div className="flex space-x-6">
                  <a
                    href="#"
                    className="text-gray-500 hover:text-indigo-600 transition-colors duration-300"
                  >
                    <Facebook size={32} />
                  </a>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-indigo-600 transition-colors duration-300"
                  >
                    <Twitter size={32} />
                  </a>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-indigo-600 transition-colors duration-300"
                  >
                    <Instagram size={32} />
                  </a>
                </div>
              </div>

              {/* Optional Google Map */}
              <div className="pt-6">
                {/* <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.086679185285!2d-122.41941548468117!3d37.77492927975939!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808c0d123!2sQuiz+HQ!5e0!3m2!1sen!2sus!4v1610000000000!5m2!1sen!2sus"
                  width="100%"
                  height="250"
                  allowFullScreen=""
                  loading="lazy"
                  className="rounded-xl border-none"
                  title="Quiz HQ Location"
                ></iframe> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Contact;
