export type DMThread = { messages: string[] }
export type LeadProfile = { name: string; offer: string; urgency: string; objections: string[] }

export function qualifyLead(thread: DMThread, profile: LeadProfile) {
  const score = thread.messages.filter((msg) => msg.toLowerCase().includes('interested')).length
  return {
    qualification_score: Math.min(100, score * 10 + 40),
    fit: profile.offer.toLowerCase().includes('premium') ? 'high' : 'medium',
    summary: {
      pain: 'Need reliable content to feed pipeline',
      urgency: profile.urgency,
      objections: profile.objections,
      recommended_angle: `Highlight proof and ${profile.offer}`
    },
    next_step: score >= 2 ? 'book_call' : 'nurture'
  }
}
