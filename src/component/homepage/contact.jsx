import React from "react";
import { Phone, MapPin, MessageSquare } from "lucide-react";

export default function Contact() {
  return (
    <div className="py-20 px-6 md:px-16 bg-gray-900 text-white contact-content">
      <section>
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-semibold mb-4 text-blue-400">
            Get In Touch
          </h2>
          <p className="max-w-xl mx-auto text-gray-400">
            Have questions or feedback? We'd love to hear from you!
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-12">
          {/* Contact Info */}
          <div className="flex-1">
            <h2 className="text-3xl mb-6 font-semibold">Contact Us</h2>
            <p className="mb-8 text-gray-400 leading-relaxed">
              Our team is here to answer any questions you may have about
              QuizTech. Reach out to us and we'll respond as soon as we can.
            </p>

            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <MapPin className="text-blue-500" />
                <span>123 Quiz Street, Knowledge City, Edutopia</span>
              </div>

              <div className="flex items-center gap-4">
                <Phone className="text-blue-500" />
                <span>+234 813 9188 264</span>
              </div>

              <div className="flex items-center gap-4">
                <MessageSquare className="text-blue-500" />
                <span>rachealoluwapelumi77@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="flex-1 bg-gray-800 p-8 rounded-xl shadow-lg contact">
            <form className="space-y-5">
              <div>
                <label htmlFor="name" className="block mb-2 ">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-md  border focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label htmlFor="email" className="block mb-2 ">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 rounded-md  border  focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block mb-2 ">
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  placeholder="Subject"
                  className="w-full px-4 py-3 rounded-md border  focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label htmlFor="message" className="block mb-2 ">
                  Message
                </label>
                <textarea
                  id="message"
                  placeholder="Your Message"
                  rows="5"
                  className="w-full px-4 py-3 rounded-md  border   focus:ring-2 focus:ring-blue-500 outline-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full mt-3 bg-blue-600 hover:bg-blue-700 transition-all duration-300 rounded-md py-3 font-semibold "
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
