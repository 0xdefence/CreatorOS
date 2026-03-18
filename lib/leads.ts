export type LeadRecord = {
  id: string
  name: string
  status: 'new' | 'qualified' | 'booked'
  timestamp: string
}

const leads: LeadRecord[] = []

export function addLead(lead: LeadRecord) {
  leads.push(lead)
}

export function updateLeadStatus(id: string, status: LeadRecord['status']) {
  const item = leads.find((lead) => lead.id === id)
  if (item) item.status = status
}

export function listLeads() {
  return [...leads]
}
