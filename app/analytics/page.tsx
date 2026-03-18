'use client'

import './globals.css'
import { useEffect, useState } from 'react'

type Report = {
  winners: string[]
  losers: string[]
  insights: string[]
  next_tests: { hypothesis: string; metric: string; timeframe_days: number }[]
  weekly_plan: string[]
}

type SafetyResult = {
  risk_level: string
  violations: string[]
  rewrite_suggestions: string[]
  approved: boolean
}

export default function AnalyticsPage() {
  const [report, setReport] = useState<Report | null>(null)
  const [safety, setSafety] = useState<SafetyResult | null>(null)

  useEffect(() => {
    fetch('/api/analytics')
      .then((res) => res.json())
      .then(setReport)
  }, [])

  const runSafety = async () => {
    const res = await fetch('/api/safety', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content_text: 'This system guarantees revenue growth',
        claim_policy: 'disclosure required'
      })
    })
    const data = await res.json()
    setSafety(data)
  }

  return (
    <div className="container">
      <div className="card">
        <h1>Phase 4: Analytics + Safety</h1>
        {report ? (
          <div className="result">
            <h2>Weekly Report</h2>
            <p>Winners: {report.winners.join(', ') || 'None'}</p>
            <p>Losers: {report.losers.join(', ') || 'None'}</p>
            <h3>Insights</h3>
            <ul>{report.insights.map((insight) => (<li key={insight}>{insight}</li>))}</ul>
            <h3>Next Tests</h3>
            <ul>
              {report.next_tests.map((test) => (
                <li key={test.hypothesis}>{test.hypothesis} – {test.metric} ({test.timeframe_days}d)</li>
              ))}
            </ul>
            <h3>Weekly Plan</h3>
            <ul>{report.weekly_plan.map((item) => (<li key={item}>{item}</li>))}</ul>
          </div>
        ) : (
          <p>Loading report...</p>
        )}
        <button onClick={runSafety}>Run Safety Checker</button>
        {safety && (
          <div className="result">
            <h2>Safety result</h2>
            <p>Risk level: {safety.risk_level}</p>
            <p>Approved: {safety.approved ? 'Yes' : 'No'}</p>
            <p>Violations: {safety.violations.join(', ') || 'None'}</p>
            <p>Rewrite suggestions: {safety.rewrite_suggestions.join(', ') || 'None'}</p>
          </div>
        )}
      </div>
    </div>
  )
}
