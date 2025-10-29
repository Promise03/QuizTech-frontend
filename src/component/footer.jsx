import React from 'react'
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';
import ThemeToggle from './themeToggle'; // ✅ adjust path if needed

export default function Footer() {
  return (
    <footer className="footer text-sm md:text-base bg-[var(--bg-dark)] text-[var(--text-light)]">
      <div className="flex flex-wrap justify-between gap-10 px-8 py-12 md:px-16 md:py-16 max-w-7xl mx-auto">
        
        {/* === Brand Info === */}
        <div className="w-full md:w-1/4 space-y-3">
          <h1 className="text-3xl font-semibold mb-3 font-serif text-[var(--primary-light)]">
            QuizTech
          </h1>
          <p className="text-[var(--text-light)] leading-relaxed">
            At QuizTech, our mission is to make learning engaging, accessible, and rewarding for everyone. 
            We believe knowledge should inspire curiosity, not boredom — that’s why we create fun, interactive quizzes 
            that challenge minds and spark growth. Join us in redefining how the world learns, one question at a time.
          </p>
        </div>

        {/* === Quick Links / Navigation === */}
        <div className="w-full md:w-1/5">
          <h3 className="text-2xl font-semibold mb-4 text-[var(--text-dark)]">
            Quick Links
          </h3>
          <nav className="flex flex-col md:flex-col items-start gap-3 text-[var(--text-light)]">
            <Link to="/" className="hover:text-[var(--accent)] transition-colors duration-300">
              Home
            </Link>
            <Link to="/about" className="hover:text-[var(--accent)] transition-colors duration-300">
              About
            </Link>
            <Link to="/contact" className="hover:text-[var(--accent)] transition-colors duration-300">
              Contact
            </Link>
            <Link to="/login" className="hover:text-[var(--accent)] transition-colors duration-300">
              Login
            </Link>

            {/* 🌙 Theme Toggle */}
            <div className="mt-2">
              <ThemeToggle />
            </div>
          </nav>
        </div>

        {/* === Contact Info === */}
        <div className="w-full md:w-1/3 space-y-5">
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-[var(--text-dark)]">
              Contact Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-[var(--accent)]" />
                <span>rachealoluwapelumi77@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-[var(--accent)]" />
                <span>+234 813 9188 264</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin size={18} className="text-[var(--accent)]" />
                <span>123 Quiz Street, Knowledge City, QZ 12345</span>
              </div>
            </div>
          </div>

          {/* === Social Links === */}
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-[var(--text-dark)]">
              Follow Us
            </h3>
            <div className="flex space-x-6">
              {[Facebook, Twitter, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="hover:text-[var(--accent)] transition-colors duration-300"
                >
                  <Icon size={22} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* === Subscribe Form === */}
        <div className="w-full md:w-1/4">
          <p className="mb-4 font-semibold text-[var(--text-dark)]">
            Stay updated with our latest projects!
          </p>
          <form className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Your email"
              className="border border-[var(--border-color)] bg-[var(--bg-medium)] text-[var(--text-dark)] px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            />
            <button
              type="submit"
              className="px-6 py-3 font-bold text-white rounded-xl shadow-lg 
                         bg-[var(--primary)] hover:bg-[var(--primary-light)] 
                         transform hover:scale-105 transition-all duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
              
      {/* === Divider and Copyright === */}
      <div className="border-t border-[var(--border-color)] text-center py-5 text-[var(--text-light)] text-sm">
        © {new Date().getFullYear()} QuizTech. All rights reserved.
      </div>
    </footer>
  );
}
