import { NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import { qualifyLead } from '@/lib/closer'
import { addLead, updateLeadStatus, listLeads } from '@/lib/leads'

type ConversionPayload = {
  dm_thread: string[]
  lead_profile: { name: string; offer: string; urgency: string; objections: string[] }
}

export async function POST(req: Request) {
  const body = (await req.json()) as ConversionPayload
  const leadId = randomUUID()
  addLead({ id: leadId, name: body.lead_profile.name, status: 'new', timestamp: new Date().toISOString() })
  const result = qualifyLead({ messages: body.dm_thread }, body.lead_profile)
  if (result.next_step === 'book_call') {
    updateLeadStatus(leadId, 'booked')
  } else {
    updateLeadStatus(leadId, 'qualified')
  }
  return NextResponse.json({ leadId, result })
}

export async function GET() {
  return NextResponse.json({ leads: listLeads() })
}
