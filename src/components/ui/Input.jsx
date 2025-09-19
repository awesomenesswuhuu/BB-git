import React from 'react'
export default function Input({ className='', error=false, ...props }) {
  return (
    <input className={`w-full rounded-xl bg-white/80 border ${error ? 'border-red-300' : 'border-gray-300'} px-4 py-3 outline-none focus:border-pink-300 placeholder-gray-500 ${className}`} {...props} />
  )
}