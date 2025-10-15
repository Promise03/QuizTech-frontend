import React from 'react'
import { Link } from 'react-router-dom'
import ThemeToggle from './themeToggle'

export default function Header() {
  return (
   <>
    <header className='flex justify-between align-center px-3 py-3.5 text-white fixed z-50 top-0 w-full shadow-shadow navbar'>
       <h1 className='text-3xl font-serif font-light'>QuizTech</h1>
      <nav>
        <ul className='flex gap-19 items-center'>
            <Link to="/"><li>Home</li></Link>
            <Link to="/about"><li>About</li></Link>
            {/* <Link to="/"><li>FAQ</li></Link> */}
            <Link to='/contact'><li>Contact</li></Link>
            <Link to="/Login"><li>login</li></Link>
              <ThemeToggle />
        </ul>
      </nav>
    </header>
   </>
  )
}
