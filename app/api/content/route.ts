import { randomUUID } from 'crypto'
import { NextResponse } from 'next/server'
import { runWriter } from '@/lib/writer'
import { repurposeContent } from '@/lib/repurposer'
import { saveAsset, listAssets } from '@/lib/content-store'

type ContentPayload = {
  pillar: string
  content_goal: string
  tone: string
  offer: string
}

export async function POST(req: Request) {
  const body = (await req.json()) as ContentPayload
  const writerOut = runWriter({
    pillar: body.pillar,
    content_goal: body.content_goal,
    channel: 'x',
    tone: body.tone,
    offer: body.offer
  })

  writerOut.drafts.forEach((draft) => {
    saveAsset({
      id: randomUUID(),
      pillar: body.pillar,
      channel: draft.format === 'script' ? 'tiktok' : 'x',
      format: draft.format,
      text: draft.text,
      status: 'draft',
      clarity: writerOut.scores.clarity,
      curiosity: writerOut.scores.curiosity,
      relevance: writerOut.scores.relevance,
      conversion_intent: writerOut.scores.conversion_intent,
      createdAt: new Date().toISOString()
    })
  })

  const repurposed = repurposeContent({
    source_asset: writerOut.drafts[0].text,
    target_channels: ['linkedin', 'instagram', 'tiktok', 'email'],
    voice_rules: 'Use professional yet playful tone.'
  })

  return NextResponse.json({ writer: writerOut, repurposed })
}

export async function GET() {
  const assets = listAssets()
  return NextResponse.json({ assets })
}
