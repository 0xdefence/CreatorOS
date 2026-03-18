import { NextResponse } from 'next/server'
import { safetyChecker } from '@/lib/safety'

export async function POST(req: Request) {
  const { content_text, claim_policy } = await req.json()
  const result = safetyChecker(content_text, claim_policy)
  return NextResponse.json(result)
}
