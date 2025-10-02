import React from 'react'
import { Link } from 'react-router-dom'
import Home from '../pages/Home'

export default function Header() {
  return (
   <>
    <header className='flex justify-between align-center px-3 py-3.5 bg-amber-50 fixed z-50 top-0 w-full shadow-amber-600'>
       <h1 className='text-3xl font-serif font-light'>QuizTech</h1>
      <nav>
        <ul className='flex gap-19'>
            <Link to="/"><li>Home</li></Link>
            <Link to="/about"><li>About</li></Link>
            <Link><li>FAQ</li></Link>
            <Link to='/contact'><li>Contact</li></Link>
            <Link to="/Login"><li>login</li></Link>
        </ul>
      </nav>
    </header>
   </>
  )
}
