import React from 'react'
import Button from './ui/Button.jsx'
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card.jsx'
import Badge from './ui/Badge.jsx'
import { Camera, Sparkles, Heart } from 'lucide-react'

export default function WelcomeScreen({ onStart }){
  return (
    <Card className="text-center shadow-2xl">
      <CardHeader>
        <Badge>Beauty Match</Badge>
        <CardTitle className="mt-3">Smart Color Match</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700">Find your best foundation shade—fast and easy.</p>
        <div className="flex items-center justify-center gap-5 mt-6 text-gray-700/80">
          <div className="glass rounded-xl p-3"><Camera className="w-6 h-6" /></div>
          <div className="glass rounded-xl p-3"><Sparkles className="w-6 h-6" /></div>
          <div className="glass rounded-xl p-3"><Heart className="w-6 h-6" /></div>
        </div>
        <Button variant="gradient" className="mt-8 w-full" onClick={onStart}>Start</Button>
        <p className="text-xs text-gray-600 mt-3">Simple. Inclusive. Friendly.</p>
      </CardContent>
    </Card>
  )
}