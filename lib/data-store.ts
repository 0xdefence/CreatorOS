type StrategyRecord = {
  positioning: string
  pillars: string[]
  objection_map: { objection: string; reframe: string }[]
  cta_map: { intent: string; cta: string }[]
  confidence: number
  timestamp: string
}

let latestStrategy: StrategyRecord | null = null

export function saveStrategy(record: StrategyRecord) {
  latestStrategy = record
}

export function getStrategy() {
  return latestStrategy
}
