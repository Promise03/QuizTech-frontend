import React from 'react'

export default function button(label, onclick) {
  return (
    <div>
      <button className="inline-block px-8 py-4 text-xl font-bold text-white bg-indigo-600 rounded-full shadow-lg hover:bg-indigo-700 transform hover:scale-105 transition-all duration-300">{label}</button>
    </div>
  )
}
