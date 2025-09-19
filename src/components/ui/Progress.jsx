import React from 'react'
export default function Progress({ value=0 }) {
  return (
    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
      <div className="h-full bg-gradient-to-r from-amber-400 to-pink-400" style={{ width: `${value}%` }} />
    </div>
  )
}