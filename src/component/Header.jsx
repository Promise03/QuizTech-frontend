import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./themeToggle";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed top-0 w-full z-50 navbar  text-white shadow-md">
      <div className="flex items-center justify-between px-4 py-3">
        <h1 className="text-3xl font-serif font-bold">QuizTech</h1>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="hover:text-blue-400">Home</Link>
          <Link to="/about" className="hover:text-blue-400">About</Link>
          <Link to="/contact" className="hover:text-blue-400">Contact</Link>
          <Link to="/login" className="hover:text-blue-400">Login</Link>
          <ThemeToggle />
        </nav>

        {/* Mobile Toggle Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 rounded hover:bg-gray-800 focus:outline-none"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700">
          <nav className="flex flex-col gap-4 p-4">
            <Link to="/" onClick={closeMenu} className="hover:text-blue-400">
              Home
            </Link>
            <Link to="/about" onClick={closeMenu} className="hover:text-blue-400">
              About
            </Link>
            <Link to="/contact" onClick={closeMenu} className="hover:text-blue-400">
              Contact
            </Link>
            <Link to="/login" onClick={closeMenu} className="hover:text-blue-400">
              Login
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      )}
    </header>
  );
}
