import React, { useState } from 'react'
import Button from './ui/Button.jsx'
import Input from './ui/Input.jsx'
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card.jsx'
import { db } from '../lib/base44.js'

export default function PersonalInfoForm({ sessionId, onBack }){
  const [form, setForm] = useState({
    completed_form: false,
    skin_type: '',
    preferred_coverage: '',
    preferred_finish: '',
    skin_concerns: '',
    current_foundation_brand: '',
    foundation_shade_match_issues: '',
  })
  function update(k, v){ setForm(s => ({ ...s, [k]: v })) }
  function save(){ db.UserSession.update(sessionId, { ...form, completed_form: true }); onBack() }
  return (
    <Card className="shadow-2xl">
      <CardHeader><CardTitle>Your info</CardTitle></CardHeader>
      <CardContent>
        <div className="grid gap-3">
          <Input placeholder="Skin type (dry/oily/combination/normal/sensitive)" value={form.skin_type} onChange={e=>update('skin_type', e.target.value)} />
          <Input placeholder="Preferred coverage (light/medium/full)" value={form.preferred_coverage} onChange={e=>update('preferred_coverage', e.target.value)} />
          <Input placeholder="Preferred finish (matte/satin/dewy/natural)" value={form.preferred_finish} onChange={e=>update('preferred_finish', e.target.value)} />
          <Input placeholder="Skin concerns (acne, redness, etc.)" value={form.skin_concerns} onChange={e=>update('skin_concerns', e.target.value)} />
          <Input placeholder="Current foundation brand" value={form.current_foundation_brand} onChange={e=>update('current_foundation_brand', e.target.value)} />
          <Input placeholder="Shade match issues you've had" value={form.foundation_shade_match_issues} onChange={e=>update('foundation_shade_match_issues', e.target.value)} />
        </div>
        <div className="flex gap-3 mt-6">
          <Button className="flex-1" variant="outline" onClick={onBack}>Back to menu</Button>
          <Button className="flex-1" variant="gradient" tone="blue" onClick={save}>Save</Button>
        </div>
      </CardContent>
    </Card>
  )
}