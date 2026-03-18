'use client'

import { useState } from 'react'
import './globals.css'

type ContentForm = {
  pillar: string
  content_goal: string
  tone: string
  offer: string
}

type WriterResult = {
  hooks: string[]
  drafts: { format: string; text: string }[]
  cta_variants: string[]
  scores: {
    clarity: number
    curiosity: number
    relevance: number
    conversion_intent: number
  }
  confidence: number
}

type RepurposeResult = {
  variants: { channel: string; text: string }[]
  notes: string[]
}

export default function ContentPage() {
  const [form, setForm] = useState<ContentForm>({
    pillar: 'Audience Growth',
    content_goal: 'showcase transformation',
    tone: 'conversational',
    offer: 'CreatorOS premium'
  })
  const [writer, setWriter] = useState<WriterResult | null>(null)
  const [repurpose, setRepurpose] = useState<RepurposeResult | null>(null)
  const [assets, setAssets] = useState<any[]>([])
  const [status, setStatus] = useState('')

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setStatus('Generating content...')
    const res = await fetch('/api/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    const data = await res.json()
    setWriter(data.writer)
    setRepurpose(data.repurposed)
    const assetsRes = await fetch('/api/content')
    const list = await assetsRes.json()
    setAssets(list.assets)
    setStatus('Content generated. Review drafts/variants below.')
  }

  const handleChange = (key: keyof ContentForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="container">
      <div className="card">
        <h1>CreatorOS Phase 2</h1>
        <p>Input an idea and generate hooks/posts/scripts across channels.</p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {Object.entries(form).map(([key, value]) => (
            <div key={key}>
              <label htmlFor={key}>{key.replace('_', ' ').toUpperCase()}</label>
              <input id={key} value={value} onChange={(event) => handleChange(key as keyof ContentForm, event.target.value)} />
            </div>
          ))}
          <button type="submit">Generate content</button>
        </form>
        {status && <p className="result">{status}</p>}
        {writer && (
          <div className="result">
            <h2>Hooks</h2>
            <ul>{writer.hooks.map((hook) => (<li key={hook}>{hook}</li>))}</ul>
            <h2>Drafts</h2>
            <ul>
              {writer.drafts.map((draft) => (
                <li key={draft.text}>{draft.format}: {draft.text}</li>
              ))}
            </ul>
            <h2>CTA Variants</h2>
            <ul>{writer.cta_variants.map((cta) => (<li key={cta}>{cta}</li>))}</ul>
            <dl>
              {Object.entries(writer.scores).map(([score, value]) => (
                <div key={score}>
                  <dt>{score}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
        {repurpose && (
          <div className="result">
            <h2>Repurposed variants</h2>
            <ul>
              {repurpose.variants.map((variant) => (
                <li key={variant.channel}>{variant.channel}: {variant.text}</li>
              ))}
            </ul>
            <h3>Notes</h3>
            <ul>{repurpose.notes.map((note) => (<li key={note}>{note}</li>))}</ul>
          </div>
        )}
        {assets.length > 0 && (
          <div className="result">
            <h2>Saved assets</h2>
            <ul>
              {assets.map((asset) => (
                <li key={asset.id}>{asset.channel} {asset.format} — status: {asset.status}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
