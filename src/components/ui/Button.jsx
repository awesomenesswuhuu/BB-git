import React from 'react'

const gradients = {
  primary: 'from-amber-400 to-pink-400',
  blue: 'from-blue-400 to-cyan-400',
  pink: 'from-pink-400 to-rose-400',
  green: 'from-emerald-400 to-lime-400',
  orange: 'from-orange-400 to-amber-400',
}

export default function Button({ as='button', className='', children, variant='glass', tone='primary', ...props }) {
  const Cmp = as
  let base = 'inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-medium btn-press focus:outline-none focus:ring-2 focus:ring-pink-300/60'
  let styles = ''
  if (variant === 'glass') styles = 'glass hover:bg-white/80'
  if (variant === 'solid') styles = 'bg-gray-900 text-white hover:bg-gray-800 shadow-lg'
  if (variant === 'outline') styles = 'border border-gray-300 hover:bg-gray-50 bg-white/70'
  if (variant === 'gradient') styles = `text-white bg-gradient-to-r ${gradients[tone] || gradients.primary} shadow-lg`
  return <Cmp className={`${base} ${styles} ${className}`} {...props}>{children}</Cmp>
}