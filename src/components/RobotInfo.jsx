import React from 'react'
import Button from './ui/Button.jsx'
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card.jsx'
import { motion } from 'framer-motion'
import { Bot } from 'lucide-react'

function Step({ label, delay }){
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.4 }} className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-gray-100 grid place-items-center border border-gray-200"><div className="w-5 h-5 rounded-full bg-gray-300" /></div>
      <span className="text-gray-800">{label}</span>
    </motion.div>
  )
}

export default function RobotInfo({ onBack }){
  return (
    <Card className="shadow-2xl">
      <CardHeader><CardTitle>What happens at Kiosk 2?</CardTitle></CardHeader>
      <CardContent>
        <div className="flex items-center gap-3 mb-4">
          <motion.div animate={{ y: [0,-8,0] }} transition={{ duration: 2.5, repeat: Infinity }} className="glass rounded-xl p-3">
            <Bot className="w-6 h-6" />
          </motion.div>
          <p className="text-gray-700 text-sm">Here’s how we make your samples.</p>
        </div>
        <div className="space-y-3">
          <Step label="Robot places an empty vial" delay={0.1} />
          <Step label="Adds base and pigments" delay={0.3} />
          <Step label="Mixes the blend" delay={0.5} />
          <Step label="Seals and labels it" delay={0.7} />
        </div>
        <Button className="w-full mt-4" variant="gradient" tone="green" onClick={onBack}>Back to menu</Button>
      </CardContent>
    </Card>
  )
}