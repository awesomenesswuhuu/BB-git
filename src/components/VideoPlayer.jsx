import React, { useEffect, useRef, useState } from 'react'
import Button from './ui/Button.jsx'
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card.jsx'

export default function VideoPlayer({ onBack }){
  const videoRef = useRef(null)
  const [muted, setMuted] = useState(true)
  useEffect(() => { if (videoRef.current) { videoRef.current.play().catch(()=>{}) } }, [])
  return (
    <Card className="shadow-2xl">
      <CardHeader><CardTitle>Video (90s)</CardTitle></CardHeader>
      <CardContent>
        <div className="rounded-2xl overflow-hidden bg-gray-100 aspect-video">
          <video ref={videoRef} className="w-full h-full object-cover" loop muted={muted} controls>
            <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="flex gap-3 mt-4">
          <Button className="flex-1" variant="outline" onClick={()=>setMuted(m=>!m)}>{muted? 'Unmute':'Mute'}</Button>
          <Button className="flex-1" variant="gradient" tone="pink" onClick={onBack}>Back to menu</Button>
        </div>
      </CardContent>
    </Card>
  )
}