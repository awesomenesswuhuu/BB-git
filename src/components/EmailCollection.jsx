import React, { useState } from 'react'
import Button from './ui/Button.jsx'
import Input from './ui/Input.jsx'
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card.jsx'

export default function EmailCollection({ onSubmit, onBack }){
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  function validate(e){
    e.preventDefault()
    const ok = /.+@.+\..+/.test(email)
    if(!ok){ setError('Please enter a valid email.'); return }
    onSubmit(email)
  }

  return (
    <Card className="shadow-2xl">
      <CardHeader><CardTitle>Enter your email</CardTitle></CardHeader>
      <CardContent>
        <form onSubmit={validate}>
          <Input type="email" placeholder="you@domain.com" value={email} onChange={e=>{setEmail(e.target.value); setError('')}} error={!!error} />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <p className="text-xs text-gray-600 mt-2">We’ll send your results and use this at Kiosk 2. Privacy protected.</p>
          <div className="flex gap-3 mt-6">
            <Button type="button" variant="outline" className="flex-1" onClick={onBack}>Back</Button>
            <Button type="submit" variant="gradient" className="flex-1">Continue</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}