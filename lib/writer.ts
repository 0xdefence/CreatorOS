export type WriterInput = {
  pillar: string
  content_goal: string
  channel: string
  tone: string
  offer: string
}

export type WriterOutput = {
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

export function runWriter(input: WriterInput): WriterOutput {
  const baseHook = `${input.pillar} clarity for ${input.offer}`
  const hooks = [
    `${baseHook} leverages ${input.content_goal}.`,
    `Here’s how ${input.offer} makes ${input.pillar} simple.`,
    `Do this ${input.tone} trick to connect ${input.pillar} with conversions.`
  ]

  const drafts = [
    {
      format: 'post',
      text: `Post: ${input.content_goal} + ${input.offer} infused with ${input.tone} tone.`
    },
    {
      format: 'thread',
      text: `Thread: 1) Pain 2) Insight 3) ${input.offer} fix 4) CTA`
    },
    {
      format: 'script',
      text: `Script: "If you’re tired of ${input.pillar}, try ${input.offer}."`
    }
  ]

  const ctas = [
    `Learn how ${input.offer} works`,
    `Book a call to explore ${input.offer}`,
    `DM to get the ${input.pillar} blueprint`
  ]

  const scores = {
    clarity: 7,
    curiosity: 8,
    relevance: 9,
    conversion_intent: 6
  }

  return {
    hooks,
    drafts,
    cta_variants: ctas,
    scores,
    confidence: 0.9
  }
}
