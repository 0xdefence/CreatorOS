import type { StrategyRecord } from './data-store'

export type StrategistInput = {
  niche: string
  audience: string
  offer: string
  pains: string
  objections: string
  proof_assets: string
  channels: string
  tone: string
}

export function strategize(input: StrategistInput): StrategyRecord {
  const pillars = [
    `${input.niche} storytelling`,
    `${input.offer} value lock`,
    `${input.audience} proof moments`
  ]

  const objectionItems = input.objections.split(',').map((objection) => ({
    objection: objection.trim(),
    reframe: `Reframe ${objection.trim()} by highlighting how ${input.offer} addresses it.`
  }))

  const ctaMap = [
    { intent: 'awareness', cta: `Learn more about ${input.offer}` },
    { intent: 'consideration', cta: `See how ${input.offer} works for ${input.audience}` },
    { intent: 'decision', cta: `Book a quick call to set up ${input.offer}` }
  ]

  return {
    positioning: `${input.offer} helps ${input.audience} by solving ${input.pains}`,
    pillars,
    objection_map: objectionItems,
    cta_map: ctaMap,
    confidence: 0.88,
    timestamp: new Date().toISOString()
  }
}
