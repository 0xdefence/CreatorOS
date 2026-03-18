import { NextResponse } from 'next/server'
import { weeklyReport } from '@/lib/analytics'

export async function GET() {
  const report = weeklyReport()
  return NextResponse.json(report)
}
