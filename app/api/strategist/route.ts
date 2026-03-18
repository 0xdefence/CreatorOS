import { NextResponse } from 'next/server'
import { strategize } from '@/lib/strategist'
import { saveStrategy, getStrategy } from '@/lib/data-store'

export async function POST(req: Request) {
  const body = await req.json()
  const strategy = strategize(body)
  saveStrategy(strategy)
  return NextResponse.json(strategy)
}

export async function GET() {
  const strategy = getStrategy()
  return NextResponse.json(strategy ?? {})
}
