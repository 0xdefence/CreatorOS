'use client'

import { useState } from 'react'
import '../globals.css'

type ConversionForm = {
  name: string
  offer: string
  urgency: string
  objections: string
  messages: string
}

type LeadWithResult = {
  leadId: string
  result: {
    qualification_score: number
    fit: string
    summary: { pain: string; urgency: string; objections: string[]; recommended_angle: string }
    next_step: string
  }
}

export default function ConversionPage() {
  const [form, setForm] = useState<ConversionForm>({
    name: 'Avery',
    offer: 'CreatorOS premium',
    urgency: 'next week',
    objections: 'time',
    messages: 'I am interested in reliable content but worried about time.'
  })
  const [result, setResult] = useState<LeadWithResult | null>(null)
  const [leads, setLeads] = useState<any[]>([])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const payload = {
      dm_thread: form.messages.split('\n'),
      lead_profile: {
        name: form.name,
        offer: form.offer,
        urgency: form.urgency,
        objections: form.objections.split(',')
      }
    }
    const res = await fetch('/api/conversion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    const data = await res.json()
    setResult(data)
    const leadsRes = await fetch('/api/conversion')
    const leadsData = await leadsRes.json()
    setLeads(leadsData.leads)
  }

  const handleChange = (key: keyof ConversionForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="container">
      <div className="card">
        <h1>Phase 3: Conversion Layer</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {Object.entries(form).map(([key, value]) => (
            <div key={key}>
              <label htmlFor={key}>{key.replace('_', ' ').toUpperCase()}</label>
              <textarea
                id={key}
                rows={key === 'messages' ? 4 : 1}
                value={value}
                onChange={(event) => handleChange(key as keyof ConversionForm, event.target.value)}
              />
            </div>
          ))}
          <button type="submit">Qualify lead</button>
        </form>
        {result && (
          <div className="result">
            <h2>Qualification</h2>
            <p>Score: {result.result.qualification_score}</p>
            <p>Fit: {result.result.fit}</p>
            <p>Next step: {result.result.next_step}</p>
            <h3>Summary</h3>
            <p>Pain: {result.result.summary.pain}</p>
            <p>Urgency: {result.result.summary.urgency}</p>
            <p>Objections: {result.result.summary.objections.join(', ')}</p>
            <p>Recommended angle: {result.result.summary.recommended_angle}</p>
          </div>
        )}
        {leads.length > 0 && (
          <div className="result">
            <h2>Leads</h2>
            <ul>
              {leads.map((lead) => (
                <li key={lead.id}>{lead.name} – {lead.status}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
