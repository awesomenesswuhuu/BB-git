import React, { useEffect, useRef, useState } from 'react'
import Button from './ui/Button.jsx'
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card.jsx'
import Progress from './ui/Progress.jsx'

export default function FaceScanner({ onDone, onBack }){
  const videoRef = useRef(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let stream;
    async function init(){
      try{
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          await videoRef.current.play()
        }
      }catch(e){ console.warn('Camera blocked; simulating scan.', e) }
    }
    init()
    const id = setInterval(() => setProgress(p => Math.min(100, p+1.5)), 80)
    const timer = setTimeout(() => { onDone() }, 4500)
    return () => { clearInterval(id); clearTimeout(timer); if (stream) stream.getTracks().forEach(t => t.stop()) }
  }, [onDone])

  return (
    <Card className="shadow-2xl">
      <CardHeader><CardTitle>Face Scan</CardTitle></CardHeader>
      <CardContent>
        <div className="relative rounded-2xl overflow-hidden aspect-[3/4] bg-gray-100">
          <video ref={videoRef} className="w-full h-full object-cover" playsInline muted />
          <div className="absolute inset-0 border-2 border-gray-300/60 rounded-2xl pointer-events-none"></div>
          <div className="absolute inset-x-0 top-0 h-20 scan-beam pointer-events-none"></div>
        </div>
        <div className="mt-4">
          <p className="text-gray-700 text-sm mb-2">Checking your undertone…</p>
          <Progress value={progress} />
        </div>
        <div className="flex gap-3 mt-6">
          <Button className="flex-1" variant="outline" onClick={onBack}>Back</Button>
          <Button className="flex-1" variant="gradient" onClick={onDone}>Continue</Button>
        </div>
      </CardContent>
    </Card>
  )
}