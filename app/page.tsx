'use client'

import { useState } from 'react'
import './globals.css'

type Strategy = {
  positioning: string
  pillars: string[]
  objection_map: { objection: string; reframe: string }[]
  cta_map: { intent: string; cta: string }[]
  confidence: number
}

type FormState = {
  niche: string
  audience: string
  offer: string
  pains: string
  objections: string
  proof_assets: string
  channels: string
  tone: string
}

const initialForm: FormState = {
  niche: '',
  audience: '',
  offer: '',
  pains: '',
  objections: '',
  proof_assets: '',
  channels: 'X, LinkedIn',
  tone: 'professional'
}

export default function Page() {
  const [form, setForm] = useState(initialForm)
  const [strategy, setStrategy] = useState<Strategy | null>(null)
  const [status, setStatus] = useState('')

  const handleChange = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setStatus('Generating strategy...')
    const res = await fetch('/api/strategist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    const data = await res.json()
    setStrategy(data)
    setStatus('Strategy generated and stored.')
  }

  return (
    <div className="container">
      <div className="card">
        <h1>CreatorOS Phase 1</h1>
        <p>Complete onboarding and get your positioning/pillars/CTA map.</p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {Object.entries(form).map(([key, value]) => (
            <div key={key}>
              <label htmlFor={key}>{key.replace('_', ' ').toUpperCase()}</label>
              {key === 'pains' || key === 'objections' || key === 'proof_assets' ? (
                <textarea id={key} rows={2} value={value} onChange={(event) => handleChange(key as keyof FormState, event.target.value)} />
              ) : (
                <input id={key} value={value} onChange={(event) => handleChange(key as keyof FormState, event.target.value)} />
              )}
            </div>
          ))}
          <button type="submit">Generate strategy</button>
        </form>
        {status && <p className="result">{status}</p>}
        {strategy && (
          <div className="result">
            <h2>Positioning</h2>
            <p>{strategy.positioning}</p>
            <h3>Pillars</h3>
            <ul>
              {strategy.pillars.map((pillar) => (
                <li key={pillar}>{pillar}</li>
              ))}
            </ul>
            <h3>CTA map</h3>
            <ul>
              {strategy.cta_map.map((cta) => (
                <li key={cta.cta}>{cta.intent}: {cta.cta}</li>
              ))}
            </ul>
            <h3>Objections</h3>
            <ul>
              {strategy.objection_map.map((item) => (
                <li key={item.objection}>{item.objection} → {item.reframe}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
