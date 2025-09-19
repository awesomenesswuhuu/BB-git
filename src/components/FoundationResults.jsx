import React from 'react'
import Button from './ui/Button.jsx'
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card.jsx'
import { db } from '../lib/base44.js'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

function Swatch({ f, i }){
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass rounded-2xl p-4">
      <div className="w-20 h-20 mx-auto rounded-full shadow-lg ring-1 ring-gray-200" style={{ background: f.hex_color }} />
      <div className="text-center mt-3">
        <div className="text-sm font-medium">{f.shade_name}</div>
        <div className="text-xs text-gray-600">{f.undertone} • {f.coverage} • {f.finish}</div>
        <div className="text-xs text-gray-500">Skin: {f.skin_type} • Confidence: {f.confidence_score}%</div>
      </div>
    </motion.div>
  )
}

export default function FoundationResults({ discount=0, onNew }){
  const items = db.Foundation.listAll()
  return (
    <Card className="shadow-2xl">
      <CardHeader><CardTitle>Your matches</CardTitle></CardHeader>
      <CardContent>
        <p className="text-gray-700 text-sm mb-3">Here are 5 shades picked for you. Go to <span className="font-semibold">Kiosk 2</span> to get samples.</p>
        {discount > 0 && (
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mb-3">
            <div className="rounded-xl border border-amber-200 p-3 bg-amber-50/60 text-sm">🎉 You earned a <span className="font-semibold">{discount}%</span> discount in the game!</div>
          </motion.div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {items.map((f, i) => <Swatch key={i} f={f} i={i} />)}
        </div>
        <div className="rounded-xl border border-gray-200 p-3 bg-white/80 text-xs text-gray-600 mt-4">We emailed your results. Show the email at Kiosk 2.</div>
        <Button className="w-full mt-4 inline-flex items-center gap-2" variant="gradient" onClick={onNew}>New session <ArrowRight className="w-4 h-4" /></Button>
      </CardContent>
    </Card>
  )
}