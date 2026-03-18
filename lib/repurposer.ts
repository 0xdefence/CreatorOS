export type RepurposerInput = {
  source_asset: string
  target_channels: string[]
  voice_rules: string
}

export type RepurposerOutput = {
  variants: { channel: string; text: string }[]
  notes: string[]
}

export function repurposeContent(input: RepurposerInput): RepurposerOutput {
  const variants = input.target_channels.map((channel) => ({
    channel,
    text: `${channel.toUpperCase()} version of: ${input.source_asset}`
  }))

  const notes = [
    'Keep the hook consistent but adjust length per channel.',
    'Use voice rules to keep the tone aligned.'
  ]

  return { variants, notes }
}
