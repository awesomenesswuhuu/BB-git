import React, { useState, useCallback } from 'react'
import Button from './ui/Button.jsx'
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card.jsx'
import FoundationCreator from './FoundationCreator.jsx'
import PersonalInfoForm from './PersonalInfoForm.jsx'
import VideoPlayer from './VideoPlayer.jsx'
import RobotInfo from './RobotInfo.jsx'
import MakeupGame from './MakeupGame.jsx'
import { NotebookPen, PlayCircle, Bot, Gamepad2 } from 'lucide-react'

export default function ChoiceScreen({ sessionId, onDoneAnalysis, onExit, onDiscount }){
  const [view, setView] = useState('menu')
  const handleComplete = useCallback(() => { onDoneAnalysis() }, [onDoneAnalysis])
  function handleDiscount(d){ onDiscount(d) }

  return (
    <>
      <FoundationCreator onComplete={handleComplete} />
      {view === 'menu' && (
        <Card className="shadow-2xl">
          <CardHeader><CardTitle>While you wait (~90s)…</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="gradient" tone="blue" onClick={() => setView('form')}><span className="inline-flex items-center gap-2"><NotebookPen className="w-4 h-4" /> Your Info</span></Button>
              <Button variant="gradient" tone="pink" onClick={() => setView('video')}><span className="inline-flex items-center gap-2"><PlayCircle className="w-4 h-4" /> Watch Video</span></Button>
              <Button variant="gradient" tone="green" onClick={() => setView('robot')}><span className="inline-flex items-center gap-2"><Bot className="w-4 h-4" /> About Kiosk 2</span></Button>
              <Button variant="gradient" tone="orange" onClick={() => setView('game')}><span className="inline-flex items-center gap-2"><Gamepad2 className="w-4 h-4" /> Play Game</span></Button>
            </div>
            <Button className="w-full mt-4" variant="outline" onClick={onExit}>Exit</Button>
          </CardContent>
        </Card>
      )}
      {view === 'form' && <PersonalInfoForm sessionId={sessionId} onBack={()=>setView('menu')} />}
      {view === 'video' && <VideoPlayer onBack={()=>setView('menu')} />}
      {view === 'robot' && <RobotInfo onBack={()=>setView('menu')} />}
      {view === 'game' && <MakeupGame onBack={()=>setView('menu')} onDiscount={handleDiscount} />}
    </>
  )
}