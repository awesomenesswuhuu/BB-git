import React from 'react'
export default function Badge({ children, className='' }) {
  return (
    <span className={`inline-flex items-center rounded-full border border-gray-200 bg-white/80 px-3 py-1 text-xs text-gray-700 ${className}`}>{children}</span>
  )
}