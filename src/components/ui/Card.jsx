import React from 'react'
export function Card({ className='', children }) { return <div className={`glass rounded-2xl p-6 sm:p-8 ${className}`}>{children}</div> }
export function CardHeader({ className='', children }) { return <div className={`mb-6 ${className}`}>{children}</div> }
export function CardTitle({ className='', children }) { return <h1 className={`text-3xl sm:text-5xl font-light leading-tight ${className}`}>{children}</h1> }
export function CardContent({ className='', children }) { return <div className={`${className}`}>{children}</div> }