import React, { useEffect, useRef, useState } from 'react'
import Button from './ui/Button.jsx'
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card.jsx'

const WIDTH = 320, HEIGHT = 420
function rand(min, max){ return Math.floor(Math.random()*(max-min+1))+min }

export default function MakeupGame({ onBack, onDiscount }){
  const canvasRef = useRef(null)
  const [score, setScore] = useState(0)
  const [running, setRunning] = useState(true)
  const basket = useRef({ x: 140, y: 380, w: 50, h: 18 })
  const items = useRef([])
  const loopId = useRef(null)

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d')
    function spawn(){ items.current.push({ x: rand(10, WIDTH-10), y: -10, vy: rand(2,4), r: 7 }) }
    function draw(){
      ctx.clearRect(0,0,WIDTH,HEIGHT)
      ctx.fillStyle = 'rgba(0,0,0,0.04)'; ctx.fillRect(0,0,WIDTH,HEIGHT)
      ctx.fillStyle = 'rgba(31,41,55,0.9)'; ctx.fillRect(basket.current.x, basket.current.y, basket.current.w, basket.current.h)
      ctx.fillStyle = 'rgba(236,72,153,0.7)'
      items.current.forEach(it => {
        it.y += it.vy
        ctx.beginPath(); ctx.arc(it.x, it.y, it.r, 0, Math.PI*2); ctx.fill()
        if (it.y + it.r >= basket.current.y && it.x >= basket.current.x && it.x <= basket.current.x + basket.current.w){
          it.y = HEIGHT + 100; setScore(s => s+1)
        }
      })
      items.current = items.current.filter(it => it.y < HEIGHT+20)
    }
    function tick(){ if(!running) return; if (Math.random() < 0.06) spawn(); draw(); loopId.current = requestAnimationFrame(tick) }
    tick(); return () => cancelAnimationFrame(loopId.current)
  }, [running])

  useEffect(() => {
    const onMove = (e) => {
      const rect = canvasRef.current.getBoundingClientRect()
      const x = (e.clientX || (e.touches?.[0]?.clientX ?? 0)) - rect.left
      basket.current.x = Math.max(0, Math.min(WIDTH - basket.current.w, x - basket.current.w/2))
    }
    window.addEventListener('mousemove', onMove); window.addEventListener('touchmove', onMove, { passive: true })
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('touchmove', onMove) }
  }, [])

  useEffect(() => { const discount = Math.min(15, Math.floor(score / 3) * 3); onDiscount && onDiscount(discount) }, [score, onDiscount])

  return (
    <Card className="shadow-2xl">
      <CardHeader><CardTitle>Play the game</CardTitle></CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-sm text-gray-700 mb-2"><span>Score: {score}</span><span>Discount up to 15%</span></div>
        <div className="rounded-2xl overflow-hidden border border-gray-200">
          <canvas ref={canvasRef} width={WIDTH} height={HEIGHT} className="w-full" style={{ touchAction: 'none' }} />
        </div>
        <div className="flex gap-3 mt-4">
          <Button className="flex-1" variant="outline" onClick={()=>setRunning(r=>!r)}>{running? 'Pause':'Resume'}</Button>
          <Button className="flex-1" variant="gradient" tone="orange" onClick={onBack}>Back to menu</Button>
        </div>
      </CardContent>
    </Card>
  )
}