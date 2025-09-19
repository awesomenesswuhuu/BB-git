import React, { useEffect, useRef, useState } from 'react'
import Progress from './ui/Progress.jsx'
import { db } from '../lib/base44.js'

const DURATION_MS = 90000

export default function FoundationCreator({ onComplete }){
  const [elapsed, setElapsed] = useState(0)
  const onCompleteRef = useRef(onComplete)
  useEffect(() => { onCompleteRef.current = onComplete }, [onComplete])
  useEffect(() => {
    const start = Date.now()
    const int = setInterval(()=> setElapsed(Date.now() - start), 200)
    const halfway = setTimeout(() => {
      const list = Array.from({length: 5}).map(() => db.util.randomFoundation())
      db.Foundation.bulkCreate(list)
    }, Math.min(45000, DURATION_MS * 0.5))
    const timer = setTimeout(() => { onCompleteRef.current && onCompleteRef.current() }, DURATION_MS)
    return () => { clearInterval(int); clearTimeout(timer); clearTimeout(halfway) }
  }, [])
  const pct = Math.min(100, Math.round((elapsed / DURATION_MS) * 100))
  const lines = ["Looking at undertones…","Measuring depth…","Balancing color…","Choosing coverage and finish…","Mixing shades…"]
  const idx = Math.min(lines.length-1, Math.floor((pct/100) * lines.length))
  return (
    <div className="fixed bottom-0 left-0 right-0 px-4 pb-4">
      <div className="glass rounded-xl p-3 shadow-xl">
        <div className="flex items-center justify-between text-xs text-gray-700 mb-2">
          <span>Creating your foundation shades</span><span>{pct}%</span>
        </div>
        <Progress value={pct} />
        <div className="text-gray-600 text-xs mt-2">{lines[idx]}</div>
      </div>
    </div>
  )
}